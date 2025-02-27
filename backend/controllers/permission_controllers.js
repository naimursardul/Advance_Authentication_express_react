import { Permission } from "../models/permission_model.js";
import { deleteUndefinedProp } from "../utils/utils.js";

// create permission
async function createPermission(req, res) {
  const { name, action, end, method, route } = req.body;
  if (!name || !action || !end) {
    return res.status(200).json({
      success: false,
      message: "You must need to fill in the required fields.",
      role: null,
    });
  }
  if ((end === "server" || end === "both") && (!method || !route)) {
    return res.status(200).json({
      success: false,
      message:
        "You must need to fill in the method and route filed, if you set the value of 'end' filed to 'server' or 'both'.",
      permission: null,
    });
  }
  try {
    const data = deleteUndefinedProp({
      name,
      action,
      end,
      method,
      route,
    });
    const newPermission = await Permission.create(data);

    return res.status(200).json({
      success: true,
      message: "New permission created successfully.",
      permission: newPermission,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "There is an error in server side.",
      permission: null,
    });
  }
}

// getAllPermission permission
async function getAllPermission(req, res) {
  try {
    const allPermission = await Permission.find({});

    res.status(200).json({
      success: true,
      message: "All permissions are here.",
      allPermission,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "There is an error in server side.",
      allPermission: null,
    });
  }
}

// Get permission by id
async function getPermissionById(req, res) {
  const { id } = req.params;
  try {
    const permission = await Permission.findById(id);

    res.status(200).json({
      success: true,
      message: "Your requested permissions is here.",
      permission,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "There is an error in server side.",
      permission: null,
    });
  }
}

// update permission
async function updatePermission(req, res) {
  const { name, action, end, method, route } = req.body;
  const { id } = req.params;

  try {
    const isExist = await Permission.findById(id);
    if (!isExist) {
      return res.status(200).json({
        success: true,
        message: "Permission not found.",
        permission: null,
      });
    }
    const data = deleteUndefinedProp({
      name,
      action,
      end,
      method,
      route,
    });
    const updatedPermission = await Permission.findByIdAndUpdate(id, data, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: "Permission updated successfully.",
      permission: updatedPermission,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "There is problem is server side.",
      permission: null,
    });
  }
}

// delete permission
async function deletePermission(req, res) {
  const { id } = req.params;
  try {
    const isExist = await Permission.findById(id);
    if (!isExist) {
      return res.status(200).json({
        success: true,
        message: "Permission not found.",
        permission: null,
      });
    }
    await Permission.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ success: true, message: "Permission deleted successfully." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: "Server error." });
  }
}

export {
  createPermission,
  getAllPermission,
  getPermissionById,
  updatePermission,
  deletePermission,
};

// CHECKED
