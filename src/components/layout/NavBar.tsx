'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/torneos', label: 'Torneos' },
  { href: '/fixture', label: 'Fixture' },
  { href: '/en-vivo', label: 'En Vivo', special: true },
];

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

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
            {/* Desktop Menu */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`
                      inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors
                      ${link.special
                        ? 'text-red-600 hover:text-red-800 border-transparent hover:border-red-700 focus:ring-red-500 animate-pulse motion-reduce:animate-none'
                        : isActive
                          ? 'border-blue-500 text-gray-900 focus:ring-blue-500'
                          : 'border-transparent text-gray-500 hover:border-blue-500 hover:text-gray-700 focus:ring-blue-500'
                      }
                    `}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center">
             {/* Mobile menu button */}
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                type="button"
                className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {/* Icon when menu is closed */}
                {!isOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  /* Icon when menu is open */
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
            {/* Login for Clubs - Hidden/Discrete as requested */}
            <div className="hidden md:flex md:flex-shrink-0 md:items-center">
               {/* Placeholder */}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      {isOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1 border-t border-gray-200">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    block pl-3 pr-4 py-2 border-l-4 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors
                    ${link.special
                      ? 'text-red-600 border-transparent hover:bg-red-50 hover:border-red-700 focus:ring-red-500'
                      : isActive
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                    }
                  `}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
             <Link
                href="/acceso-clubes"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Acceso Clubes
              </Link>
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
