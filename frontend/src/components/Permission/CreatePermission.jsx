import { useState } from "react";
import { client } from "../../utils/utils";

export default function CreatePermission({ setAllPermission }) {
  const [message, setMessage] = useState({ msg: null, success: null });
  const [data, setData] = useState({});

  //   HANDLE ONCHANGE
  const handleOnChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(data);
  };

  // CREATE PERMISSION
  const createPermission = async (e) => {
    e.preventDefault();
    console.log(data);

    try {
      const res = await client.post("/permission", data);
      console.log(res?.data?.message);
      if (res?.data?.success) {
        setMessage({ msg: res.data.message, success: true });
        setAllPermission((prev) => [...prev, res.data.permission]);
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
        className="btn btn-sm btn-neutral"
        onClick={() =>
          document.getElementById("my_modal_permission").showModal()
        }
      >
        Create Permission
      </button>
      <dialog id="my_modal_permission" className="modal">
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
          <form onSubmit={createPermission} className="flex flex-col gap-2">
            <h2 className="text-2xl text-center font-semibold mb-2">
              Create a Permission
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
              Create
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
}
