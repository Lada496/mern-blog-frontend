import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import Button from "../../shared/UIElements/Button";
import { UserContext } from "../../shared/context/user-context";

const Login = ({ setIsLogin }) => {
  const [userContext, setUserContext] = useContext(UserContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onBlur", //"onChange",
  });
  const goToSignUpHandler = () => {
    setIsLogin(false);
  };
  const onSubmit = (data, e) => {
    setIsSubmitting(true);
    setError("");
    fetch(process.env.REACT_APP_API_ENDPOINT + "api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: data.email, password: data.password }),
      credentials: "include",
    })
      .then(async (response) => {
        setIsSubmitting(false);
        if (!response.ok) {
          if (response.status === 400) {
            setError("Missing Credentials");
          } else if (response.status === 401) {
            setError("Invalid email and/or password");
          } else {
            setError("Something went wrong! Please try again");
          }
        } else {
          const data = await response.json();
          setUserContext((prev) => ({ ...prev, token: data.token }));
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
        setError("Something went wrong! Please try again"); //generic error message
      })
      .finally(e.target.reset());
  };
  return (
    <div className="p-4 m-auto mt-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
          Login
        </h3>
        {error && <p className="p-1 text-red-400 text-sm">Failed to login</p>}
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your email
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="name@company.com"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="p-1 text-red-400 text-sm">This is required</p>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="p-1 text-red-400 text-sm">This is required</p>
          )}
        </div>
        <Button
          isWidthFull={true}
          disabled={errors.password || errors.email || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg
                role="status"
                className="inline mr-3 w-4 h-4 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              <span>Processing...</span>
            </>
          ) : (
            "Login"
          )}
        </Button>
        <div
          className="text-sm font-medium text-gray-500 dark:text-gray-300"
          onClick={goToSignUpHandler}
        >
          Not registered?{" "}
          <span className="text-blue-700 hover:underline dark:text-blue-500">
            Create account
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
