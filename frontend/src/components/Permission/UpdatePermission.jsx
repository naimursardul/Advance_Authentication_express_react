import { useState } from "react";
import { client } from "../../utils/utils";

export default function UpdatePermission({ permission, setAllPermission }) {
  const [message, setMessage] = useState({ msg: null, success: null });
  const [data, setData] = useState({});

  //   HANDLE ONCHANGE
  const handleOnChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(data);
  };

  // UPDATE PERMISSION
  const updatePermission = async (e) => {
    e.preventDefault();

    try {
      const res = await client.put(`/permission/${permission?._id}`, data);
      console.log(res?.data?.message);
      if (res?.data?.success) {
        setMessage({ msg: res.data.message, success: true });
        setAllPermission((prev) =>
          prev.map((p) => {
            if (p?._id === permission?._id) {
              p = { ...res.data?.permission };
            }
            return p;
          })
        );
        return;
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
        className="btn btn-sm btn-success text-[white] btn-neutral"
        onClick={() =>
          document.getElementById("my_modal_update_permission").showModal()
        }
      >
        Edit
      </button>
      <dialog id="my_modal_update_permission" className="modal">
        <div className="modal-box ">
          <div className="modal-action">
            <form method="dialog">
              <div className="flex gap-2">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </div>
            </form>
          </div>

          {/* FORM */}
          <form onSubmit={updatePermission} className="flex flex-col gap-2">
            <h2 className="text-2xl text-center font-semibold mb-2">
              Update Permission
            </h2>
            {/* Name */}
            <div className="flex gap-2 justify-between items-center">
              <label htmlFor="name" className="font-semibold ">
                Name:
              </label>
              <input
                type="text"
                placeholder="Type here"
                name="name"
                defaultValue={permission?.name}
                className="input input-bordered input-accent w-full max-w-sm"
                onChange={handleOnChange}
              />
            </div>

            {/* Action */}
            <div className="flex gap-2 justify-between items-center">
              <label htmlFor="action" className="font-semibold ">
                Action:
              </label>
              <input
                type="text"
                placeholder="Type here"
                name="action"
                defaultValue={permission?.action}
                className="input input-bordered input-accent w-full max-w-sm"
                onChange={handleOnChange}
              />
            </div>

            {/* End */}
            <div className="flex gap-2 justify-between items-center">
              <label htmlFor="end" className="font-semibold ">
                End:
              </label>
              <input
                type="text"
                placeholder="Type here"
                name="end"
                defaultValue={permission?.end}
                className="input input-bordered input-accent w-full max-w-sm"
                onChange={handleOnChange}
              />
            </div>

            {/* Route */}
            <div className="flex gap-2 justify-between items-center">
              <label htmlFor="route" className="font-semibold ">
                Route:
              </label>
              <input
                type="text"
                placeholder="Type here"
                name="route"
                defaultValue={permission?.route}
                className="input input-bordered input-accent w-full max-w-sm"
                onChange={handleOnChange}
              />
            </div>

            {/* Method */}
            <div className="flex gap-2 justify-between items-center">
              <label htmlFor="method" className="font-semibold ">
                Method:
              </label>
              <input
                type="text"
                placeholder="Type here"
                name="method"
                defaultValue={permission?.method}
                className="input input-bordered input-accent w-full max-w-sm"
                onChange={handleOnChange}
              />
            </div>

            {/* DISPLAY MESSAGE */}
            <div>
              {message?.msg && message?.success ? (
                <small className="text-success">{message.msg}</small>
              ) : (
                <small className="text-error">{message.msg}</small>
              )}
            </div>
            <button type="submit" className="btn btn-neutral mb-2">
              Update
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
}
