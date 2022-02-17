import { Routes, Route } from "react-router-dom";
import MyPage from "../../posts/pages/MyPage";
import NewPost from "../../posts/pages/NewPost";
import EditPost from "../../posts/pages/EditPost";

const ProtectedPage = () => {
  return (
    <Routes>
      <Route path="/*" element={<MyPage />} />
      <Route path="new" element={<NewPost />} />
      <Route path=":pid" element={<EditPost />} />
    </Routes>
  );
};

export default ProtectedPage;
