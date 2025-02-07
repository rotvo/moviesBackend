import express, { Request, Response } from 'express';
import axios from 'axios';
import Bottleneck from 'bottleneck';
import { Pool } from 'pg';
const cors = require('cors');
import NodeCache from 'node-cache';
import dotenv from 'dotenv';
import {router} from './routes';
import { setupSwagger } from "./config/swagger";

dotenv.config();

const app = express();
const port = 3000;
app.use(express.json());
app.use(router);



const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 }); // TTL of 10 minuts, it will check every 2 minutes



const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));


const limiter = new Bottleneck({
  maxConcurrent: 5,  // max concurrent requests
  reservoir: 5,      // 5 maximum requests
  reservoirRefreshAmount: 5, // refresh 5 new requests every 10 seconds
  reservoirRefreshInterval: 10 * 1000, // 10 seconds in milliseconds
  minTime: 200 // interval minimum of 200 ms between each request
});
setupSwagger(app);
app.get('/', (req, res) => {
  res.send('Ruta Inicial Ok');
});


app.listen(port, () => {
  console.log(`POS APIS Listening at http://localhost:${port}`);
  console.log(`Swagger Docs available at http://localhost:${port}/api-docs`);
});