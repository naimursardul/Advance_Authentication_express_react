import bcryptjs from "bcryptjs";
import { User } from "../models/user_model.js";

// Get all users
async function getAllUser(req, res) {
  if (!req?.user) {
    return res
      .status(200)
      .json({ success: false, message: "You aren't authenticated." });
  }
  try {
    const controller = req.user;
    if (controller.role !== "admin") {
      return res.status(200).json({
        success: false,
        message: "Only admin can get account user's details.",
      });
    }
    const allUser = await User.find({});
    return res
      .status(200)
      .json({ success: true, message: "All users found.", allUser });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: false,
      message: "Error in server side.",
      allUser: null,
    });
  }
}
// Get user by id
async function getUserById(req, res) {
  const { id } = req.params;
  if (!req?.user) {
    return res
      .status(200)
      .json({ success: false, message: "You aren't authenticated." });
  }
  try {
    const controller = req.user;
    if (id !== controller?._id && controller.role !== "admin") {
      return res.status(200).json({
        success: false,
        message: "Only admin or user can get account user's details.",
      });
    }
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(200)
        .json({ success: false, message: "No user found.", user: null });
    }
    return res
      .status(200)
      .json({ success: true, message: "User found.", user });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: false,
      message: "Error in server side.",
      user: null,
    });
  }
}
// Update users
async function updateUser(req, res) {
  const { id } = req.params;
  const { role, provider, ...others } = req.body;
  if (!req?.user) {
    return res
      .status(200)
      .json({ success: false, message: "You aren't authenticated." });
  }
  try {
    const controller = req.user;

    if (others?.password) {
      others.password = await bcryptjs.hash(others.password, 10);
    }
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(200)
        .json({ success: false, message: "No user found.", user: null });
    }
    if (user.provider !== "credentials" && others?.password) {
      delete others.password;
    }
    // If user wants to update himself
    if (controller?._id.toString() === id) {
      if (role)
        return res.status(200).json({
          success: false,
          message: "You can't change your role.",
          user: null,
        });
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { ...others },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        message: "User is updated.",
        user: updatedUser,
      });
    }
    //
    //
    //
    //

    // Is controller the admin
    if (controller.role !== "admin") {
      return res.status(200).json({
        success: false,
        message: "Only Admin can change user details.",
        user: null,
      });
    }

    // Update by Admin
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { ...others, role },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "User is updated.",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: false,
      message: "Error in server side.",
      user: null,
    });
  }
}

// Delete users
async function deleteUser(req, res) {
  const { id } = req.params;
  if (!req?.user) {
    return res
      .status(200)
      .json({ success: false, message: "You aren't authenticated." });
  }

  try {
    const controller = req.user;
    const user = await User.findById(id);
    if (!user) {
      return res.status(200).json({
        success: false,
        message: "User not found..",
      });
    }

    if (id !== controller?._id && controller.role !== "admin") {
      return res.status(200).json({
        success: false,
        message: "Only admin or user himself can delete his account.",
      });
    }
    await User.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "User is deleted.",
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: false,
      message: "Error in server side.",
    });
  }
}

export { getAllUser, getUserById, updateUser, deleteUser };
