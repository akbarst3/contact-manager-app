const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    const authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader?.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    console.error("JWT Verification Error:", err);
                    res.status(403);
                    throw new Error("Invalid token");
                }
                req.user = decoded.user;
                return next();
            });
        } else {
            res.status(401);
            throw new Error("No token provided");
        }
    } else {
        res.status(401);
        throw new Error("No token provided");
    }
});

module.exports = validateToken;