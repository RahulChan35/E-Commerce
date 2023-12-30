import { Form, redirect, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const registerAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await axios.post("/api/v1/auth/register", data);
    toast.success("User Registered Successfully!!!");
    return redirect("/login");
  } catch (error) {
    toast.error(error.response.data.msg);
  }
  return null;
};

const Register = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="h-16 w-full bg-cyan-600 text-center text-white pt-5">
        <h1>Registration Form</h1>
      </div>
      <Form
        action="/register"
        method="POST"
        className="w-4/5 sm:w-1/2 md:w-5/12 lg:w-4/12 xl:w-3/12 2xl:w-2/12 flex flex-col place-content-center mt-10"
      >
        <div className="h-52 flex place-content-between">
          <div className="h-full flex flex-col place-content-between text-sm">
            <label htmlFor="name">Username </label>
            <label htmlFor="email">Email </label>
            <label htmlFor="password">Password </label>
          </div>
          <div className="h-42 flex flex-col place-content-between">
            <input
              type="text"
              id="name"
              name="name"
              className="border-solid border-b border-black pl-2 focus:outline-none focus:bg-white"
            />
            <input
              type="email"
              id="email"
              name="email"
              className="border-solid border-b border-black pl-2 focus:outline-none focus:bg-white"
            />
            <input
              type="password"
              id="password"
              name="password"
              className="border-solid border-b border-black pl-2 focus:outline-none focus:bg-white"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-16 bg-cyan-600 rounded text-white p-2 hover:cursor-pointer"
        >
          REGISTER
        </button>
      </Form>
      <div className="mt-8">
        <p>-OR-</p>
      </div>
      <div className="mt-8">
        Already a member?
        <Link to="/login">
          <button className="bg-green-400 rounded p-1 ml-2 hover:cursor-pointer">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Register;
