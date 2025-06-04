export default function cacheFor24Hours(req, res, next) {
  res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=3600');
  next();
}