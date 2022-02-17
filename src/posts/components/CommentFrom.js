import React from "react";

const CommentFrom = () => {
  return (
    <form
      className="mt-5 p-5 rounded-lg bg-gray-100 dark:bg-gray-700 dark:border-gray-600"
      action="/add-comments"
      method="post"
    >
      <div class="mb-6">
        <label
          for="comment"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Comment
        </label>
        <textarea
          id="comment"
          name="comment"
          rows="4"
          class="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        ></textarea>
      </div>
      <input type="hidden" value="<%= article._id %>" name="articleId" />

      <button
        type="submit"
        class="text-white bg-emerald-400 hover:bg-emerald-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-400 dark:hover:bg-emerald-500 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
};

export default CommentFrom;
