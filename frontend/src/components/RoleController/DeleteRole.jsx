import toast from "react-hot-toast";
import { client } from "../../utils/utils";

export default function DelteRole({ role, allRoles, setAllRoles }) {
  // DELETE ROLE
  const deleteRole = async () => {
    try {
      const res = await client.delete(`/role/${role?._id}`);
      if (res?.data?.success) {
        const newArr = [...allRoles];
        const index = newArr.indexOf(role);
        if (index >= 0) {
          newArr.splice(index, 1);
        }
        setAllRoles(newArr);
        toast.success(res.data.message);
        return;
      }
      toast.error(res?.data?.message);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <button onClick={deleteRole} className="btn btn-sm btn-error text-base-100">
      Delete
    </button>
  );
}
