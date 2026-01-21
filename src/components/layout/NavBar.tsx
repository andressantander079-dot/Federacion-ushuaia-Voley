'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// In a real project, you would import icons from 'lucide-react'
// import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Torneos', href: '/torneos' },
  { name: 'Fixture', href: '/fixture' },
  { name: 'En Vivo', href: '/en-vivo', special: true },
];

export default function NavBar() {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path || (path !== '/' && pathname?.startsWith(`${path}/`));

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
                let classes = "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200";

                if (link.special) {
                  classes += active
                    ? " border-red-500 text-red-700 focus:ring-red-500"
                    : " border-transparent text-red-600 hover:border-red-700 hover:text-red-800 focus:ring-red-500 animate-pulse motion-reduce:animate-none";
                } else {
                  classes += active
                    ? " border-blue-500 text-gray-900 focus:ring-blue-500"
                    : " border-transparent text-gray-500 hover:border-blue-500 hover:text-gray-700 focus:ring-blue-500";
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={classes}
                    aria-current={active ? 'page' : undefined}
                  >
                    {link.name}
                  </Link>
                );
              })}
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
    </nav>
  );
}

// Footer component included here as per original file structure
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
