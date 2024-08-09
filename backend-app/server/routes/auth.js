const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const Joi = require('joi');
const bcrypt = require('bcrypt');


router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send({ message: "Invalid email or password" });

        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(401).send({ message: "Invalid email or password" });

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(401).send({ message: "Invalid email or password" });

        const token = user.generateAuthToken();
        res.cookie('token', token, { httpOnly: true }); // Set JWT token in a secure httpOnly cookie
        res.status(200).send({ data: { token }, message: "Logged in successfully" });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password")
    });
    return schema.validate(data);
};

module.exports = router;
