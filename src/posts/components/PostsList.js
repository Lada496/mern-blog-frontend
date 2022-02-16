import PostItem from "./PostItem";

const PostsList = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </>
  );
};

export default PostsList;
