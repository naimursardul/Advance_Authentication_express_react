import axios from "axios";

const client = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
});

// const userLocalStorage = (action, userRole) => {
//   const userExistedInLocal = localStorage.getItem("user");

//   if (action === "add" && !userExistedInLocal) {
//     localStorage.setItem("user", userRole);
//     return;
//   } else localStorage.removeItem("user");
// };

export { client };
