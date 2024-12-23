import toast from "react-hot-toast";
import { client } from "../utils/utils";
import { useState } from "react";

function Home() {
  const [text, setText] = useState();
  const submitAction = async () => {
    try {
      const res = await client.get(`/`);
      console.log(res);
      setText(res.data);
    } catch (error) {
      console.log(error);
      if (error?.response) {
        return toast.error(error.response.data.message || "An error occurred.");
      }
      return toast.error("Network error or unexpected issue.");
    }
  };
  return (
    <div>
      <p>{text}</p>
      <button onClick={submitAction}>CLick</button>
    </div>
  );
}

export default Home;
