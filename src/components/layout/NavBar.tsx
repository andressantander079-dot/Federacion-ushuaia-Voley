'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// In a real project, you would import icons from 'lucide-react'
// import { Menu, X } from 'lucide-react';

export default function NavBar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const getLinkClass = (path: string) => {
    const baseClass = "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";
    const activeClass = "border-blue-500 text-gray-900 focus:ring-blue-500";
    const inactiveClass = "border-transparent text-gray-500 hover:border-blue-500 hover:text-gray-700 focus:ring-blue-500";

    return `${baseClass} ${isActive(path) ? activeClass : inactiveClass}`;
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Skip to main content for accessibility */}
      <Link
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-white text-blue-600 font-medium rounded-md shadow-lg ring-2 ring-blue-500"
      >
        Saltar al contenido principal
      </Link>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-blue-600">
                Torneo Favale
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/torneos"
                className={getLinkClass('/torneos')}
                aria-current={isActive('/torneos') ? 'page' : undefined}
              >
                Torneos
              </Link>
              <Link
                href="/fixture"
                className={getLinkClass('/fixture')}
                aria-current={isActive('/fixture') ? 'page' : undefined}
              >
                Fixture
              </Link>
              <Link
                href="/en-vivo"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 animate-pulse motion-reduce:animate-none text-red-600 hover:border-red-700 hover:text-red-800 ${
                  isActive('/en-vivo') ? 'border-red-600' : 'border-transparent'
                }`}
                aria-current={isActive('/en-vivo') ? 'page' : undefined}
              >
                En Vivo
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {/* Login for Clubs - Hidden/Discrete as requested */}
            <div className="hidden md:flex md:flex-shrink-0 md:items-center">
               {/* This is a placeholder for user actions */}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu placeholder - would require state to toggle */}

      {/* Footer-like discrete login link (or placed here as requested) */}
    </nav>
  );
}

// Since the prompt asks for the discrete link, I will create a simple Footer component as well to place it there,
// or I can assume the user will put it in their layout.
// I'll stick to the NavBar request but also create a small Footer component block here for completeness in the file if possible,
// or just ensure the link exists.

export function Footer() {
    return (
      <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Torneo Favale. Todos los derechos reservados.
          </p>
          <div className="mt-2 text-center">
            <Link href="/acceso-clubes" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
              Acceso Clubes
            </Link>
          </div>
        </div>
      </footer>
    );
}
