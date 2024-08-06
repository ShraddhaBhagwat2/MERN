
//import { Connection } from './database/db.js';
//const express = require('express');
import express from 'express';
//const cors = require('cors');
//const morgan = require('morgan');
//const dotenv = require('dotenv');
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

//import Router from './routes/route.js'
//const connectDB = require("./config/db");
dotenv.config();
import userRoutes from './routes/userRoutes.js'
import blogRoutes from './routes/blogRoutes.js'
connectDB();
const app = express();
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/blog', blogRoutes);

const port = 8000;
app.listen(port, () => console.log(`server is running successfully on port ${port}`));
// const USERNAME = process.env.DB_USERNAME;
// const PASSWORD = process.env.DB_PASSWORD;
// Connection(USERNAME, PASSWORD);