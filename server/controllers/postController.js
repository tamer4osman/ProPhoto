const Post = require('../models/Post');
const User = require('../models/User');

// Create a new post

const createPost = async (req, res) => {
    try {
        const {
            userId,
            picturePath,
            description,
            location
        } = req.body;

        const user = await User.findById(userId);
        const newPost = await Post.create({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            picturePath,
            description,
            location,
            userPicturePath: user.picturePath,
            likes: {},
            comments: []
        });

        await newPost.save();
        const post = await Post.find();

        res.status(201).json( post );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// READ

const getFeedPosts = async (req, res) => {

    try {
        const post = await Post.find();
        res.status(200).json( post );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await Post.find({ userId: userId });
        res.status(200).json( posts );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// UPDATE

const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);
        isLiked ? post.likes.delete(userId) : post.likes.set(userId, true);

        const updatedPost = await post.findByIdAndUpdate(id, {likes:post.likes}, { new: true });
        res.status(200).json( updatedPost );

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// EXports

module.exports = {

    createPost,
    getFeedPosts,
    getUserPosts,
    likePost
}

