import { RowDataPacket } from "mysql2/promise";

export interface ApiResponse {
  page:          number;
  total_results: number;
  total_pages:   number;
  results:       Movies[];
}

export interface Movies {
  id:           number;
  title:        string;
  release_date: Date;
  poster_path:  string;
  overview:     string;
  vote_average: number;
}

export interface Genres {
  genres: Genre[];
}

export interface Genre {
  id:   number;
  name: string;
}

