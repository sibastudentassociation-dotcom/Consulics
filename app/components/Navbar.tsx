'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-primary-900 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 text-white">
            <Image src="/logo/1.png" alt="Consulics logo" width={40} height={40} />
            <span className="text-2xl font-bold tracking-tight">
              <span className="text-white">Consu</span>
              <span className="text-white">lics</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink href="/">Home</NavLink>
            <NavDropdown href="/services/tax" title="Tax Services">
              <NavDropdownItem href="/services/tax">Individual Tax Filing</NavDropdownItem>
              <NavDropdownItem href="/services/tax">Small Business Taxes</NavDropdownItem>
              <NavDropdownItem href="/services/tax">Self-Employed Taxes</NavDropdownItem>
              <NavDropdownItem href="/services/tax">Additional Services</NavDropdownItem>
            </NavDropdown>

            <NavDropdown href="/services/trucking" title="Trucking Services">
              <NavDropdownItem href="/services/trucking">Company Setup</NavDropdownItem>
              <NavDropdownItem href="/services/trucking">IFTA Services</NavDropdownItem>
              <NavDropdownItem href="/services/trucking">IRP Services</NavDropdownItem>
              <NavDropdownItem href="/services/trucking">Compliance</NavDropdownItem>
            </NavDropdown>

            <NavLink href="/industries">Industries</NavLink>
            <NavLink href="/pricing">Pricing</NavLink>
            <NavLink href="/resources">Resources</NavLink>
            <NavLink href="/about">About</NavLink>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
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
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <NavLink href="/" onClick={closeMenu}>Home</NavLink>
            <NavLink href="/services/tax" onClick={closeMenu}>Tax Services</NavLink>
            <NavLink href="/services/trucking" onClick={closeMenu}>Trucking Services</NavLink>
            <NavLink href="/industries" onClick={closeMenu}>Industries</NavLink>
            <NavLink href="/pricing" onClick={closeMenu}>Pricing</NavLink>
            <NavLink href="/resources" onClick={closeMenu}>Resources</NavLink>
            <NavLink href="/about" onClick={closeMenu}>About</NavLink>
            <div className="pt-4 space-y-2">
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
