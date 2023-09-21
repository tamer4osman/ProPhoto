const User = require("../models/User");

// READ

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const friends = await User.find({ _id: { $in: user.friends } });
    formattedFriends = friends.map((friend) => {
      return {
        id: friend._id,
        firstName: friend.firstName,
        lastName: friend.lastName,
        picturePath: friend.picturePath,
        location: friend.location,
        occupation: friend.occupation,
      };
    });
    res.status(200).json({ friends: formattedFriends });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//UPDATE

const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await User.find({ _id: { $in: user.friends } });
    formattedFriends = friends.map((friend) => {
      return {
        id: friend._id,
        firstName: friend.firstName,
        lastName: friend.lastName,
        picturePath: friend.picturePath,
        location: friend.location,
        occupation: friend.occupation,
      };
    });
    res.status(200).json({ friends: formattedFriends });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUser,
  getUserFriends,
  addRemoveFriend,
};
