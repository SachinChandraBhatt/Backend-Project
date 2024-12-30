import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB Connected !! DB Host: ${connectionInstance.connection.host}`);
        // console.log(connectionInstance.connection.port);
        // console.log(await connectionInstance.connection.listDatabases());
    } catch (error) {
        console.log('Mongodb Connection failed', error);
        process.exit(1);
    }
}

export default connectDb;