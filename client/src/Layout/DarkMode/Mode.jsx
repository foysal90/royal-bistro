import useDarkMode from "./DarkMode";
import "../../../src/app.css";
import { MdDarkMode } from "react-icons/md";
import { CiDark } from "react-icons/ci";
const Mode = () => {
  const [isDarkMode, setIsDarkMode] = useDarkMode();

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };
  return (
    <div className={isDarkMode ? "dark-mode" : ""}>
     
      <button className="mx-5" onClick={toggleDarkMode}>
        {isDarkMode ?  <CiDark />: <MdDarkMode />}
      </button>
      {/* Rest of your component */}
    </div>
  );
};

export default Mode;
