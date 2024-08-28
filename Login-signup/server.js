const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect('mongodb://localhost:27017/authDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


const userSchema = new mongoose.Schema({
    firstName: String,
    middleName: String,
    lastName: String,
    email: { type: String, unique: true },
    phoneNumber: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Email does not exist' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        res.json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Register route
app.post('/register', async (req, res) => {
    const { firstName, middleName, lastName, email, phoneNumber, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            middleName,
            lastName,
            email,
            phoneNumber,
            password: hashedPassword,
        });

        await newUser.save();
        res.json({ message: 'Registration successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.listen(2000, () => {
    console.log('Server running on port 2000');
});

