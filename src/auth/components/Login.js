import { useForm } from "react-hook-form";
import Button from "../../shared/UIElements/Button";

const Login = ({ setIsLogin }) => {
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
  return (
    <div className="p-4 m-auto mt-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
      <form className="space-y-6" action="#">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
          Login
        </h3>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your email
          </label>
          <input
            // type="email"
            // name="email"
            // id="email"
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
            // name="password"
            // id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="p-1 text-red-400 text-sm">This is required</p>
          )}
        </div>
        <Button isWidthFull={true}>Login</Button>
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
