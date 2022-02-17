import { useContext, useEffect, useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./auth/pages/Auth";
import Layout from "./shared/Layout/Layout";
import PublicPage from "./shared/pages/PublicPage";
import NotFoundPage from "./shared/pages/NotFoundPage";
import RequireAuth from "./shared/wapper/RequireAuth";
import ProtectedPage from "./shared/pages/ProtectedPage";

import { UserContext } from "./shared/context/user-context";

function App() {
  const [userContext, setUserContext] = useContext(UserContext);
  const verifyUser = useCallback(() => {
    setUserContext((prev) => ({ ...prev, isLoading: true, init: false }));
    fetch(process.env.REACT_APP_API_ENDPOINT + "api/users/refreshtoken", {
      method: "POST",
      credentials: "include",
      header: { "Content-Type": "application/json" },
    })
      .then(async (response) => {
        if (response.ok) {
          const data = await response.json();
          setUserContext((prev) => ({ ...prev, token: data.token }));
        } else {
          setUserContext((prev) => ({ ...prev, token: null }));
        }
        setUserContext((prev) => ({ ...prev, isLoading: false }));

        setTimeout(verifyUser, 5 * 30 * 1000); //call refreshtoken every 5 minutes to renew token
      })
      .catch((err) => {
        setUserContext((prev) => ({ ...prev, isLoading: false }));
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

  // if (userContext.token === null) {
  //   routes = (
  //     <Routes>
  //       <Route path="/" element={<AllPosts />} />
  //       {/* <Route path=":uid/*" element={<UserPosts />} /> */}
  //       <Route path=":uid/:pid" element={<PostDetail />} />
  //       <Route path="authenticate" element={<Auth />} />
  //       <Route path="*" render={() => <Navigate to="/" />} />
  //     </Routes>
  //   );
  // } else if (userContext.token) {
  //   routes = (
  //     <Routes>
  //       <Route path="/" element={<AllPosts />} />
  //       <Route path=":uid/*" element={<UserPosts />} />
  //       <Route path=":uid/:pid" element={<PostDetail />} />
  //       <Route path="mypage/*" element={<MyPage />} />
  //       <Route path="mypage/new" element={<NewPost />} />
  //       <Route path="mypage/:pid" element={<EditPost />} />
  //       <Route path="*" render={() => <Navigate to="/" />} />
  //     </Routes>
  //   );
  // } else {
  //   routes = <p className="p-3 text-gray-500 dark:gray-100">Loading...</p>;
  // }
  return (
    <Layout>
      <Routes>
        <Route path="/*" element={<PublicPage />} />
        {/* {userContext.token === null && !userContext.isLoading && ( */}
        <Route path="authenticate" element={<Auth />} />
        {/* )} */}
        <Route path="*" element={<NotFoundPage />} />
        <Route
          path="mypage/*"
          element={
            <RequireAuth>
              <ProtectedPage />
            </RequireAuth>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
