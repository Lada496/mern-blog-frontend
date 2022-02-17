import { Routes, Route } from "react-router-dom";
import AllPosts from "../../posts/pages/AllPosts";
import PostDetail from "../../posts/pages/PostDetail";

const PublicPage = () => {
  return (
    <Routes>
      <Route path="/" element={<AllPosts />} />
      <Route path=":uid/:pid" element={<PostDetail />} />
    </Routes>
  );
};

export default PublicPage;
