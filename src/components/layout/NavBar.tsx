'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || (path !== '/' && pathname?.startsWith(`${path}/`));
  };

  const getLinkClasses = (path: string, special: boolean = false) => {
    const baseClasses = "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";

    if (special) {
      // Special "En Vivo" style
      return `${baseClasses} focus:ring-red-500 border-transparent text-red-600 hover:border-red-700 hover:text-red-800 animate-pulse motion-reduce:animate-none`;
    }

    const activeClasses = "border-blue-500 text-gray-900";
    const inactiveClasses = "border-transparent text-gray-500 hover:border-blue-500 hover:text-gray-700 focus:ring-blue-500";

    return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`;
  };

  const getMobileLinkClasses = (path: string, special: boolean = false) => {
    const baseClasses = "block pl-3 pr-4 py-2 border-l-4 text-base font-medium focus:outline-none";

    if (special) {
       return `${baseClasses} border-transparent text-red-600 hover:bg-red-50 hover:border-red-700 animate-pulse motion-reduce:animate-none`;
    }

    const activeClasses = "bg-blue-50 border-blue-500 text-blue-700";
    const inactiveClasses = "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700";

    return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`;
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
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
                className={getLinkClasses('/torneos')}
                aria-current={isActive('/torneos') ? 'page' : undefined}
              >
                Torneos
              </Link>
              <Link
                href="/fixture"
                className={getLinkClasses('/fixture')}
                aria-current={isActive('/fixture') ? 'page' : undefined}
              >
                Fixture
              </Link>
              <Link
                href="/en-vivo"
                className={getLinkClasses('/en-vivo', true)}
              >
                En Vivo
              </Link>
            </div>
          </div>

          <div className="flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              aria-label="Open main menu"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed: Menu (Hamburger) */}
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                /* Icon when menu is open: X (Close) */
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      {isOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/torneos"
              className={getMobileLinkClasses('/torneos')}
              aria-current={isActive('/torneos') ? 'page' : undefined}
              onClick={() => setIsOpen(false)}
            >
              Torneos
            </Link>
            <Link
              href="/fixture"
              className={getMobileLinkClasses('/fixture')}
              aria-current={isActive('/fixture') ? 'page' : undefined}
              onClick={() => setIsOpen(false)}
            >
              Fixture
            </Link>
            <Link
              href="/en-vivo"
              className={getMobileLinkClasses('/en-vivo', true)}
              onClick={() => setIsOpen(false)}
            >
              En Vivo
            </Link>
          </div>
          <div className="pt-4 pb-4 border-t border-gray-200">
             <div className="flex items-center px-4">
                <Link
                    href="/acceso-clubes"
                    className="text-base font-medium text-gray-500 hover:text-gray-800"
                    onClick={() => setIsOpen(false)}
                >
                    Acceso Clubes
                </Link>
             </div>
          </div>
        </div>
      )}
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
