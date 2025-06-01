import Book from "../models/Book.js";
import Concept from "../models/Concept.js"
import { data } from "../seedData.js";

const updates = [];
const newDocs = [...data];

export async function clean(req, res) {
    try {
        const proms = []
        for (const doc of updates) {
            proms.push(Book.updateOne({slug: doc.slug}, {
                synopsis: doc.synopsis
            }))
        }
        const results = await Promise.all(proms);
        return res.status(200).json({message: 'Data is clean', data: results})
    } catch (error) {
        return res.status(500).json({message: error.message || error})
    }
}


export async function seed(req, res) {

        const response = await Book.insertMany(newDocs, {ordered: false});
        return res.status(200).json(response);

}