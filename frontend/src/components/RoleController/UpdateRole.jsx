import { useState } from "react";
import { client } from "../../utils/utils.js";

export default function UpdateRole({ role, allPermission, setAllRoles }) {
  const [name, setName] = useState(role?.name);
  const [message, setMessage] = useState({ msg: null, success: null });
  const rolePermission = [...role?.permission];

  // ON INPUT CHANGE
  const onInputChange = async (event) => {
    const { value, checked } = event.target;

    if (rolePermission.includes(value) && !checked) {
      const index = rolePermission.indexOf(value);
      if (index > -1) {
        rolePermission.splice(index, 1);
      }
    }

    if (!rolePermission.includes(value) && checked) {
      console.log(1);
      rolePermission.push(value);
    }
    console.log(rolePermission);
  };

  // UPDATING ROLE
  const updateRole = async () => {
    try {
      const res = await client.put(`/role/${role?._id}`, {
        name,
        permission: rolePermission,
      });
      console.log(res.data?.message);
      if (res?.data?.success) {
        setAllRoles((prev) =>
          prev.map((r) => {
            if (r?._id === role?._id) {
              r = { ...res.data?.role };
            }
            return r;
          })
        );
        return setMessage({ msg: res.data.message, success: true });
      }
      return setMessage({ msg: res.data.message, success: false });
    } catch (error) {
      console.log(error);
      return setMessage({ msg: error.message, success: false });
    }
  };

  return (
    <div>
      <button
        className="btn btn-sm btn-success text-base-100"
        onClick={() =>
          document.getElementById(`my_modal_${role?._id}`).showModal()
        }
      >
        Edit
      </button>
      <dialog id={`my_modal_${role?._id}`} className="modal">
        <div className="modal-box">
          <div className="modal-action">
            <form method="dialog">
              <div className="flex gap-2">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </div>
            </form>
          </div>
          <div className=" flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl text-center font-semibold mb-2">
                Update Role
              </h2>
              <h3 className="font-semibold ">Name of the role:</h3>
              <input
                type="text"
                placeholder="Type here"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered input-accent w-full max-w-xs"
              />
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold ">Permissions:</h3>
              {allPermission && allPermission.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {allPermission.map((permission, i) => (
                    <label
                      key={i}
                      className="flex gap-2 items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        name="permission"
                        value={permission?._id}
                        className="checkbox"
                        defaultChecked={role?.permission.includes(
                          permission?._id
                        )}
                        onChange={onInputChange}
                      />
                      <span className="label-text">{permission?.name}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <div>No Permissions found.</div>
              )}
            </div>
            <div>
              {message?.msg && message?.success ? (
                <small className="text-success">{message.msg}</small>
              ) : (
                <small className="text-warning">{message.msg}</small>
              )}
            </div>
            <button
              type="submit"
              onClick={updateRole}
              className="btn btn-neutral mb-2"
            >
              Update
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
