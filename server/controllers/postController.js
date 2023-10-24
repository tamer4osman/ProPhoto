const Post = require('../models/Post');
const User = require('../models/User');

// Create a new post
const createPost = async (req, res) => {
    try {
        const { userId, picturePath, description, location } = req.body;
        const user = await User.findById(userId);

        // Create a new post with data from the request and user information
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

        // Save the newly created post to the database
        await newPost.save();
        
        // Retrieve all posts and send them in the response
        const posts = await Post.find();
        res.status(201).json(posts);
    } catch (error) {
        // Handle errors and send an error response
        res.status(500).json({ error: error.message });
    }
}

// Get all posts for the feed
const getFeedPosts = async (req, res) => {
    try {
        // Retrieve all posts and send them in the response
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        // Handle errors and send an error response
        res.status(500).json({ error: error.message });
    }
}

// Get posts for a specific user
const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        
        // Retrieve posts for the specified user and send them in the response
        const posts = await Post.find({ userId });
        res.status(200).json(posts);
    } catch (error) {
        // Handle errors and send an error response
        res.status(500).json({ error: error.message });
    }
}

// Like or unlike a post
const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);

        // Check if the user has already liked the post, and toggle the like
        const isLiked = post.likes.get(userId);
        isLiked ? post.likes.delete(userId) : post.likes.set(userId, true);

        // Update the post with the new likes and send the updated post in the response
        const updatedPost = await Post.findByIdAndUpdate(id, { likes: post.likes }, { new: true });
        res.status(200).json(updatedPost);
    } catch (error) {
        // Handle errors and send an error response
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createPost,
    getFeedPosts,
    getUserPosts,
    likePost
};
