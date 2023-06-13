import { FaMoon, FaSun } from "react-icons/fa";

const ThemeSwitcher = ({ toggleTheme, isDarkMode }) => {
  return (
    <>
      <button
        onClick={toggleTheme}
        className={`${
          isDarkMode ? "bg-white text-black" : "bg-dark text-white"
        } flex px-6 rounded flex-nowrap border-none focus:outline-0 outline-none  py-4 text-xl`}
      >
        {" "}
        {isDarkMode ? (
          <span>
            <FaSun />
          </span>
        ) : (
          <span>
            <FaMoon />
          </span>
        )}
      </button>
    </>
  );
};

export default ThemeSwitcher;
