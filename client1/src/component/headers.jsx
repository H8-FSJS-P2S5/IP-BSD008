import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };
  return (
    <>
      <header className="p-4 dark:bg-gray-500 dark:text-gray-800">
        <div className="container flex justify-between h-16 mx-auto md:justify-center md:space-x-8">
          <ul className="items-stretch hidden space-x-3 md:flex">
            <Link to={"/all-data"}>
              <li className="flex">
                <a className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent">
                  All
                </a>
              </li>
            </Link>
            <Link to={"/data-indonesia"}>
              <li className="flex">
                <a className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent">
                  Indonesia
                </a>
              </li>
            </Link>
            <Link to={"/get-continents"}>
              <li className="flex">
                <a className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent dark:text-gray-800 dark:border-gray-800">
                  Asia
                </a>
              </li>
            </Link>
            <Link to={"/get-users"}>
              <li className="flex">
                <a className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent">
                  Users
                </a>
              </li>
            </Link>
          </ul>
          <button title="Button" type="button" className="p-4 md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 dark:text-gray-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
          <div className="items-center flex-shrink-0 hidden lg:flex">
            <button
              onClick={handleLogOut}
              className="px-8 py-3 font-semibold rounded bg-gray-700 text-gray-50"
            >
              Log Out
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
