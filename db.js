import mongoose from "mongoose";
//const mongoose = require('mongoose')
export const connectDB = async () => {
    //const URL=`mongodb://${username}:${password}@ac-bkpwoke-shard-00-00.9lqlcz3.mongodb.net:27017,ac-bkpwoke-shard-00-01.9lqlcz3.mongodb.net:27017,ac-bkpwoke-shard-00-02.9lqlcz3.mongodb.net:27017/?ssl=true&replicaSet=atlas-r55po5-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`;
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Database connected successfully');
    } catch (error) {
        console.log(`Error while connecting with the database ${error}`, error);
    }
};
//module.exports = connectDB;
export default connectDB;