const User = require("../models/User");

// READ

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    // Fetch the user by their ID
    const user = await User.findById(id);
    // Respond with the user data
    res.status(200).json({ user });
  } catch (error) {
    // Handle errors and respond with an error message
    res.status(500).json({ error: error.message });
  }
};

const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    // Fetch the user by their ID
    const user = await User.findById(id);
    // Find friends based on user's friends array
    const friends = await User.find({ _id: { $in: user.friends } });

    // Format friend data
    const formattedFriends = friends.map((friend) => ({
      id: friend._id,
      firstName: friend.firstName,
      lastName: friend.lastName,
      picturePath: friend.picturePath,
      location: friend.location,
      occupation: friend.occupation,
    }));

    // Respond with the formatted friends data
    res.status(200).json({ friends: formattedFriends });
  } catch (error) {
    // Handle errors and respond with an error message
    res.status(500).json({ error: error.message });
  }
};

// UPDATE

const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    // Fetch the user and friend by their IDs
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      // If the friend is already in the user's friends list, remove them
      user.friends = user.friends.filter((friend) => friend !== friendId);
      friend.friends = friend.friends.filter((friend) => friend !== id);
    } else {
      // If the friend is not in the user's friends list, add them
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    // Save the changes to the user and friend objects
    await Promise.all([user.save(), friend.save()]);

    // Find and format the updated list of friends
    const friends = await User.find({ _id: { $in: user.friends } });

    const formattedFriends = friends.map((friend) => ({
      id: friend._id,
      firstName: friend.firstName,
      lastName: friend.lastName,
      picturePath: friend.picturePath,
      location: friend.location,
      occupation: friend.occupation,
    }));

    // Respond with the updated friends list
    res.status(200).json({ friends: formattedFriends });
  } catch (error) {
    // Handle errors and respond with an error message
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUser,
  getUserFriends,
  addRemoveFriend,
};
