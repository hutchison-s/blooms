import mongoose, {Schema, syncIndexes} from "mongoose";

const Concept = new Schema({
    timestamp: String,
    gradeLevel: Number,
    subjectArea: String,
    concept: String,
    knowledge: String,
    comprehension: String,
    application: String,
    analysis: String,
    synthesis: String,
    evaluation: String
})

Concept.index({gradeLevel: 1, subjectArea: 1, concept: 1}, {unique: true})
Concept.index({subjectArea: 'text', concept: 'text', knowledge: 'text', comprehension: 'text', application: 'text', analysis: 'text', synthesis: 'text', evaluation: 'text'});

export default mongoose.model('Concept', Concept)
