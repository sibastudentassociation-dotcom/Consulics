'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>();
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error || 'Login failed');
      }

      toast.success('Logged in successfully!');
      router.push('/portal');
    } catch (error: any) {
      setServerError(error.message);
      toast.error(error.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-700 to-primary-900 flex items-center justify-center py-12 px-4">
      <Toaster />

      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-center mb-2">Welcome Back</h1>
          <p className="text-center text-gray-600 mb-8">Sign in to your account</p>

          {serverError && <p className="text-red-600 text-sm mb-4">{serverError}</p>}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="john@example.com"
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <Link href="/forgot-password" className="text-primary-700 hover:text-primary-800 text-sm">
                  Forgot?
                </Link>
              </div>
              <input
                type="password"
                {...register('password', { required: 'Password is required' })}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="••••••••"
              />
              {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary-700 text-white py-3 rounded font-semibold hover:bg-primary-800 transition disabled:opacity-50"
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <button className="w-full border border-gray-300 rounded px-4 py-2 text-center hover:bg-gray-50 transition">
            Google
          </button>

          <p className="text-center text-gray-600 mt-6">
            Don't have an account?{' '}
            <Link href="/register" className="text-primary-700 font-semibold hover:text-primary-800">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
