import { useState } from "react";
import toast from "react-hot-toast";
import { FaKey } from "react-icons/fa";
import { client } from "../utils/utils";
import { useNavigate, useParams } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState();
  const { resetToken } = useParams();
  const navigate = useNavigate();

  console.log(resetToken);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      return toast.error("Enter the password.");
    }

    try {
      const res = await client.post(`/auth/reset-password/${resetToken}`, {
        password,
      });
      if (res?.data?.success) {
        return navigate("/login");
      }
    } catch (error) {
      // console.log(error);
      return toast.error(error?.message);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center ">
      <div className="min-w-[300px] px-6 py-10 bg-base-10 shadow-lg rounded-xl">
        <h1 className="text-2xl text-center mb-5">Reset your password</h1>

        {/* FORM */}
        <form onSubmit={handleOnSubmit} className="flex flex-col gap-3 ">
          <label className="w-full input input-sm input-bordered flex items-center gap-2">
            <FaKey className="h-4 w-4 opacity-70" />{" "}
            <input
              type="text"
              name="password"
              className="grow"
              placeholder="Enter your new password..."
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button className="w-full btn btn-sm btn-primary ">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}
