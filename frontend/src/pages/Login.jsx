import { FaKey } from "react-icons/fa";
import GoogleSignInSection from "../components/GoogleSignInSection";
import InputSection from "../components/InputSection";
import { MdEmail } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { client } from "../utils/utils.js";

function Login() {
  const inputFields = [
    {
      name: "email",
      type: "text",
      placeholder: "name@example.com",
      icon: <MdEmail className="h-4 w-4 opacity-70" />,
    },
    {
      name: "password",
      type: "password",
      placeholder: "............",
      icon: <FaKey className="h-4 w-4 opacity-70" />,
    },
  ];

  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  // SUBMIT FUNCTION
  const submitAction = async (data) => {
    setLoading(true);
    const { email, password } = data;
    if (!(email && password)) {
      setLoading(false);
      return toast.error("Please, fill in the form correctly.");
    }
    try {
      const res = await client.post(`/api/auth/login`, {
        email,
        password,
      });

      setLoading(false);
      if (res.data.success) navigate("/");
    } catch (error) {
      setLoading(false);
      if (error?.response) {
        return toast.error(error.response.data.message || "An error occurred.");
      }
      return toast.error("Network error or unexpected issue.");
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center ">
      {loading && <Loader />}
      <div className="w-full max-w-[300px] px-6 py-10 space-y-5 bg-base-10 rounded-lg shadow-lg ">
        <h1 className="text-xl font-semibold text-center">Login here</h1>
        <InputSection
          inputFields={inputFields}
          setData={setData}
          data={data}
          buttonName={"Submit"}
          submitAction={submitAction}
        />
        <div className="divider text-accent text-xs uppercase">
          Or continue with
        </div>
        <GoogleSignInSection />
      </div>
    </div>
  );
}
export default Login;
