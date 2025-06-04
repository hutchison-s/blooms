import Book from "../models/Book.js";

const DEFAULT_LIMIT = 50;
const SORTS = ['title', 'author', 'genre']
const BOOLS = ['false', 'true']

/**
 * GET /api/books
 * Fetch a paginated, searchable, and sortable list of books.
 * 
 * Query Parameters:
 * - search (string): optional text to search for (max length 100)
 * - sortby (string): optional field to sort by ('title', 'author', or 'genre'; default: 'title')
 * - ascending (string): optional sort order ('true' for ascending, 'false' for descending; default: 'true')
 * - page (number): page number to retrieve (default: 1)
 * - limit (number): number of items per page (max: DEFAULT_LIMIT)
 * 
 * Returns:
 * - JSON object containing paginated book results with metadata
 */
export async function find(req, res) {
    const baseUrl = `${req.protocol}://${req.get('host')}/books`;
    const { search, sortby = 'title', ascending = 'true', page = 1, limit = DEFAULT_LIMIT } = req.query;

    const pageNum = Number(page);
    const limitNum = Number(limit);

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

    const sorter = {[sortby]: BOOLS.indexOf(ascending) == 1 ? 1 : -1}
    const skip = (pageNum - 1) * limitNum;
    const filter = {};
    if (search) {
        filter.$or = [
            { title: { $regex: search, $options: 'i' } },
            { author: { $regex: search, $options: 'i' } },
            { genre: { $regex: search, $options: 'i' } }
        ];
    }

    try {
        const totalItems = await Book.countDocuments(filter).exec();
        const totalPages = Math.ceil(totalItems / limitNum);
        const hasNext = pageNum < totalPages;
        const overMax = pageNum > totalPages && totalItems > 0;

        const results = await Book.find(
            filter,
            '_id title author genre synopsis slug',
            {
                limit: limitNum,
                skip,
                sort: sorter
            }
        ).lean().exec();

        const resultsWithUrl = results.map(doc => ({
            ...doc,
            url: `${baseUrl}/${doc.slug}`
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

/**
 * GET /api/books/:slug
 * Retrieve a single book by its slug.
 * 
 * Route Parameters:
 * - slug (string): required unique identifier for the book
 * 
 * Returns:
 * - JSON object containing the book's full details
 */
export async function findOne(req, res) {
    try {
        const {slug} = req.params;
        if (!slug) return res.status(400).json({ success: false, error: 'Missing required parameters' });
        const b = await Book.findOne({slug: slug}).lean();
        if (!b) return res.status(404).json({ success: false, error: 'No document found' });
        return res.status(200).json({success: true, data: b});
    } catch (error) {
        console.error('Error in findOne():', error);
        return res.status(500).json({success: false, error: error.message || error})
    }
}
