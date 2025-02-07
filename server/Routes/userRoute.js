const express = require('express')
const { registerUser } = require('../Controllers/userController')
const router = express.Router();

router.get("/register", (req, res) => {
    res.send("Register");
});

module.exports = router;