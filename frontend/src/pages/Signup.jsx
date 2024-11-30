import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaKey, FaUser } from "react-icons/fa";
import { useState } from "react";
import OtpInput from "react-otp-input";
import toast from "react-hot-toast";
import GoogleSignInSection from "../components/GoogleSignInSection";
import InputSection from "../components/InputSection";
import { client } from "../utils/utils.js";
import Loader from "../components/Loader.jsx";

function Signup() {
  const inputFields = [
    {
      name: "name",
      type: "text",
      placeholder: "John Doe",
      icon: <FaUser className="h-4 w-4 opacity-70" />,
    },
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
  const [isNext, setIsNext] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  // SUBMIT FUNCTION
  const submitAction = async (data) => {
    setLoading(true);
    const { name, email, password } = data;
    if (!(name && email && password)) {
      setLoading(false);
      return toast.error("Please, fill in the form correctly.");
    }
    try {
      const res = await client.post(`/api/auth/signup`, {
        name,
        email,
        password,
      });

      setLoading(false);
      if (res.data.success) setIsNext(true);
    } catch (error) {
      setLoading(false);
      if (error?.response) {
        return toast.error(error.response.data.message || "An error occurred.");
      }
      return toast.error("Network error or unexpected issue.");
    }
  };

  // SUBMIT FUNCTION
  const onCodeSubmit = async () => {
    setLoading(true);
    if (!code) {
      setLoading(false);
      return toast.error("Please, fill in the form correctly.");
    }
    try {
      const res = await client.post(`/api/auth/verify-email`, {
        code,
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
      <div className="w-[300px] rounded-lg shadow-lg overflow-x-clip ">
        <div className={`w-full flex ${isNext && "translate-x-[-100%]"}`}>
          {/* First Input */}
          <div className="min-w-[300px] px-6 py-10 flex flex-col gap-5 bg-base-10  ">
            <h1 className="text-xl font-semibold text-center ">
              Create your account
            </h1>
            <InputSection
              inputFields={inputFields}
              setData={setData}
              data={data}
              buttonName={"Continue"}
              submitAction={submitAction}
            />
            <div className="divider text-accent text-xs uppercase">
              Or continue with
            </div>
            <GoogleSignInSection />
          </div>
          {/* Second input (CODE) */}
          <div className="min-w-[300px] px-6 py-10 flex flex-col gap-4 bg-base-10  ">
            <h1 className="font-bold text-lg">Enter verification code:</h1>
            <p className="text-xs leading-4 ">
              An email has been sent to your account with a verification code.
            </p>
            <div className="flex justify-center text-base-content">
              <OtpInput
                value={code}
                onChange={(code) => setCode(code)}
                numInputs={6}
                renderSeparator={<span style={{ width: "8px" }}></span>}
                isInputNum={true}
                shouldAutoFocus={true}
                renderInput={(props) => <input {...props} />}
                inputStyle={{
                  border: "1px solid gray",
                  backgroundColor: "transparent",
                  borderRadius: "8px",
                  width: "30px",
                  height: "30px",
                  fontSize: "12px",
                  fontWeight: "400",
                  caretColor: "blue",
                }}
                focusStyle={{
                  border: "1px solid #CFD3DB",
                  outline: "none",
                }}
              />
            </div>
            <div>
              <div className="space-x-2 text-xs mt-2">
                <span>Wrong email?</span>
                <button
                  onClick={() => setIsNext(false)}
                  className="link link-error text-xs"
                >
                  Change email
                </button>
              </div>
            </div>
            <button
              onClick={onCodeSubmit}
              className="w-full btn btn-sm btn-primary "
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
