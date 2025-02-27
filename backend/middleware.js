import { Permission } from "./models/permission_model.js";
import { Role } from "./models/role_model.js";

async function authMiddleWare(req, res, next) {
  try {
    if (!req?.user) {
      return res
        .status(200)
        .json({ success: false, message: "You are not authenticated." });
    }

    // Checking for permission
    const { method, baseUrl, route } = req;
    console.log(`${baseUrl}${route.path !== "/" ? route.path : ""}`);

    const findPermission = await Permission.findOne({
      method,
      route: `${baseUrl}${route.path !== "/" ? route.path : ""}`,
    })
      .where("end")
      .in(["both", "server"]);

    if (!findPermission) {
      console.log("No Restriction.");
      return next();
    }

    console.log(findPermission);

    const roleData = await Role.findOne({
      name: { $regex: new RegExp(req.user?.role, "i") },
    });
    console.log(roleData);

    if (!roleData?.permission.includes(findPermission._id)) {
      return res
        .status(200)
        .json({ success: false, message: "You are not authorized." });
    }

    return next();
  } catch (err) {
    console.log(err);
    return res
      .status(200)
      .json({ success: false, message: "You are not authenticated." });
  }
}

export default authMiddleWare;
