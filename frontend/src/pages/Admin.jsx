import { useEffect, useState } from "react";
import { client } from "../utils/utils";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

function Admin() {
  const [allUser, setAllUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sectionLoading, setSectionLoading] = useState(false);

  async function getAlluser() {
    setSectionLoading(true);
    try {
      const res = await client.get("/user");
      console.log(res?.data);
      if (!res?.data.success) {
        setSectionLoading(false);
        return;
      }
      setSectionLoading(false);
      return setAllUser(res?.data.allUser);
    } catch (error) {
      console.log(error);
      setSectionLoading(false);
    }
  }
  // Update user
  async function updateUser(e, id) {
    e.preventDefault();
    console.log(e.target.value);
    console.log(id);
    setLoading(true);
    try {
      const res = await client.put(`/user/${id}`, { role: e.target.value });
      if (!res?.data.success) {
        setLoading(false);
        return toast.error(res.data.message);
      }
      setLoading(false);
      return toast.success("Updated user's role.");
    } catch (error) {
      console.log(error);
      setLoading(false);
      return toast.error("Error in updating user's role.");
    }
  }
  // Delete user
  async function deleteUser(id) {
    setLoading(true);
    try {
      const res = await client.delete(`/user/${id}`);
      if (!res?.data.success) {
        setLoading(false);
        return toast.error(res.data.message);
      }
      setLoading(false);
      return toast.success("User deleted successfully.");
    } catch (error) {
      console.log(error);
      setLoading(false);
      return toast.error("Error in deleting.");
    }
  }
  useEffect(() => {
    getAlluser();
  }, []);
  return (
    <div>
      {loading && <Loader />}
      <h1>Admin can only access this page.</h1>
      <h2 className="text-4xl font-bold mb-5">User lists</h2>
      {sectionLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {allUser?.length &&
            allUser.map((user, i) => (
              <li
                key={i}
                className="flex max-md:flex-col gap-5 md:items-center justify-between bg-base-300 px-5 py-2 rounded"
              >
                <h3>{user?.email}</h3>
                <div className="flex gap-5 items-center justify-between text-sm font-semibold">
                  <select
                    onChange={(e) => updateUser(e, user?._id)}
                    className="select select-bordered w-full max-w-xs"
                  >
                    <option selected={user?.role === "admin"} value={"admin"}>
                      Admin
                    </option>
                    <option
                      selected={user?.role === "moderator"}
                      value={"moderator"}
                    >
                      Moderator
                    </option>
                    <option selected={user?.role === "editor"} value={"editor"}>
                      Editor
                    </option>
                    <option selected={user?.role === "user"} value={"user"}>
                      User
                    </option>
                  </select>
                  <button
                    className="btn btn-netral "
                    onClick={() => deleteUser(user?._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
        </div>
      )}
    </div>
  );
}

export default Admin;
