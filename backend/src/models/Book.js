import mongoose, { Schema } from "mongoose";

const BookSchema = new Schema({
    timestamp: Date,
    title: String,
    author: String,
    genre: String,
    slug: String,
    synopsis: String,
    knowledge: {
        type: [String],
        default: []
    },
    comprehension: {
        type: [String],
        default: []
    },
    application: {
        type: [String],
        default: []
    },
    analysis: {
        type: [String],
        default: []
    },
    synthesis: {
        type: [String],
        default: []
    },
    evaluation: {
        type: [String],
        default: []
    }
})

BookSchema.index({author: 1})
BookSchema.index({title: 1})
BookSchema.index({genre: 1})
BookSchema.index({slug: 1}, {unique: true})

export default mongoose.model('Books', BookSchema, 'books')

