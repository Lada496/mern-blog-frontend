import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../../shared/UIElements/Button";
import ErrorMessage from "../../shared/UIElements/ErrorMessage";
import LoadingButtonEl from "../../shared/UIElements/LoadingButtonEl";
import { UserContext } from "../../shared/context/user-context";

const PostForm = ({ isEditMode = false, currentPost = {} }) => {
  const navigate = useNavigate();
  const [userContext, setUserContext] = useContext(UserContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const defaultValues = {
    title: currentPost.title,
    body: currentPost.body,
    image: currentPost.image,
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onBlur", //"onChange",
  });
  const onSubmit = (data, e) => {
    setIsSubmitting(true);
    setError("");

    const url = isEditMode
      ? `${process.env.REACT_APP_API_ENDPOINT}api/posts/${currentPost.id}`
      : `${process.env.REACT_APP_API_ENDPOINT}api/posts`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
      body: JSON.stringify({
        title: data.title,
        body: data.body,
        date: isEditMode ? currentPost.date : new Date(),
        image: data.image,
      }),
    })
      .then(async (response) => {
        setIsSubmitting(false);
        if (!response.ok) {
          throw Error("Create new post falied");
        }

        setUserContext((prev) => ({ ...prev, refetch: true }));
        navigate("/mypage");
      })
      .catch((err) => {
        setIsSubmitting(false);
        setError(err);
      })
      .finally(e.target.reset());
    // }
  };
  let buttonDisaled =
    errors.title || errors.body || error.image || isSubmitting;

  return (
    <div className="m-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <ErrorMessage
            text={isEditMode ? "Failed to update" : "Failed to Create new post"}
          />
        )}
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Title
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            defaultValue={isEditMode ? defaultValues.title : ""}
            {...register("title", { required: true })}
          />
          {errors.title && <ErrorMessage text="This is required" />}
        </div>
        <div className="mb-6">
          <label
            htmlFor="image"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Image URL
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            defaultValue={isEditMode ? defaultValues.image : ""}
            {...register("image", { required: true })}
          />
          {errors.image && <ErrorMessage text="This is required" />}
        </div>

        <div className="mb-6">
          <label
            htmlFor="body"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Article Body
          </label>
          <textarea
            rows="10"
            className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            defaultValue={isEditMode ? defaultValues.body : ""}
            {...register("body", { required: true, minLength: 5 })}
          ></textarea>
          {errors.body && (
            <ErrorMessage text="Body should be at least 5 words" />
          )}
        </div>
        <Button disabled={buttonDisaled}>
          {isSubmitting ? <LoadingButtonEl /> : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default PostForm;
