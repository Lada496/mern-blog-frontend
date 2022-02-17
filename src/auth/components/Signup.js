import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../../shared/UIElements/Button";
import ErrorMessage from "../../shared/UIElements/ErrorMessage";
import { useHttp } from "../../shared/hooks/use-http";
import { UserContext } from "../../shared/context/user-context";
import LoadingButtonEl from "../../shared/UIElements/LoadingButtonEl";

const Signup = ({ setIsLogin }) => {
  const [passwordInput, setPasswordInput] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  // const { isLoading, error, sendRequest, clearError } = useHttp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userContext, setUserContext] = useContext(UserContext);
  const [error, setError] = useState("");
  const goToLoginHandler = () => {
    setIsLogin(true);
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    mode: "onBlur", // "onChange"
  });
  useEffect(() => {
    const subscription = watch((value) => setPasswordInput(value.password));
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (data, e) => {
    setIsSubmitting(true);
    setError("");
    fetch(process.env.REACT_APP_API_ENDPOINT + "api/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        username: data.email,
        password: data.password,
      }),
      credentials: "include",
    })
      .then(async (response) => {
        setIsSubmitting(false);

        if (!response.ok) {
          if (response.status === 400) {
            setError("Please fill all the missing fields");
          } else if (response.status === 401) {
            setError("Invalid email and/or password");
          } else if (response.status === 500) {
            const data = await response.json();
            if (data.message) {
              setError(
                data.message || "Something went wrong! Please try again"
              );
            } else {
              setError("Something went wrong! Please try again");
            }
          } else {
            setError("Something went wrong! Please try again");
          }
        } else {
          const data = await response.json();
          setUserContext((prev) => ({ ...prev, token: data.token }));
          let from = location.state?.from?.pathname || "/mypage";
          navigate(from, { replace: true });
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
          Sign Up
        </h3>
        {error && <ErrorMessage text="Failed to sign up" />}
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your name
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="name"
            {...register("name", {
              required: true,
            })}
          />
          {errors.name && <ErrorMessage text="This is required" />}
        </div>
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
            {...register("email", {
              required: true,
              pattern:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
          {errors.email && <ErrorMessage text="Please enter a valid email" />}
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
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password && (
            <ErrorMessage text="Password should be at least 6 words" />
          )}
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Confirm password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            {...register("confirmPassword", {
              required: true,
              validate: (value) => value === passwordInput,
            })}
          />
        </div>
        {errors.confirmPassword && (
          <ErrorMessage text="Passwords do not match" />
        )}
        <Button
          isWidthFull={true}
          disabled={
            errors.name ||
            errors.password ||
            errors.confirmPassword ||
            errors.email ||
            isSubmitting
          }
        >
          {isSubmitting ? <LoadingButtonEl /> : "Sign Up"}
        </Button>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
          Not registered?{" "}
          <span
            onClick={goToLoginHandler}
            className="text-blue-700 hover:underline dark:text-blue-500"
          >
            Create account
          </span>
        </div>
      </form>
    </div>
  );
};

export default Signup;
