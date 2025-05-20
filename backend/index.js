import express from 'express';
import { MongoClient } from 'mongodb';
import 'dotenv/config';
import cors from 'cors';
import { data } from './seedData.js';

const PORT = 3000;
const uri = process.env.MONGO_URI;
const app = express();
app.use(express.json())

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));

app.options('/grade/7', cors(corsOptions))


const {qCol, blooms} = await MongoClient.connect(uri).then(conn => {
    const db = conn.db();
    console.log('connected to mongodb');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
    return db;
}).then(db => {
    const qCol = db.collection('q')
    const blooms = db.collection('blooms')
    return {qCol, blooms}
})

app.get('/ping', async (req, res) => {
    return res.status(200).json({message: 'pong'})
})
app.get('/grade/:n', async (req, res) => {
    try {
        const {n} = req.params;
        const docs = await blooms.find({gradeLevel: parseInt(n)}).sort({concept: 1}).toArray();
        return res.status(200).json(docs)
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: error})
    }
})

app.get('/seed', async (req, res)=> {
    try {
        await blooms.insertMany(data);
        console.log('success');
        return res.json({message: 'success'})
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: error})
    }
})
app.get('/clean', async (req, res)=> {
    try {
        await blooms.updateMany({gradeLevel: '7th'}, {$set: {gradeLevel: 7}});
        await blooms.updateMany({gradeLevel: '6th'}, {$set: {gradeLevel: 6}});
        await blooms.updateMany({gradeLevel: '5th'}, {$set: {gradeLevel: 5}});
        await blooms.updateMany({gradeLevel: '4th'}, {$set: {gradeLevel: 4}});
        await blooms.updateMany({gradeLevel: '3rd'}, {$set: {gradeLevel: 3}});
        console.log('success');
        return res.json({message: 'success'})
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: error})
    }
})
