import { useState } from "react";
import { client } from "../../utils/utils";

export default function CreateRole({ allPermission, setAllRoles }) {
  const [name, setName] = useState();
  const [message, setMessage] = useState({ msg: null, success: null });
  const rolePermission = [];

  //   ON INPUT CHANGE
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

  // CREATE ROLE
  const createRole = async () => {
    console.log({ name, permission: rolePermission });
    try {
      const res = await client.post("/role", {
        name,
        permission: rolePermission,
      });
      console.log(res?.data?.message);
      if (res?.data?.success) {
        setAllRoles((prev) => [...prev, res.data.role]);
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
        className="btn btn-sm btn-neutral"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        Create Role
      </button>
      <dialog id="my_modal_1" className="modal">
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
                Create a Role
              </h2>
              <h3 className="font-semibold ">Name of the role:</h3>
              <input
                type="text"
                placeholder="Type here"
                name="name"
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
                <small className="text-error">{message.msg}</small>
              )}
            </div>
            <button
              type="submit"
              onClick={createRole}
              className="btn btn-neutral mb-2"
            >
              Create
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
