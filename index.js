import express from 'express';
import session from 'express';
import bodyParser from 'body-parser';
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import historyRoutes from './routes/history.js';
import userRoutes from './routes/user.js';
import allRoutes from './routes/all.js';
import dashboardRoutes from './routes/dashboard.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use(cookieParser());

// https://inventory-api-2j2i.onrender.com
app.use('/api/history',historyRoutes);
app.use('/api/all', allRoutes);
app.use('/api/user', userRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use((err, req, res, next)=>{
  return res.json({
  message: err.message || 500,
  status: err.status || "Something Went Wrong",
  success: false,
  stack : err.stack
})
})

const PORT = 5000 || process.env.PORT 

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>app.listen(PORT, ()=> console.log(`Server is running on port : ${PORT} `)))
.catch((error)=> console.log(error.message));

