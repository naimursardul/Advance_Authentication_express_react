import { Role } from "../models/role_model.js";
import { deleteUndefinedProp } from "../utils/utils.js";

// get all roels
async function getAllRole(req, res) {
  try {
    const allRoles = await Role.find({});
    return res.status(200).json({
      success: true,
      message: "All roles are here for you.",
      allRoles,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Server error.",
      allRoles: null,
    });
  }
}
// get single role
async function getRoleById(req, res) {
  const { id } = req.params;
  try {
    const role = await Role.findById(id);
    return res.status(200).json({
      success: true,
      message: "Role is found.",
      role,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Server error.",
      allRoles: null,
    });
  }
}
// create role
async function createRole(req, res) {
  const { name, permission } = req.body;
  if (
    !name ||
    !permission ||
    !Array.isArray(permission) ||
    permission.length <= 0
  ) {
    return res.status(200).json({
      success: false,
      message: "Please, fill in all the input fields.",
      role: null,
    });
  }

  try {
    const role = await Role.create({ name, permission });
    return res.status(200).json({
      success: true,
      message: "Role created successfully.",
      role,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Server error.",
      role: null,
    });
  }
}
// update role
async function updateRole(req, res) {
  const { id } = req.params;
  const { name, permission } = req.body;

  if (!name && !permission) {
    return res.status(200).json({
      success: false,
      message: "Please, fill in the input fields.",
      role: null,
    });
  }

  if (permission && (!Array.isArray(permission) || permission.length <= 0)) {
    return res.status(200).json({
      success: false,
      message: "Permission lists must be an array.",
      role: null,
    });
  }
  try {
    const isExist = await Role.findById(id);
    if (!isExist) {
      return res.status(200).json({
        success: true,
        message: "Role not found.",
        role: null,
      });
    }
    const data = deleteUndefinedProp({ name, permission });
    const role = await Role.findByIdAndUpdate(id, data, { new: true });
    return res.status(200).json({
      success: true,
      message: "Role has been updated.",
      role,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Server error.",
      role: null,
    });
  }
}
// delete role
async function deleteRole(req, res) {
  const { id } = req.params;
  try {
    const isExist = await Role.findById(id);
    if (!isExist) {
      return res.status(200).json({
        success: true,
        message: "Role not found.",
        role: null,
      });
    }
    await Role.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ success: true, message: "Role deleted successfully." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: "Server error." });
  }
}

export { getAllRole, getRoleById, createRole, updateRole, deleteRole };

// Checked
