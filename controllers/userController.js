const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userRegister = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("Please fill in all fields");
    }
    const user = await User.findOne({ email });
    if (user) {
        res.status(400);
        throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        username, email, password: hashedPassword
    })
    if (newUser) {
        console.log(newUser)
        res.status(201).json({
            _id: newUser._id,
            email: newUser.email,
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data");
    }
})

const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Please fill in all fields");
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, process.env.JWT_SECRET, { expiresIn: '15m' });
        res.json({
            _id: user.id,
            email: user.email,
            accessToken
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

const currentLogin = asyncHandler(async (req, res) => {
    res.json(req.user);
})

module.exports = { userRegister, userLogin, currentLogin }