import { Form,redirect, Link } from "react-router-dom";
import { FormRow } from "../components";
import { MainIcon } from "../assets/icons";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration successful");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  return (
    <div className="min-h-screen  flex items-center justify-center bg-gray-100">
      <div className="max-w-2xl p-7 border bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-center">
          <MainIcon className="w-12 h-12 mx-auto" />
          <h4 className="text-2xl font-bold mx-1 ">Register Page</h4>
        </div>
        <Form method="post" className="mt-6">
          <FormRow type="text" name="name" labelText="Name:" />
          <FormRow type="text" name="email" labelText="Email:" />
          <FormRow type="password" name="password" labelText="Password:" />

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 mt-6 rounded-lg"
          >
            Register
          </button>
          <p className="mt-4 text-center">
            Already a member?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Register;
