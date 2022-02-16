import { useParams } from "react-router-dom";

const UserPosts = () => {
  const params = useParams();
  console.log(params);

  return <div>UserPosts</div>;
};

export default UserPosts;
