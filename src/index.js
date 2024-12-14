// require('dotenv').config({ path: './env' })
import dotenv from 'dotenv'

// import mongoose, { mongo } from 'mongoose'
// import { DB_NAME } from './constants.js'
import connectDb from './db/index.js'
import { app } from './app.js'

dotenv.config({
    path: './env'
})


connectDb()
    .then(() => {
        app.on("error", (error) => {
            console.log("error", error);
            throw error;
        })
        app.listen(process.env.PORT || 8000, () => {
            console.log(`server is running at port ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log('Mongodb Connection failed !!!', err);
    })




/*
import express from 'express'
const app = express()

// database 
// there can be error come so use try catch 
// and databse can in another continent so use async await 
//iife

(async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error" , (error)=>{
            console.log(`error` , error);
            throw error
        })
        app.listen(process.env.PORT , ()=>{
            console.log(`app is listening on ${process.env.PORT}`);
            
        })
    } catch (error) {
        console.error("error" , error)
        throw error
    }
})()
*/
