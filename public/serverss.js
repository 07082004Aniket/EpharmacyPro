const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase')
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1); // Exit the process if unable to connect to MongoDB
    });

// Create a schema for your data
const userSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    phone: String
});

const User = mongoose.model('User', userSchema);

// Middleware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route to handle form submission
app.post('/submit', (req, res) => {
    const newUser = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone
    });

    newUser.save((err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error saving to database');
        } else {
            res.send('Data saved successfully');
        }
    });
});

// Start the server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
