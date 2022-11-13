import express from 'express';
import session from 'express';
import bodyParser from 'body-parser';
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors({
    credentials: "include",
}));
app.use(session({
    cookie: {
        maxAge: 24*60*60*1000,
        secure: true,
        sameSite: 'none'
    }
}))
app.use(cookieParser());

// https://inventory-api-2j2i.onrender.com
app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);

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

