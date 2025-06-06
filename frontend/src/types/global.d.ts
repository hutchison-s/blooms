export type TopicTaxonomy = {
  [K in BookBloomLevel]: string
}

export type Topic = {
  _id: string
  timestamp: Date
  gradeLevel: number
  subjectArea: Subject
  concept: string
  url?: string
} & TopicTaxonomy

export type TopicPreview = Pick<Topic, '_id' | 'gradeLevel' | 'subjectArea' | 'concept' | 'url'>

export type BloomLevelName =
  | 'knowledge'
  | 'comprehension'
  | 'application'
  | 'analysis'
  | 'synthesis'
  | 'evaluation'
  | 'Knowledge'
  | 'Comprehension'
  | 'Application'
  | 'Analysis'
  | 'Synthesis'
  | 'Evaluation'

export type Subject =
  | 'Social Studies'
  | 'Language Arts'
  | 'Science'
  | 'Math'
  | 'Technology'
  | 'Health'
  | 'Music'
  | 'Art'

export type BloomLevelType = {
  id: number
  name: BloomLevelName
  definition: string
  keywords: string
  example: string
}

export type BookBloomLevel =
  | 'knowledge'
  | 'comprehension'
  | 'application'
  | 'analysis'
  | 'synthesis'
  | 'evaluation'

export type BloomsTaxonomy = {
  [K in BookBloomLevel]: string[]
}

export type Book = {
  _id: string
  timestamp: Date
  title: string
  author: string
  genre: string
  slug: string
  synopsis: string
} & BloomsTaxonomy

export type BookSummary = Pick<Book, '_id' | 'title' | 'author' | 'genre' | 'synopsis' | 'slug'>
