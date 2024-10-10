import express, { Request, Response } from 'express';
import axios from 'axios';
import Bottleneck from 'bottleneck';
import { Pool } from 'pg';
import { RowDataPacket } from 'mysql2/promise';
const cors = require('cors');
import NodeCache from 'node-cache';
import dotenv from 'dotenv';
import { ApiResponse, Movies, Genres, Genre } from './Interface/responses';

dotenv.config();

const app = express();
const port = 3000;

const dbConfig = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  
};

const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 }); // TTL of 10 minuts, it will check every 2 minutes

const pool = new Pool(dbConfig);

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());

const limiter = new Bottleneck({
  maxConcurrent: 5,  // max concurrent requests
  reservoir: 5,      // 5 maximum requests
  reservoirRefreshAmount: 5, // refresh 5 new requests every 10 seconds
  reservoirRefreshInterval: 10 * 1000, // 10 seconds in milliseconds
  minTime: 200 // interval minimum of 200 ms between each request
});

app.get('/', (req, res) => {
  res.send('Ruta Inicial Ok');
});


app.get('/api/movies/getMoviesList', limiter.wrap(async (req: Request, res: Response) => {
  try {
    const { page = '1', sortBy, year, genre, rating } = req.query;
     
    // generate a cache key based on the query parameters
     const cacheKey = `moviesList_${page}_${sortBy}_${year}_${genre}_${rating}`;
    
     //verify if the data is in the cache
     const cachedData = cache.get<ApiResponse>(cacheKey);
     if (cachedData) {
       return res.status(200).json(cachedData);
     }

    // build the API URL
    let apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&page=${page}`;
    
    if (sortBy) {
      apiUrl += `&sort_by=${sortBy}`;
    }
    
    if (year) {
      apiUrl += `&primary_release_year=${year}`;
    }

    if (genre) {
      apiUrl += `&with_genres=${genre}`;
    }

    if (rating) {
      apiUrl += `&vote_average.gte=${rating}`;
    }

    
    const apiResponse = await axios.get<ApiResponse>(apiUrl);

    if (!apiResponse.data || !apiResponse.data.results) {
      return res.status(500).json({ error: 'Error fetching data from the movie API' });
    }

    const response: ApiResponse = {
      page: apiResponse.data.page,
      total_results: apiResponse.data.total_results,
      total_pages: apiResponse.data.total_pages,
      results: apiResponse.data.results.map((movie: Movies) => ({
        id: movie.id,
        title: movie.title,
        release_date: new Date(movie.release_date),
        poster_path: movie.poster_path,
        overview: movie.overview,
        vote_average: movie.vote_average,
      })),
    };

    // save the response in the cache
    cache.set(cacheKey, response);
    return res.status(200).json(response);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}));

app.get('/api/movies/getGenresList', limiter.wrap(async (req: Request, res: Response) => {
  try {
    const cacheKey = 'genresList';
     //verify if the data is in the cache
     const cachedData = cache.get<Genres>(cacheKey);
     if (cachedData) {
       console.log('Obteniendo géneros del caché');
       return res.status(200).json(cachedData);
     }

     //do the real request if not in cache
    const apiResponse = await axios.get<Genres>(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}`);

    if (!apiResponse.data || !apiResponse.data.genres) {
      return res.status(500).json({ error: 'Error fetching data from the movie API' });
    }

    const response: Genres = {
      genres: apiResponse.data.genres.map((genre: Genre) => ({
        id: genre.id,
        name: genre.name,
      })),
    };

    //save in cache before returning the response
    cache.set(cacheKey, response);

    res.status(200).json(response);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}));

app.post('/api/movies/rateMovie', limiter.wrap(async (req: Request, res: Response) => {
  const { movieId, userRating, review } = req.body;

  if (!movieId || !userRating) {
    return res.status(400).json({ error: 'Movie ID and user rating are required' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO MovieRating (movie_id, user_rating, review) VALUES ($1, $2, $3) RETURNING movie_id`,
      [movieId, userRating, review]
    );
    res.status(201).json({ message: 'Review added successfully', reviewId: result.rows[0].movie_id });
  } catch (error) {
    console.error('Error saving review:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}));

app.get('/api/movies/:movieId/reviews', limiter.wrap(async (req: Request, res: Response) => {
  const { movieId } = req.params;

  try {

    const reviews = await pool.query(
      `SELECT user_rating, review, created_at FROM MovieRating WHERE movie_id = $1`,
      [movieId]
    );

    if (reviews.rows.length === 0) {
      return res.status(404).json({ message: 'No reviews found for this movie' });
    }

    res.status(200).json(reviews.rows);
  } catch (error) {
    console.error('Error retrieving reviews:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}));

app.listen(port, () => {
  console.log(`Movies API listening at http://localhost:${port}`);
});
