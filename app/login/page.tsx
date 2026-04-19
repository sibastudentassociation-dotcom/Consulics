'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Image from 'next/image';
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

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData?.error || 'Login failed');
      }

      localStorage.setItem('auth_token', 'logged_in');
      toast.success('Logged in successfully!');
      window.location.href = '/portal';
    } catch (error: any) {
      setServerError(error.message);
      toast.error(error.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-white from-primary-700 to-primary-900 flex items-center justify-center px-4">
      <Toaster />

      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

          {/* Logo area — dark bg matches the logo naturally */}
          <div className="bg-[#040C33] flex items-center justify-center py-5 px-6">
            <Image
              src="/logo/1.png"
              alt="Consulics Logo"
              width={200}
              height={60}
              priority
              className="object-contain"
            />
          </div>

          {/* Form area */}
          <div className="px-6 py-5">
            <p className="text-center text-gray-500 text-sm mb-4">Sign in to your account</p>

            {serverError && (
              <p className="text-red-600 text-xs mb-3 text-center">{serverError}</p>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                  className="w-full border border-gray-300 text-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-0.5">{errors.email.message}</p>
                )}
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-medium text-gray-700">Password</label>
                  <Link href="/forgot-password" className="text-primary-700 hover:text-primary-800 text-xs">
                    Forgot?
                  </Link>
                </div>
                <input
                  type="password"
                  {...register('password', { required: 'Password is required' })}
                  className="w-full border text-gray-700 border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-0.5">{errors.password.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-700 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-800 transition disabled:opacity-50 mt-1"
              >
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-gray-400">Or continue with</span>
              </div>
            </div>

            {/* Google */}
            <button className="w-full border border-gray-300 text-gray-700 rounded-lg px-4 py-2 text-sm text-center hover:bg-gray-50 transition flex items-center justify-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>

            <p className="text-center text-gray-500 text-xs mt-4">
              Don't have an account?{' '}
              <Link href="/register" className="text-primary-700 font-semibold hover:text-primary-800">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}