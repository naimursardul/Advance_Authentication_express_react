import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../utils/AuthContext.jsx";
import { client } from "../utils/utils.js";
import SectionLoader from "./SectionLoader.jsx";
import Loader from "./Loader.jsx";

function Control() {
  const { user: authUser } = useAuth();
  const [allUser, setAllUser] = useState([]);
  const [allRoles, setAllRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sectionLoading, setSectionLoading] = useState(false);
  // Get all users
  async function getAlluser() {
    setSectionLoading(true);
    try {
      const res = await client.get("/user");
      console.log(res?.data);
      if (res?.data.success && res?.data.allUser) {
        setSectionLoading(false);
        const newArr = res?.data.allUser.filter(
          (user) => user?._id !== authUser?._id
        );

        return setAllUser(newArr);
      }
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

  //   GET ALL ROLES
  const getAllRoles = async () => {
    try {
      const res = await client.get("/role");
      if (res?.data?.success) {
        setAllRoles(res?.data?.allRoles);
      }
      return;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  useEffect(() => {
    getAlluser();
  }, []);

  useEffect(() => {
    getAllRoles();
  }, []);

  return (
    <div>
      {loading && <Loader />}
      <h2 className="text-4xl font-bold mb-5">User lists</h2>
      {sectionLoading ? (
        <SectionLoader />
      ) : (
        <div className="flex flex-col gap-5">
          {allUser?.length > 0 &&
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
                    {allRoles?.length > 0 &&
                      allRoles.map((role, i) => (
                        <option
                          key={i}
                          selected={user?.role === role?.name}
                          value={role?.name}
                        >
                          {role?.name}
                        </option>
                      ))}
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

export default Control;
