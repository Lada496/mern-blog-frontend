import PostItem from "./PostItem";

const PostsList = ({ posts }) => {
  return (
    <div className="mt-10">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostsList;
