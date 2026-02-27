const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET

function generateToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
}

function generateRefreshToken(payload) {
    return jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '7d' });
}

function verifyRefreshToken(token) {
    try {
        return jwt.verify(token, process.env.REFRESH_SECRET);
    } catch (err) {
        return null;
    }
}

function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (err) {
        return null;
    }
}

module.exports = {
    generateToken,
    generateRefreshToken,
    verifyRefreshToken,
    verifyToken
};