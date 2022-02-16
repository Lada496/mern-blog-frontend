import { useParams } from "react-router-dom";

const PostDetail = () => {
  const params = useParams();
  console.log(params);
  return <div>PostDetail</div>;
};

export default PostDetail;
