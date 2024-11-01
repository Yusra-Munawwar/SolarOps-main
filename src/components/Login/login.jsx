import React from "react";
import { useFormik } from "formik";
import toast, { Toaster } from 'react-hot-toast';
import { brainwave } from "@/assets";
import { useNavigate } from 'react-router-dom';
import { loginUser } from "../../helper/helper"; // Import your login helper

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      organizationName: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const loginPromise = loginUser(values);
        
        toast.promise(loginPromise, {
          loading: 'Logging in..',
          success: <b>Login Successful..!</b>,
          error: <b>Login failed</b>
        });
        
        await loginPromise;
        navigate('/'); 
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
  });

  return (
    <div className="relative h-screen flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-100"
        style={{
          backgroundImage: `url(https://cdn.britannica.com/94/192794-050-3F3F3DDD/panels-electricity-order-sunlight.jpg)`,
        }}
      ></div>

      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-white opacity-30"></div>

      {/* Form Content */}
      <div className="relative z-10 bg-black/70 backdrop-blur-3xl p-6 w-full max-w-lg border-t-4 border-yellow-400 rounded-lg shadow-lg">
        <div className="flex flex-col gap-4">
          {/* Logo Section */}
          <div className="flex items-center justify-center space-x-4 text-white">
            <img src={brainwave} className="h-10 w-10 inline-block" />
            <div className="text-white text-center">
              <h2 className="font-bold text-3xl uppercase text-white">
                SolarOps Login
              </h2>
            </div>
          </div>

          {/* Login Form */}
          <div className="mt-8">
            <h4 className="text-white text-2xl font-semibold mb-2 text-center">
              Welcome Back
            </h4>
            <p className="text-gray-200 mb-6 text-center">
              Please enter your details to log in.
            </p>

            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="organizationName"
                  className="block text-gray-200 font-semibold mb-2"
                >
                  Organization Name
                </label>
                <input
                  type="text"
                  id="organizationName"
                  name="organizationName"
                  value={formik.values.organizationName}
                  onChange={formik.handleChange}
                  required
                  className="w-full py-2 px-3 bg-transparent border-2 border-gray-400 text-white rounded focus:outline-white focus:ring-2"
                  placeholder="Enter your organization name"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-200 font-semibold mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  required
                  className="w-full py-2 px-3 bg-transparent border-2 border-gray-400 text-white rounded focus:outline-white focus:ring-2"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-gray-200 font-semibold mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  required
                  className="w-full py-2 px-3 bg-transparent border-2 border-gray-400 text-white rounded focus:outline-white focus:ring-2"
                  placeholder="Enter your password"
                />
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-yellow-50 text-[#101624] rounded-lg hover:bg-yellow-100 transition-all duration-300"
                >
                  <div className="font-extrabold">Log In</div>
                </button>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-gray-200">
              Don't have an account?{" "}
              <a href="/registerpage" className="text-blue-500">
                Register here
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Toaster Notifications */}
      <Toaster />
    </div>
  );
};

export default Login;
