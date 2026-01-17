"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const pathname = usePathname();

  const getLinkClass = (path: string, isSpecial: boolean = false) => {
    const active = pathname === path || (path !== '/' && pathname?.startsWith(`${path}/`));

    const baseClasses = "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200";

    if (isSpecial) {
      // En Vivo special styling
      return `${baseClasses} ${
        active
          ? "border-red-600 text-red-700"
          : "border-transparent text-red-600 hover:border-red-700 hover:text-red-800"
      } focus:ring-red-500 animate-pulse motion-reduce:animate-none`;
    }

    return `${baseClasses} ${
      active
        ? "border-blue-500 text-gray-900"
        : "border-transparent text-gray-500 hover:border-blue-500 hover:text-gray-700 focus:ring-blue-500"
    }`;
  };

  const isCurrent = (path: string) => {
      return pathname === path || (path !== '/' && pathname?.startsWith(`${path}/`)) ? 'page' : undefined;
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md">
                Torneo Favale
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/torneos"
                className={getLinkClass('/torneos')}
                aria-current={isCurrent('/torneos')}
              >
                Torneos
              </Link>
              <Link
                href="/fixture"
                className={getLinkClass('/fixture')}
                aria-current={isCurrent('/fixture')}
              >
                Fixture
              </Link>
              <Link
                href="/en-vivo"
                className={getLinkClass('/en-vivo', true)}
                aria-current={isCurrent('/en-vivo')}
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

      {/* Mobile menu placeholder */}
    </nav>
  );
}

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
