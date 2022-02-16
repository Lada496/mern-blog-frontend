import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import Button from "../../shared/UIElements/Button";
import ErrorMessage from "../../shared/UIElements/ErrorMessage";
import LoadingButtonEl from "../../shared/UIElements/LoadingButtonEl";
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
        {error && <ErrorMessage text="Failed to login" />}
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
          {errors.email && <ErrorMessage text="This is required" />}
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
          {errors.password && <ErrorMessage text="This is required" />}
        </div>
        <Button
          isWidthFull={true}
          disabled={errors.password || errors.email || isSubmitting}
        >
          {isSubmitting ? <LoadingButtonEl /> : "Login"}
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
