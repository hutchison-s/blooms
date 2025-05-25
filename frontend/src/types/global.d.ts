export interface Concept {
    _id: string,
    timestamp: Date,
    gradeLevel: number,
    subjectArea: Subject,
    concept: string,
    knowledge: BloomLevelName,
    comprehension: BloomLevelName,
    application: BloomLevelName,
    analysis: BloomLevelName,
    synthesis: BloomLevelName,
    evaluation: BloomLevelName,
}

export type BloomLevelName = 
    'knowledge'
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

export type Subject = 'Social Studies' | 'Language Arts' | 'Science' | 'Math' | 'Technology' | 'Health' | 'Music' | 'Art'

export type BloomLevelType = {
  id: number;
  name: BloomLevelName;
  definition: string;
  keywords: string;
  example: string;
};
