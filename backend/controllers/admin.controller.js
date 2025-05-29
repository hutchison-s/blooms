import Concept from "../models/Concept.js"

const updates = [];
const newDocs = [];

export async function clean(req, res) {
    try {
        const proms = []
        for (const doc of updates) {
            proms.push(Concept.updateOne({subjectArea: doc.subjectArea, gradeLevel: doc.gradeLevel, concept: doc.concept}, {
                ...doc
            }))
        }
        const results = await Promise.all(proms);
        return res.status(200).json({message: 'Data is clean', data: results})
    } catch (error) {
        return res.status(500).json({message: error.message || error})
    }
}


export async function seed(req, res) {

        const response = await Concept.insertMany(newDocs, {ordered: false});
        return res.status(200).json(response);

}