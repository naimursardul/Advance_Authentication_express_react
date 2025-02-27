import toast from "react-hot-toast";
import { client } from "../../utils/utils";

export default function DeltePermission({ permission, setAllPermission }) {
  // DELETE PERMISSION
  const deletePermission = async () => {
    try {
      const res = await client.delete(`/permission/${permission?._id}`);
      if (res?.data?.success) {
        setAllPermission((prev) => {
          const newArr = [...prev];
          const index = newArr.indexOf(permission);
          if (index >= 0) {
            newArr.splice(index, 1);
          }
          return newArr;
        });
        toast.success(res.data.message);
        return;
      }
      toast.error(res?.data?.message);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <button
      onClick={deletePermission}
      className="btn btn-sm btn-error text-base-100"
    >
      Delete
    </button>
  );
}
