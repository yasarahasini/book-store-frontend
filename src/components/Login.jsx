import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [message, setMessage] = useState("");
  const { loginUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Form submission handler
  const onSubmit = async (data) => {
    console.log("Login Data", data);
    try {
      await loginUser(data.email, data.password);
      alert("Login successful!");
      navigate("/"); // Redirect to homepage after successful login
    } catch (error) {
      setMessage("Please provide a valid email and password");
      console.error(error);
    }
  };

  // ✅ FIXED: Google Sign-In must be async
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      alert("Google Sign in failed!");
      console.error(error);
    }
  };

  return (
    <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
      <div className='w-full max-w-sm px-8 pt-6 pb-8 mx-auto mb-4 bg-white rounded shadow-md'>
        <h2 className='mb-4 text-xl font-semibold'>Please Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <label htmlFor="email" className='block mb-2 text-sm font-bold text-gray-700'>Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              id="email"
              placeholder='Email Address'
              className='w-full px-3 py-2 leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow'
            />
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>

          <div className='mb-4'>
            <label htmlFor="password" className='block mb-2 text-sm font-bold text-gray-700'>Password</label>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              id="password"
              placeholder='Password'
              className='w-full px-3 py-2 leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow'
            />
            {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
          </div>

          {message && <p className='mb-3 text-xs italic text-red-500'>{message}</p>}

          <div>
            <button type="submit" className='px-8 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none'>
              Login
            </button>
          </div>
        </form>

        <p className='mt-4 text-sm font-medium'>
          Haven't an account? Please <Link to="/register" className='text-blue-500 hover:text-blue-700'>Register</Link>
        </p>

        {/* Google sign-in */}
        <div className='mt-4'>
          <button
            onClick={handleGoogleSignIn}
            className='flex items-center justify-center w-full gap-2 px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none'
          >
            <FaGoogle />
            Sign in with Google
          </button>
        </div>

        <p className='mt-5 text-xs text-center text-gray-500'>©2025 Book Store. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Login;
