import Concept from "../models/Concept.js"

const updates = [
]

export async function clean(req, res) {
    try {
        return res.status(200).json({message: 'Data is clean'})
    } catch (error) {
        return res.status(500).json({message: error.message || error})
    }
}


export async function seed(req, res) {

        const response = await Concept.insertMany(updates, {ordered: false});
        return res.status(200).json(response);

}