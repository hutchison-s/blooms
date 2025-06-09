import Concept from "../models/Concept.js";

const DEFAULT_LIMIT = 50;
const SORTS = ['concept', 'gradeLevel', 'subjectArea']
const BOOLS = ['false', 'true']

/*
    General database endpoint for concepts.
    - Supports optional query parameters: grade, subject, and search
    - Uses pagination with defaults: page = 1, limit = 50
    - Enforces limit max of DEFAULT_LIMIT
    - Validates numeric format of page and limit
    - Validates max length of 100 for search term
    - Returns results in 'data' with pagination metadata
*/
export async function find(req, res) {
    const baseUrl = `${req.protocol}://${req.get('host')}/concepts`;
    const { 
        subject, 
        search, 
        grade, 
        sortby = 'concept', 
        ascending = 'true', 
        page = 1, 
        limit = DEFAULT_LIMIT 
    } = req.query;

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const parsedGrade = grade ? parseInt(grade) : undefined;


    if (!Number.isInteger(pageNum) || pageNum < 1) {
        return res.status(400).json({ success: false, error: 'Invalid page number' });
    }
    if (!Number.isInteger(limitNum) || limitNum < 1 || limitNum > DEFAULT_LIMIT) {
        return res.status(400).json({ success: false, error: `Limit must be between 1 and ${DEFAULT_LIMIT}` });
    }
    if (sortby && !SORTS.includes(sortby)) {
        return res.status(400).json({ success: false, error: 'Invalid sort parameter' });
    }
    if (ascending && !BOOLS.includes(ascending)) {
        return res.status(400).json({ success: false, error: 'Invalid sort order parameter' });
    }
    if (search && search.length > 100) {
        return res.status(400).json({ success: false, error: 'Search term too long' });
    }
    if (grade && (!Number.isInteger(parsedGrade) || parsedGrade < 1 || parsedGrade > 12)) {
        return res.status(400).json({ success: false, error: 'Grade must be a number between 1 and 12' });
    }

    const sorter = {[sortby]: BOOLS.indexOf(ascending) == 1 ? 1 : -1}
    const skip = (pageNum - 1) * limitNum;
    const filter = {};

    if (parsedGrade !== undefined) {
        filter.gradeLevel = parsedGrade;
    }
    if (subject) {
        filter.subjectArea = { $regex: new RegExp(escapeRegex(subject), 'i') };
    }
    if (search) {
        filter.$text = { $search: search };
    }

    try {
        const totalItems = await Concept.countDocuments(filter).exec();
        const totalPages = Math.ceil(totalItems / limitNum);
        const hasNext = pageNum < totalPages;
        const overMax = pageNum > totalPages && totalItems > 0;

        const results = await Concept.find(
            filter,
            '_id gradeLevel subjectArea concept',
            {
                limit: limitNum,
                skip,
                sort: sorter
            }
        ).lean().exec();

        const resultsWithUrl = results.map(doc => ({
            ...doc,
            url: `${baseUrl}/${doc.gradeLevel}/${encodeURIComponent(doc.subjectArea)}/${doc.concept}`
        }));

        const nextQuery = new URLSearchParams({...req.query});
        if (hasNext) {
            nextQuery.set('page', pageNum + 1);
        }

        let message = '';

        if (totalItems === 0) {
            message = 'No matching documents found.';
        } else if (overMax) {
            message = 'No matching documents. Page parameter exceeds total matching pages.';
        } else {
            message = `${results.length} matching documents returned.`;
        }
        return res.status(200).json({
            success: true,
            message: message,
            data: resultsWithUrl,
            count: results.length,
            pagination: {
                currentPage: pageNum,
                limit: limitNum,
                totalItems,
                totalPages,
                nextPage: hasNext ? `${baseUrl}?${nextQuery.toString()}` : null            
            }
        });
    } catch (error) {
        console.error('Error in find():', error);
        return res.status(500).json({
            success: false,
            error: `Error processing request from database: ${error.message || error}`
        });
    }
}

/*
    Endpoint for retrieving a single concept document.
    - Requires grade, subject, and slug parameters
    - Validates grade as a number between 1 and 12
    - Returns 404 if document is not found
*/
export async function findOne(req, res) {
    const { grade, subject, slug } = req.params;

    if (!grade || !subject || !slug) {
        return res.status(400).json({ success: false, error: 'Missing required parameters' });
    }

    const parsedGrade = parseInt(grade);

    if (!Number.isInteger(parsedGrade) || parsedGrade < 1 || parsedGrade > 12) {
        return res.status(400).json({ success: false, error: 'Invalid grade parameter' });
    }

    try {
        const result = await Concept.findOne({
            gradeLevel: parsedGrade,
            subjectArea: subject,
            concept: slug
        }).lean();

        if (!result) {
            return res.status(404).json({ success: false, error: 'No document found' });
        }

        return res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.error('Error in findOne():', error);
        return res.status(500).json({
            success: false,
            error: `Error retrieving document: ${error.message || error}`
        });
    }
}

