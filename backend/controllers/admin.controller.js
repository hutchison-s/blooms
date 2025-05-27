import Concept from "../models/Concept.js"


export async function clean(req, res) {
    try {
        res.status(200).json({message: 'Data is clean'})
    } catch (error) {
        res.status(500).json({message: error.message || error})
    }
}

export async function seed(req, res) {
    try {
        const response = await Concept.insertMany(updates);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({message: error.message || error})
    }
}