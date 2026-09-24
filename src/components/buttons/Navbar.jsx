import MyButton from "./Button.jsx";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const MyNavButton = (props) => {
  const { size, buttonStyle, onClick, children, locationCome } = props;
  const location = useLocation();
  let classStyle =
    "origin-bottom rounded-t-4xl  border-3 hover:text-white transition-all duration-500 text-base px-6 py-1 hover:pt-1 sticky top-0 z-50 ";

  if (location.pathname === locationCome) {
    classStyle += " bg-blue-600 text-white border-blue-800 scale-115";
  } else {
    classStyle +=
      " bg-amber-100 border-gray-600 text-black hover:bg-gray-600 hover:text-white hover:border-gray-800 hover:scale-115 hover:origin-bottom";
  }

  return (
    <div className="flex justify-center items-center w-full sm:w-auto ">
      <button onClick={onClick} className={classStyle}>
        {children}
      </button>
    </div>
  );
};

const MyNav = (props) => {
  const { size, buttonStyle, onClick, children } = props;
  const navigate = useNavigate();

  return (
    <>
      <nav className="bg-orange-200 flex justify-around items-center flexdirection-row pt-4 bg-gray-100 border-b-2 border-gray-300 flex-wrap sticky top-0 z-50">
        <MyNavButton
          buttonStyle="navbar"
          locationCome="/profile"
          onClick={() => navigate("/profile")}
        >
          Profile
        </MyNavButton>
        <MyNavButton
          buttonStyle="navbar"
          locationCome="/projects"
          onClick={() => navigate("/projects")}
        >
          Projects
        </MyNavButton>
      </nav>
    </>
  );
};

export default MyNav;