/*
    Endpoint for retrieving database info on subject areas
    - Returns nested object with count, url, and grade level sub-aggregations with count and url
*/
export async function getAllSubjects(req, res) {
    const baseUrl = `${req.protocol}://${req.get('host')}/api/concepts`;
    try {
        const summary = await Concept.aggregate([
            {
                $match: {
                    subjectArea: { $ne: null },
                    gradeLevel: { $ne: null }
                }
            },
            {
                $unwind: "$gradeLevel"
            },
            {
                $group: {
                _id: {
                    subjectArea: "$subjectArea",
                    gradeLevel: "$gradeLevel"
                },
                count: { $sum: 1 }
                }
            },
            {
                $group: {
                    _id: "$_id.subjectArea",
                    gradeLevels: {
                        $push: {
                            gradeLevel: "$_id.gradeLevel",
                            count: "$count"
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    subjectArea: "$_id",
                    count: "$count",
                    gradeLevels: 1
                }
            },
            {
                $sort: { subjectArea: 1 }
            }
        ])
        return res.status(200).json({
            success: true,
            message: `${summary.length} subjects found in database.`,
            count: summary.length,
            data: summary.reduce((subjects, s)=>{
                subjects[s.subjectArea] = {
                    count: s.count,
                    url: `${baseUrl}?subject=${s.subjectArea.toLowerCase()}`,
                    gradeLevels: s.gradeLevels.reduce((grades, g)=>{
                        grades[g.gradeLevel] = {
                            count: g.count,
                            url: `${baseUrl}?grade=${g.gradeLevel}&subject=${encodeURIComponent(s.subjectArea.toLowerCase())}`
                        };
                        
                        return grades;
                    }, {})
                };
                return subjects;
            }, {})
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `Error retrieving information: ${error.message || error}`
        });
    }
}

/*
    Endpoint for retrieving database info on grade levels
    - Returns nested object with count, url, and grade level sub-aggregations with count and url
*/
export async function getAllGrades(req, res) {
    const baseUrl = `${req.protocol}://${req.get('host')}/api/concepts`;
    try {
        const summary = await Concept.aggregate([
            {
                $match: {
                    subjectArea: { $ne: null },
                    gradeLevel: { $ne: null }
                }
            },
            {
                $unwind: "$subjectArea"
            },
            {
                $group: {
                _id: {
                    gradeLevel: "$gradeLevel",
                    subjectArea: "$subjectArea"
                    
                },
                count: { $sum: 1 }
                }
            },
            {
                $group: {
                    _id: "$_id.gradeLevel",
                    subjectAreas: {
                        $push: {
                            subjectArea: "$_id.subjectArea",
                            count: "$count"
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    gradeLevel: "$_id",
                    count: "$count",
                    subjectAreas: 1
                }
            },
            {
                $sort: { gradeLevel: 1 }
            }
        ])
        return res.status(200).json({
            success: true,
            message: `${summary.length} grade levels found in database.`,
            count: summary.length,
            data: summary.reduce((grades, g)=>{
                grades[g.gradeLevel] = {
                    count: g.count,
                    url: `${baseUrl}?grade=${g.gradeLevel}`,
                    subjectAreas: g.subjectAreas.reduce((subjects, s)=>{
                        subjects[s.subjectArea] = {
                            count: s.count,
                            url: `${baseUrl}?grade=${g.gradeLevel}&subject=${encodeURIComponent(s.subjectArea.toLowerCase())}`
                        };
                        
                        return subjects;
                    }, {})
                };
                return grades;
            }, {})
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `Error retrieving information: ${error.message || error}`
        });
    }
}

/*
    Health check endpoint.
    - Confirms database is connected and contains at least one document
    - Returns uptime and timestamp
*/
export async function healthCheck(req, res) {
    try {
        const doc = await Concept.findOne({}).lean();
        if (!doc) {
            return res.status(500).json({
                success: false,
                error: 'Database is empty',
                timestamp: new Date().toISOString()
            });
        }

        return res.status(200).json({
            success: true,
            uptime: process.uptime(),
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error in healthCheck():', error);
        return res.status(500).json({
            success: false,
            error: `Database health check failed: ${error.message || error}`,
            timestamp: new Date().toISOString()
        });
    }
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

