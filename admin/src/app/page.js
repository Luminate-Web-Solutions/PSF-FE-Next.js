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

      localStorage.setItem("adminToken", response.data.token);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md transform transition-all duration-300 hover:scale-[1.01]">
        {/* Logo Section with animation */}
        <div className="flex justify-center mb-8 animate-fade-in-down">
          <div className="relative w-32 h-32 transition-all duration-500 hover:scale-110">
            <Image
              src="/psf_logo 1.png"
              alt="PSF Logo"
              fill
              className="object-contain drop-shadow-lg"
              priority
            />
          </div>
        </div>

        {/* Login Card with subtle shadow and border glow */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-opacity-10 border-white hover:shadow-2xl transition-all duration-300 group">
          {/* Card Header with gradient */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-6 px-8">
            <h1 className="text-2xl font-bold text-white text-center tracking-tight">
              Admin Portal
            </h1>
            <p className="text-center text-blue-100 text-sm mt-1">
              Secure access to administration panel
            </p>
          </div>

          {/* Card Body */}
          <div className="p-8">
            {loginError && (
              <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded animate-fade-in">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm font-medium">{loginError}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    {...register("Email", { 
                      required: "Email is required", 
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Please enter a valid email"
                      } 
                    })}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${errors.Email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:outline-none focus:ring-2 focus:border-transparent transition`}
                  />
                </div>
                {errors.Email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errors.Email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    {...register("Password", { 
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
                      }
                    })}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${errors.Password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:outline-none focus:ring-2 focus:border-transparent transition`}
                  />
                </div>
                {errors.Password && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errors.Password.message}
                  </p>
                )}
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className={`w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 ${isLoading ? 'opacity-80 cursor-not-allowed' : 'hover:shadow-lg transform hover:-translate-y-0.5'}`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Authenticating...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      Sign In
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Card Footer */}
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
            <div className="flex items-center justify-center">
              <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <p className="text-xs text-gray-500 text-center">
                Secure admin portal. Unauthorized access prohibited.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center text-sm text-gray-600 animate-fade-in">
          <p>Having trouble? <a href="mailto:support@example.com" className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition">Contact support</a></p>
        </div>
      </div>
    </div>
  );
}