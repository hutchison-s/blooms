import mongoose from 'mongoose';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;

export default function connectMongoose() {
    try {
        mongoose.connect(uri)
    } catch (err) {
        console.error("Could not connect to MongoDB");
    }
    const conn = mongoose.connection;

    conn.on('error', (err)=>{
        console.error(`Error connecting to database: ${err}`)
    })

    conn.once('open', ()=>{
        console.log("Connection established")
    })
}