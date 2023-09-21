const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/* signUp User*/

signUp = async (req, res) => {
    try {
        const { 
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;

        const salt =await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser =  User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 1000),
            impressions: Math.floor(Math.random() * 1000),
            validated: false
        });

        const sevedUser = await newUser.save();
        res.status(201).json({ sevedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//login user

login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email})
        if(!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(404).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ user, token });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/*export signUp function*/
module.exports = {
    signUp
};