import Book from "../models/Book.js";
import Concept from "../models/Concept.js"
import { data } from "../../seedData.js";

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

export async function dumpBooks(req, res) {
    try {
        const books = await Book.find();
        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json({message: error.message || error})
    }
}

export async function dumpConcepts(req, res) {
    try {
        const concepts = await Concept.find();
        return res.status(200).json(concepts);
    } catch (error) {
        return res.status(500).json({message: error.message || error})
    }
}