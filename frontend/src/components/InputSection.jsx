import { useState } from "react";

function InputSection({ inputFields, setIsNext }) {
  const [data, setData] = useState({});
  const onInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };
  const onSubmitData = (e) => {
    e.preventDefault();
    console.log(data);
    setIsNext(true);
  };
  return (
    <form className="w-full flex flex-col gap-3 ">
      {inputFields.map(({ name, type, placeholder, icon }, i) => (
        <label
          key={i}
          className="input input-sm input-bordered flex items-center gap-2"
        >
          {icon}
          <input
            type={type}
            name={name}
            className="grow"
            placeholder={placeholder}
            onChange={onInputChange}
            value={data[name]}
          />
        </label>
      ))}
      <button onClick={onSubmitData} className="btn btn-sm btn-primary ">
        Continue
      </button>
    </form>
  );
}

export default InputSection;
