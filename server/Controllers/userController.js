const userModel = require('../Models/userModel');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const [name, email, password] = req.body;

    let user = await userModel.findOne({ email });


};

module.exports = { registerUser }
//53:36 timer