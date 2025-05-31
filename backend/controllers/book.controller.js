import Book from "../models/Book.js";

export async function find(req, res) {
    const books = await Book.find({}, '_id title author synopsis genre slug timestamp');
    return res.status(200).json(books);
}
export async function findOne(req, res) {
    const {slug} = req.params;
    if (!slug) return res.status(400).send('no slug');
    const b = await Book.findOne({slug: slug});
    if (!b) return res.status(404).send('no book');
    return res.status(200).json(b);
}