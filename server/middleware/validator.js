const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        return res.status(401).json(error.errors.map(error => error.message));
    }
}

module.exports = {validate};