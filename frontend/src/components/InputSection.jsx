import { Link } from "react-router-dom";

function InputSection({
  inputFields,
  data,
  setData,
  buttonName,
  submitAction,
}) {
  const onInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };
  const onSubmitData = (e) => {
    e.preventDefault();
    console.log(data);
    return submitAction(data);
  };

  return (
    <div>
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
            />
          </label>
        ))}

        <button onClick={onSubmitData} className="btn btn-sm btn-primary ">
          {buttonName}
        </button>
      </form>
      <div className="w-full text-right">
        <Link
          to={"/forgot-password"}
          className="text-xs text-red-700 hover:underline"
        >
          Forgot your Password?
        </Link>
      </div>
    </div>
  );
}

export default InputSection;
