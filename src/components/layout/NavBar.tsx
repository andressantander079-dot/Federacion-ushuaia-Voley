'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { name: 'Torneos', href: '/torneos' },
  { name: 'Fixture', href: '/fixture' },
  { name: 'En Vivo', href: '/en-vivo', special: true },
];

export default function NavBar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => pathname === path || (path !== '/' && pathname?.startsWith(`${path}/`));

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
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                // Base classes
                let classes = "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ";

                if (link.special) {
                    classes += "focus:ring-red-500 ";
                    if (active) {
                        classes += "border-red-500 text-red-700";
                    } else {
                        classes += "border-transparent text-red-600 hover:border-red-700 hover:text-red-800 animate-pulse motion-reduce:animate-none";
                    }
                } else {
                    classes += "focus:ring-blue-500 ";
                    if (active) {
                        classes += "border-blue-500 text-gray-900";
                    } else {
                        classes += "border-transparent text-gray-500 hover:border-blue-500 hover:text-gray-700";
                    }
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={classes}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="hidden md:flex md:items-center">
             {/* Placeholder for desktop actions if any */}
          </div>

          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              aria-label="Abrir menú principal"
            >
              <span className="sr-only">Abrir menú principal</span>
              {isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`sm:hidden ${isOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            let classes = "block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors ";

            if (link.special) {
                if (active) {
                    classes += "bg-red-50 border-red-500 text-red-700";
                } else {
                    classes += "border-transparent text-red-600 hover:bg-red-50 hover:border-red-300 hover:text-red-800";
                }
            } else {
                if (active) {
                    classes += "bg-blue-50 border-blue-500 text-blue-700";
                } else {
                    classes += "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700";
                }
            }

            return (
                <Link
                    key={link.href}
                    href={link.href}
                    className={classes}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => setIsOpen(false)}
                >
                    {link.name}
                </Link>
            )
          })}
        </div>
      </div>
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
