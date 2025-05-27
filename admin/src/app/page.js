"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function App() {
  const router = useRouter();
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setLoginError("");
    
    try {
      const response = await axios.post(
        "http://localhost:4000/api/admin/login",
        {
          emailId: data.Email,
          password: data.Password
        }
      );

      // Store the token in localStorage
      localStorage.setItem("adminToken", response.data.token);
      
      // Redirect to user management page
      router.push("/admin");
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError(
        error.response?.data?.message || 
        "Login failed. Please check your credentials and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-10 mb-20">
        <div>
          <Image
            src="/psf_logo 1.png"
            alt="PSF Logo"
            width={200}
            height={200}
            className="pb-8"
          />
        </div>
        <div className="flex flex-col items-center justify-center h-80 w-80 bg-[#2e77ae] rounded">
          <h1 className="text-2xl text-white pb-5">Admin Login</h1>

          {loginError && (
            <p className="text-red-300 text-sm mb-2">{loginError}</p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <label className="text-white text-xl">Email</label>
            <input
              type="text"
              placeholder="Email"
              {...register("Email", { 
                required: "Email is required", 
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Please enter a valid email"
                } 
              })}
              className="mb-2 bg-[#e0eaf5] rounded-l rounded-r p-1"
            />
            {errors.Email && (
              <p className="text-red-300 text-sm mb-2">{errors.Email.message}</p>
            )}

            <label className="text-white text-xl">Password</label>
            <input
              type="password"
              placeholder="Password"
              {...register("Password", { 
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })}
              className="mb-2 bg-[#e0eaf5] rounded-l rounded-r p-1"
            />
            {errors.Password && (
              <p className="text-red-300 text-sm mb-2">{errors.Password.message}</p>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className={`bg-white text-[#2e77ae] p-1 hover:bg-[#0d2137] hover:text-white mt-4 rounded ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}