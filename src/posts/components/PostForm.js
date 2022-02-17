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
  // const defaultValues = isEditMode
  //   ? {
  //       title: currentPost.title,
  //       body: currentPost.body,
  //     }
  //   : {};
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onBlur", //"onChange",
    // defaultValues,
  });
  const onSubmit = (data, e) => {
    setIsSubmitting(true);
    setError("");
    // if (isEditMode) {
    //   console.log(data);
    // } else {
    const url = isEditMode
      ? `${process.env.REACT_APP_API_ENDPOINT}api/posts/${currentPost.id}`
      : `${process.env.REACT_APP_API_ENDPOINT}api/posts`;
    // const formData = new FormData();
    // formData.append("title", data.title);
    // formData.append("body", data.body);
    // formData.append("date", new Date());
    // formData.append("image", data.image);
    // formData.append("name", userContext.details.name);
    // formData.append("userId", userContext.details.userId);
    // console.log(formData);
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
        // name: userContext.details.name,
        // userId: userContext.details.userId,
      }),
    })
      .then(async (response) => {
        setIsSubmitting(false);
        if (!response.ok) {
          throw Error("Create new post falied");
        }
        const data = await response.json();
        console.log(data);
        // if(userContext.details.posts.length === 0){
        //   const newDetails = {
        //     ...userContext.details,
        //     posts:[]
        //   }
        // }

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
  let buttonDisaled = errors.title || errors.body || error.image;
  // if (isEditMode) {
  //   buttonDisaled = errors.title || errors.body;
  // } else {
  //   buttonDisaled = errors.title || errors.body || error.image;
  // }
  return (
    <div className="m-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        method="post"
        // encType="multipart/form-data"
      >
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
            // type="text"
            // id="title"
            // name="title"
            // defaultValue={isEditMode ? currentPost.title : ""}
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
        {/* {!isEditMode && (
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              htmlFor="image"
            >
              Upload file
            </label>
            <input
              className="block w-full text-sm text-gray-900 bg-gray-50 rounded border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              type="file"
              accept=".jpg,.jpeg,.png"
              {...register("image", { required: true })}
            />
            {errors.image && <ErrorMessage text="This is required" />}
          </div>
        )} */}
        <div className="mb-6">
          <label
            htmlFor="body"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Article Body
          </label>
          <textarea
            // id="body"
            // name="body"
            rows="10"
            // defaultValue={isEditMode ? currentPost.body : ""}
            className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            defaultValue={isEditMode ? defaultValues.body : ""}
            {...register("body", { required: true, minLength: 5 })}
          ></textarea>
          {errors.body && (
            <ErrorMessage text="Body should be at least 5 words" />
          )}
        </div>
        <Button disabled={buttonDisaled || isSubmitting}>
          {isSubmitting ? <LoadingButtonEl /> : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default PostForm;
