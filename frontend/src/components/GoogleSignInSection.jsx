import { FcGoogle } from "react-icons/fc";
function GoogleSignInSection() {
  async function onSubmit() {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`;
  }

  return (
    <button onClick={onSubmit} className="btn btn-sm w-full">
      <FcGoogle className="mr-2 h-4 w-4" />
      Continue with Google
    </button>
  );
}

export default GoogleSignInSection;
