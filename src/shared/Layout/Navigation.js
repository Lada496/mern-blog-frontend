import { useContext } from "react";
import { Link } from "react-router-dom";
import useTheme from "../hooks/use-theme";
import { UserContext } from "../context/user-context";

const Navigation = () => {
  const [theme, setTheme] = useTheme();
  const [userContext, setUserContext] = useContext(UserContext);
  const toggleThemeHandler = () => {
    setTheme(!theme);
  };
  const toggleMobileMenuHandler = () => {
    const mobileDiv = document.getElementById("mobile-menu");
    mobileDiv.classList.toggle("hidden");
  };

  const logoutHandler = () => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "api/users/logout", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    }).then(async (response) => {
      setUserContext((prev) => ({ ...prev, details: undefined, token: null }));
    });
  };

  return (
    <nav className="bg-gray-100 border-gray-100 px-2 sm:px-4 py-2.5 dark:bg-gray-800">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <svg
            className="w-7 h-7 fill-emerald-300 f"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"></path>
          </svg>
          <span className="self-center text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-blue-500">
            Your Diary
          </span>
        </Link>
        <div className="flex items-center md:order-2">
          <div className="w-36">
            <button
              onClick={toggleThemeHandler}
              id="theme-toggle"
              type="button"
              className="ml-auto block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
            >
              {!theme && (
                <svg
                  id="theme-toggle-dark-icon"
                  className=" w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
              )}
              {theme && (
                <svg
                  id="theme-toggle-light-icon"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              )}
            </button>
          </div>
          <button
            onClick={toggleMobileMenuHandler}
            data-collapse-toggle="mobile-menu"
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu"
            aria-expanded="false"
            id="nav-bar"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              className="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
          id="mobile-menu"
        >
          <ul className="flex flex-col md:items-center mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            {userContext.token && (
              <>
                <li>
                  <Link
                    to="/mypage"
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 rounded hover:bg-emerald-400 hover:text-white md:hover:bg-transparent md:border-0 md:hover:text-emerald-400 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-emerald-400 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    My Page
                  </Link>
                </li>
                <li>
                  <Link
                    to="/mypage/new"
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 rounded hover:bg-emerald-400 hover:text-white md:hover:bg-transparent md:border-0 md:hover:text-emerald-400 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-emerald-400 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Create New Post
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logoutHandler}
                    className="mt-2 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-emerald-300 to-blue-500 group-hover:from-emerald-300 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:ring-emerald-200 dark:focus:ring-emerald-800"
                  >
                    <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-100 dark:bg-gray-800 rounded-md group-hover:bg-opacity-0">
                      Logout
                    </span>
                  </button>
                </li>
              </>
            )}
            {userContext.token === null && (
              <li>
                <Link
                  to="/authenticate"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 rounded hover:bg-emerald-400 hover:text-white md:hover:bg-transparent md:border-0 md:hover:text-emerald-400 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-emerald-400 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
