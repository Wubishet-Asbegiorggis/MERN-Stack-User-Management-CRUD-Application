import User from '../model/userModel.js'; // Ensure this path is correct

export const create = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const { email } = newUser;
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const savedData = await newUser.save();
    return res.status(200).json({ message: 'User added to the database successfully.' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const userData = await User.find();

    if (!userData || userData.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    return res.status(200).json(userData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const userExist = await User.findById(userId);

    if (!userExist) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(userExist);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;
    const userExist = await User.findByIdAndUpdate(userId, updatedData, { new: true });

    if (!userExist) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User updated successfully.' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userExist = await User.findByIdAndDelete(userId);

    if (!userExist) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
