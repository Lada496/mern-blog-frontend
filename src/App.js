import { useContext } from "react";
import { Route, Redirect, Routes } from "react-router-dom";
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
  const [userCtx, setUserCtx] = useContext(UserContext);
  let routes;

  if (userCtx.token === null) {
    routes = (
      <Routes>
        <Route path="/" element={<AllPosts />} />
        <Route path=":uid/*" element={<UserPosts />} />
        <Route path=":uid/:pid" element={<PostDetail />} />
        <Route path="authenticate" element={<Auth />} />
      </Routes>
    );
  } else if (userCtx.token) {
    routes = (
      <Routes>
        <Route path="/" element={<AllPosts />} />
        <Route path=":uid/*" element={<UserPosts />} />
        <Route path="mypage/*" element={<MyPage />} />
        <Route path="mypage/new" element={<NewPost />} />
        <Route path="mypage/:pid" element={<EditPost />} />
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
