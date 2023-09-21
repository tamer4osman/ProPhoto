const express = require("express");
const {verifyToken} = require("../middleware/authMiddleware");
const router = express.Router();
const { getUser, getUserFriends, addRemoveFriend, } = require("../controllers/userController");


router.get("/:id",verifyToken,getUser);
router.get("/:id/friends",verifyToken,getUserFriends);
router.patch("/:id/:friendId",verifyToken,addRemoveFriend);

module.exports = router;