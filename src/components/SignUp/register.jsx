import React from "react";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { brainwave } from "@/assets";
import { useNavigate } from "react-router-dom";
import { SignUp } from "../../helper/helper";
import * as Yup from "yup";

const Register = () => {
  const validationSchema = Yup.object({
    organizationName: Yup.string().required("Organization Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    location: Yup.string().required("Location is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number"),
  });

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      organizationName: "",
      email: "",
      password: "",
      location: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const regpromise = SignUp(values);

        toast.promise(regpromise, {
          loading: "Creating..",
          success: <b>Registered Successfully..!</b>,
          error: <b>Could not register</b>,
        });

        await regpromise;
        navigate("/loginpage");
      } catch (error) {
        console.error("An error occurred during registration.");
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
                SolarOps Registration
              </h2>
            </div>
          </div>

          {/* Registration Form */}
          <div className="mt-8">
            <h4 className="text-white text-2xl font-semibold mb-2 text-center">
              Sign Up
            </h4>
            <p className="text-gray-200 mb-6 text-center">
              Create your account by entering your details below.
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
              <div className="mb-4">
                <label
                  htmlFor="location"
                  className="block text-gray-200 font-semibold mb-2"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  required
                  className="w-full py-2 px-3 bg-transparent border-2 border-gray-400 text-white rounded focus:outline-white focus:ring-2"
                  placeholder="Enter your location"
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
                  onBlur={formik.handleBlur} // Add onBlur to trigger validation on focus out
                  required
                  className="w-full py-2 px-3 bg-transparent border-2 border-gray-400 text-white rounded focus:outline-white focus:ring-2"
                  placeholder="Enter your password"
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500">{formik.errors.password}</div>
                ) : null}
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-yellow-50 text-[#101624] rounded-lg hover:bg-yellow-100 transition-all duration-300"
                >
                  <div className="font-extrabold">Register</div>
                </button>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-gray-200">
              Already have an account?{" "}
              <a href="/loginpage" className="text-blue-500">
                Log in here
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

export default Register;
