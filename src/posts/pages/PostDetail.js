import { useParams } from "react-router-dom";
import { useCallback, useState, useEffect } from "react/cjs/react.development";
import ErrorMessage from "../../shared/UIElements/ErrorMessage";
import Comments from "../components/Comments";
import LikesForm from "../components/LikesForm";

const PostDetail = () => {
  const params = useParams();
  const pid = params.pid;
  const [post, setPost] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  console.log(params.pid);
  const fetchPostById = useCallback(() => {
    fetch(process.env.REACT_APP_API_ENDPOINT + `api/posts/${pid}`)
      .then(async (response) => {
        if (!response.ok) {
          throw Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log(data);
        setPost(data.post);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);
  useEffect(() => {
    // console.log(post.title);
    // console.log(post.title);
    if (!post) {
      fetchPostById();
    }
    if (post) {
      console.log(post);
    }
  }, [fetchPostById, post]);
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <ErrorMessage text={error} />}
      {post && (
        <div className="p-5 py-5 lg:px-48 md:px-28">
          <h1 className="mb-2 text-2xl font-bold capitalize tracking-tight text-gray-900 dark:text-white">
            {post.title}
          </h1>
          {/* <div className="flex gap-4">
            <LikesForm likes={post.likes} />
          </div> */}

          <div className="mx-auto w-full lg:w-8/12">
            <img
              className="w-full object-cover rounded"
              src={post.image}
              alt={post.title}
            />
          </div>

          <p className="mt-2 mb-2 p-6 text-slate-500 dark:text-slate-400">
            {post.body}
          </p>
          {/* <Comments comments={post.comments} /> */}
          <div class="flex gap-2 mt-5">
            <a
              href="/edit-article/<%= article.id%>?edit=true"
              class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-emerald-400 rounded-lg hover:bg-emerald-500 focus:ring-4 focus:ring-blue-300 dark:bg-emerald-400 dark:hover:bg-emerald-500 dark:focus:ring-blue-800"
            >
              Edit
              <svg
                class="ml-2 -mr-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                ></path>
              </svg>
            </a>

            <form action="/delete-article" method="POST">
              <input
                type="hidden"
                name="articleId"
                value="<%= article._id %>"
              />
              <a
                class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-400 rounded-lg hover:bg-red-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                href="#"
                onclick="this.closest('form').submit();return false;"
              >
                Delete
                <svg
                  class="ml-2 -mr-1 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
              </a>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PostDetail;
