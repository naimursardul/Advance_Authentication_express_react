import { MdLightMode } from "react-icons/md";
import { FaRegMoon } from "react-icons/fa6";
import { useEffect } from "react";

function ThemeController() {
  const toggleTheme = () => {
    if (localStorage.getItem("theme") === "light") {
      document
        .querySelector("#themeController")
        .setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      return;
    }

    if (localStorage.getItem("theme") === "dark") {
      document
        .querySelector("#themeController")
        .setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
      return;
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", "light");
    }
  }, []);
  return (
    <label className="swap swap-rotate ">
      {/* this hidden checkbox controls the state */}
      <input type="checkbox" />

      {/* sun icon */}
      <MdLightMode
        role="button"
        onClick={toggleTheme}
        className={`swap-${
          localStorage.getItem("theme") === "dark" ? "off" : "on"
        } h-6 w-6 fill-current`}
      />

      {/* moon icon */}
      <FaRegMoon
        role="button"
        onClick={toggleTheme}
        className={`swap-${
          localStorage.getItem("theme") === "light" ||
          !localStorage.getItem("theme")
            ? "off"
            : "on"
        } h-6 w-6 fill-current`}
      />
    </label>
  );
}

export default ThemeController;
