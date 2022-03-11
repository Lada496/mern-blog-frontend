import { Routes, Route } from "react-router-dom";
import AllPosts from "../../posts/pages/AllPosts";
import UserPosts from "../../posts/pages/UserPosts";
import PostDetail from "../../posts/pages/PostDetail";

const PublicPage = () => {
  return (
    <Routes>
      <Route path="/" element={<AllPosts />} />
      <Route path=":uid" element={<UserPosts />} />
      <Route path=":uid/:pid" element={<PostDetail />} />
    </Routes>
  );
};

export default PublicPage;
