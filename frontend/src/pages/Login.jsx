import { FaKey } from "react-icons/fa";
import GoogleSignInSection from "../components/GoogleSignInSection";
import InputSection from "../components/InputSection";
import { MdEmail } from "react-icons/md";

function Login() {
  const inputFields = [
    {
      type: "text",
      placeholder: "name@example.com",
      icon: <MdEmail className="h-4 w-4 opacity-70" />,
    },
    {
      type: "password",
      placeholder: "............",
      icon: <FaKey className="h-4 w-4 opacity-70" />,
    },
  ];
  return (
    <div className="w-full h-full flex justify-center items-center ">
      <div className="w-full max-w-[300px] px-6 py-10 space-y-5 bg-base-10 rounded-lg shadow-lg ">
        <h1 className="text-xl font-semibold text-center">Login here</h1>
        <InputSection inputFields={inputFields} />
        <div className="divider text-accent text-xs uppercase">
          Or continue with
        </div>
        <GoogleSignInSection />
      </div>
    </div>
  );
}
export default Login;
