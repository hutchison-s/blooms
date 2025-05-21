import concept from "../models/concept.js";

const adminCode = process.env.ADMIN_CODE;

if (!adminCode) {
    throw new Error('Missing admin code');
}

export async function find(req, res) {
    const {subject, search, grade} = req.query;
        const query = {}
        if (grade) {
            query.gradeLevel = parseInt(grade);
        }
        if (subject) {
            query.subjectArea = { $regex: new RegExp(subject, 'i') };
        }

        if (search) {
            query.$text = { $search: search }; // must be plain string
        }
    try {
        const results = await concept.find(query, '_id gradeLevel subjectArea concept', {limit: 100}).exec();
        return res.status(200).json(results);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'Could not execute DB function.'})
    }
}
export async function findOne(req, res) {
    try {
        const {id} = req.params;
        const results = await concept.findById(id).exec();
        return res.status(200).json(results);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'Could not execute DB function.'})
    }
}

export async function getSubjects(req, res) {
    try {
        const results = await concept.find({}, 'subjectArea').exec();
        const setResults = new Set(results.map(s => s.subjectArea));
        return res.status(200).json(Array.from(setResults));
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'Could not execute DB function.'})
    }
}

export async function seed(req, res) {
    const data = req.body;
    const {authorization} = req.headers;
    const code = authorization.split(' ')[1];
    if (code !== adminCode) {
        return res.status(403).json({message: 'Forbidden'})
    }
    try {
        const results = await concept.insertMany(data, {ordered: false});
        return res.status(200).send('successfully added documents');
    } catch (error) {
        if (error.code === 11000) {
            console.log(error.writeErrors)
            return res.status(200).json({message: `Inserted ${error.insertedDocs.length} documents, and skipped ${error.writeErrors.length} duplicates`})
        } 
        console.error(error);
        return res.status(500).json({message: 'Could not execute DB function.'})
    }
}

export async function purge(req, res) {
    const {authorization} = req.headers;
    const code = authorization.split(' ')[1];
    if (code !== adminCode) {
        return res.status(403).json({message: 'Forbidden'})
    }
    await concept.deleteMany({});
    return res.status(200).json({message: 'purged'})
}