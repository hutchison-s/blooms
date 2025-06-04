function isAdmin(token) {
    const secret = process.env.ADMIN_CODE;
    return secret && token && token === secret;
}

export async function admin_check(req, res, next) {
    const bearerHeader = req.headers['authorization']
    if (!bearerHeader) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    const token = bearerHeader.split(' ')[1]
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    if (!isAdmin(token)) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    next()
}