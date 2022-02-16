import { useContext, useEffect, useCallback } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import Auth from "./auth/pages/Auth";
import Navigation from "./shared/Navigation/Navigation";

import { UserContext } from "./shared/context/user-context";
import AllPosts from "./posts/pages/AllPosts";
import UserPosts from "./posts/pages/UserPosts";
import EditPost from "./posts/pages/EditPost";
import NewPost from "./posts/pages/NewPost";
import PostDetail from "./posts/pages/PostDetail";
import MyPage from "./posts/pages/MyPage";

function App() {
  const [userContext, setUserContext] = useContext(UserContext);

  const verifyUser = useCallback(() => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "api/users/refreshtoken", {
      method: "POST",
      credentials: "include",
      header: { "Content-Type": "application/json" },
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setUserContext((prev) => ({ ...prev, token: data.token }));
      } else {
        setUserContext((prev) => ({ ...prev, token: null }));
      }

      setTimeout(verifyUser, 5 * 30 * 1000); //call refreshtoken every 5 minutes to renew token
    });
  }, [setUserContext]);

  useEffect(() => verifyUser(), [verifyUser]);

  const syncLogout = useCallback((event) => {
    if (event.key === "logout") {
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("storage", syncLogout);

    return () => {
      window.removeEventListener("storage", syncLogout);
    };
  }, [syncLogout]);

  let routes;

  if (userContext.token === null) {
    routes = (
      <Routes>
        <Route path="/" element={<AllPosts />} />
        <Route path=":uid/*" element={<UserPosts />} />
        <Route path=":uid/:pid" element={<PostDetail />} />
        <Route path="authenticate" element={<Auth />} />
        <Route path="*" render={() => <Navigate to="/" />} />
      </Routes>
    );
  } else if (userContext.token) {
    routes = (
      <Routes>
        <Route path="/" element={<AllPosts />} />
        <Route path=":uid/*" element={<UserPosts />} />
        <Route path="mypage/*" element={<MyPage />} />
        <Route path="mypage/new" element={<NewPost />} />
        <Route path="mypage/:pid" element={<EditPost />} />
        <Route path="*" render={() => <Navigate to="/" />} />
      </Routes>
    );
  } else {
    routes = <p className="p-3 text-gray-500 dark:gray-100">Loading...</p>;
  }
  return (
    <div className="bg-white min-h-screen dark:bg-gray-900">
      <Navigation />
      <main>{routes}</main>
    </div>
  );
}

export default App;
