import { useAuth } from "../utils/AuthContext";

function Profile() {
  const { user } = useAuth();
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="bg-primary-content p-5 rounded-lg">
        <h2 className="font-bold text-2xl">{user?.name}</h2>
        <div className="flex gap-2">
          <h3 className="font-bold">Email:</h3>
          <p>admin@gmail.com</p>
        </div>
        <div className="flex gap-2">
          <h3 className="font-bold">Role:</h3>
          <p>{user?.role}</p>
        </div>
        <div className="flex gap-2">
          <h3 className="font-bold">Last login:</h3>
          <p>{String(user?.lastLogin)}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
