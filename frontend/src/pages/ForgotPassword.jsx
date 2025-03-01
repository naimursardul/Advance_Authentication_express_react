import { useState } from "react";
import toast from "react-hot-toast";
import { MdEmail } from "react-icons/md";
import { client } from "../utils/utils";

export default function ForgotPassword() {
  const [email, setEmail] = useState();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      return toast.error("Enter the email.");
    }

    try {
      const res = await client.post("/auth/forgot-password", { email });
      console.log(email);
      if (res?.data?.success) {
        return toast.success(
          "Check your email. We have sent you a reset-link."
        );
      }
    } catch (error) {
      console.log(error);
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
            <MdEmail className="h-4 w-4 opacity-70" />
            <input
              type="text"
              name="email"
              className="grow"
              placeholder="Enter your email..."
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <button className="w-full btn btn-sm btn-primary ">Continue</button>
        </form>
      </div>
    </div>
  );
}
