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

        // const newUser = new User({
        //     firstName,
        //     lastName,
        //     email,
        //     password: hashedPassword,
        //     picturePath,
        //     friends,
        //     location,
        //     occupation,
        //     viewedProfile: Math.floor(Math.random() * 1000),
        //     impressions: Math.floor(Math.random() * 1000),
        //     validated: false

        // });
        const sevedUser = await newUser.save();
        res.status(201).json({ sevedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/*export signUp function*/
module.exports = {
    signUp
};