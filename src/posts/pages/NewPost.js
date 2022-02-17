import PageHeading from "../../shared/UIElements/PageHeading";
import PostForm from "../components/PostForm";

const NewPost = () => {
  return (
    <div className="mx-10 my-5">
      <PageHeading>Create New Post</PageHeading>
      <PostForm />
    </div>
  );
};

export default NewPost;
