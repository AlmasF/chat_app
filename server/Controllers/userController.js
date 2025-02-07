const userModel = require('../Models/userModel');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const [name, email, password] = req.body;

    let user = await userModel.findOne({ email });

    if (user) {
        return res.status().json("User with this email already exists");
    }

    if (!name || !email || !password) {
        return res.status(400).json("All fields are required");
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json("Invalid email");
    }

    if (!validator.isStrongPassword(password)) {
        return res.status(400).json("Password is not strong enough");
    }

    user = new userModel({
        name,
        email,
        password
    });
};

module.exports = { registerUser }
//1:00:29 timer