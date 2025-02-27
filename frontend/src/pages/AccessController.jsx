import { client } from "../utils/utils.js";
import { useEffect, useState } from "react";
import SectionLoader from "../components/SectionLoader.jsx";
import CreateRole from "../components/RoleController/CreateRole.jsx";
import UpdateRole from "../components/RoleController/UpdateRole.jsx";
import DelteRole from "../components/RoleController/DeleteRole.jsx";
import CreatePermission from "../components/Permission/CreatePermission.jsx";
import UpdatePermission from "../components/Permission/UpdatePermission.jsx";
import DeltePermission from "../components/Permission/DeletePermission.jsx";

export default function AccessController() {
  const [roleLoading, setRoleLoading] = useState(false);
  const [permissionLoading, setPermissionLoading] = useState(false);
  const [allRoles, setAllRoles] = useState([]);
  const [allPermission, setAllPermission] = useState([]);

  //   GET ALL ROLES
  const getAllRoles = async () => {
    setRoleLoading(true);
    try {
      const res = await client.get("/role");
      if (res?.data?.success) {
        setAllRoles(res?.data?.allRoles);
      }
      setRoleLoading(false);
      return;
    } catch (error) {
      console.log(error);
      setRoleLoading(false);
      return;
    }
  };

  // GET ALL PERMISSIONS
  const getAllPermisssion = async () => {
    setPermissionLoading(true);
    try {
      const res = await client.get("/permission");
      if (res?.data?.success) {
        setAllPermission(res?.data?.allPermission);
      }
      return setPermissionLoading(false);
    } catch (error) {
      console.log(error);
      return setPermissionLoading(false);
    }
  };

  useEffect(() => {
    getAllPermisssion();
  }, []);

  useEffect(() => {
    getAllRoles();
  }, []);

  return (
    <div className="w-full flex max-sm:flex-col gap-5">
      <div className="flex-1 space-y-4">
        <h2 className="w-full text-4xl font-semibold">Role</h2>

        {/* CREATE ROLE  */}
        <CreateRole allPermission={allPermission} setAllRoles={setAllRoles} />

        {/* DISPLAYE ROLES */}
        {roleLoading ? (
          <SectionLoader />
        ) : (
          <div>
            {Array.isArray(allRoles) && allRoles.length > 0 ? (
              <div className="flex flex-col gap-2">
                {allRoles.map((role, i) => (
                  <div
                    key={i}
                    className="flex flex-col justify-center gap-4 bg-base-200 px-5 py-3 rounded"
                  >
                    <div className="flex gap-5 justify-between items-center">
                      <h3 className="font-semibold">{role?.name}</h3>
                      <div className="flex gap-2">
                        {/* UPDATE ROLE */}
                        <UpdateRole
                          role={role}
                          allPermission={allPermission}
                          setAllRoles={setAllRoles}
                        />

                        {/* DELETE ROLE */}
                        <DelteRole
                          role={role}
                          allRoles={allRoles}
                          setAllRoles={setAllRoles}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>No roles found.</div>
            )}
          </div>
        )}
      </div>

      {/* PERMISSION */}
      <div className="flex-1 space-y-4">
        <h2 className="w-full text-4xl font-semibold">Permission</h2>

        {/* CREATE PERMISSION  */}
        <CreatePermission setAllPermission={setAllPermission} />

        {/* DISPLAYE ROLES */}
        {permissionLoading ? (
          <SectionLoader />
        ) : (
          <div>
            {Array.isArray(allPermission) && allPermission.length > 0 ? (
              <div className="flex flex-col gap-2">
                {allPermission.map((permission, i) => (
                  <div
                    key={i}
                    className="flex flex-col justify-center gap-4 bg-base-200 px-5 py-3 rounded"
                  >
                    <div className="flex gap-5 justify-between items-center">
                      <h3 className="font-semibold">{permission?.name}</h3>
                      <div className="flex gap-2">
                        {/* UPDATE PERMISSION */}
                        <UpdatePermission
                          permission={permission}
                          setAllPermission={setAllPermission}
                        />

                        {/* DELETE PERMISSION */}
                        <DeltePermission
                          permission={permission}
                          setAllPermission={setAllPermission}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>No roles found.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
