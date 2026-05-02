'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiMenu, FiX, FiUser } from 'react-icons/fi';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const router = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/api/auth/session');
        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(true);
          setUserName(data.user?.name?.split(' ')[0] || 'User');
        } else {
          setIsLoggedIn(false);
        }
      } catch {
        setIsLoggedIn(false);
      }
    };
    checkSession();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/session', { method: 'DELETE' });
    localStorage.removeItem('auth_token');
    setIsLoggedIn(false);
    router.push('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-primary-900 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 text-white">
            <Image src="/logo/favicon_no_bg.png" alt="Consulics logo" width={40} height={40} />
            <span className="text-2xl font-bold tracking-tight">
              <span className="text-white">Consu</span>
              <span className="text-white">lics</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/services/tax">Tax Services</NavLink>
            <NavLink href="/services/trucking">Trucking Services</NavLink>
            <NavLink href="/form-2290">Form 2290</NavLink>
            <NavLink href="/industries">Industries</NavLink>
            <NavLink href="/contact">Contact Us</NavLink>
            <NavLink href="/about">About</NavLink>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link
                  href="/portal"
                  className="flex items-center gap-2 px-4 py-2 text-white border border-white/30 rounded hover:bg-white/10"
                >
                  <FiUser size={16} /> {userName}
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-white border border-white/30 rounded hover:bg-white/10"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-primary-700 text-white rounded hover:bg-primary-800"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={toggleMenu}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <NavLink href="/" onClick={closeMenu}>Home</NavLink>
            <NavLink href="/services/tax" onClick={closeMenu}>Tax Services</NavLink>
            <NavLink href="/services/trucking" onClick={closeMenu}>Trucking Services</NavLink>
            <NavLink href="/form-2290" onClick={closeMenu}>Form 2290</NavLink>
            <NavLink href="/industries" onClick={closeMenu}>Industries</NavLink>
            <NavLink href="/pricing" onClick={closeMenu}>Pricing</NavLink>
            <NavLink href="/about" onClick={closeMenu}>About</NavLink>
            <div className="pt-4 space-y-2">
              {isLoggedIn ? (
                <>
                  <Link
                    href="/portal"
                    onClick={closeMenu}
                    className="block px-4 py-2 text-white border border-white/30 rounded text-center hover:bg-white/10"
                  >
                    My Portal
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 bg-red-600 text-white rounded text-center"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="block px-4 py-2 text-white border border-white/30 rounded text-center hover:bg-white/10"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={closeMenu}
                    className="block px-4 py-2 bg-primary-700 text-white rounded text-center"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function NavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block md:inline-block px-3 py-2 rounded text-white hover:bg-white/10 transition"
    >
      {children}
    </Link>
  );
}

function NavDropdown({ title, href, children }: { title: string; href?: string; children: React.ReactNode }) {
  return (
    <div className="relative group">
      {href ? (
        <Link href={href} className="px-3 py-2 rounded text-white hover:bg-white/10 transition flex items-center">
          {title}
        </Link>
      ) : (
        <button className="px-3 py-2 rounded text-white hover:bg-white/10 transition flex items-center">
          {title}
        </button>
      )}
      <div className="absolute left-0 mt-0 w-48 bg-white rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
        {children}
      </div>
    </div>
  );
}

function NavDropdownItem({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-4 py-2 text-slate-800 hover:bg-gray-100 transition first:rounded-t last:rounded-b"
    >
      {children}
    </Link>
  );
}