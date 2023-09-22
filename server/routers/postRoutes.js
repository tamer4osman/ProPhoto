const express = require("express");
const {verifyToken} = require("../middleware/authMiddleware");
const {getFeedPosts, getUserPosts, likePost} = require("../controllers/postController")


const router = express.Router();

// READ

router.get("/",verifyToken,getFeedPosts);
router.get("/:userId/posts",verifyToken,getUserPosts);

// Update

router.patch("/:id/like",verifyToken,likePost);

module.exports = router;
