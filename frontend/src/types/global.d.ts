export interface Concept {
    _id: string,
    timestamp: Date,
    gradeLevel: number,
    subjectArea: Subject,
    concept: string,
    knowledge: LevelName,
    comprehension: LevelName,
    application: LevelName,
    analysis: LevelName,
    synthesis: LevelName,
    evaluation: LevelName,
}

export type LevelName = 
    'knowledge'
     | 'comprehension'
     | 'application'
     | 'analysis'
     | 'synthesis'
     | 'evaluation'

export type Subject = 'Social Studies' | 'History' | 'Literature' | 'Science'