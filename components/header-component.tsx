"use client";

import { useState, useEffect } from "react";
import { Search, Menu, User, ShoppingBag, ChevronRight } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  collapsed: boolean;
  isSidebarOpen: boolean;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (value: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  collapsed,
  isSidebarOpen,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  

  // Detects when the user scrolls
  
  // Adjust the header based on the sidebar state
  const headerClass = isSidebarOpen ? (collapsed ? "left-20" : "left-64") : "left-0";

  return (
    <header
      className={`fixed top-0 ${headerClass} right-0 z-50 transition-all duration-300`}
    >
      <div
        className={`bg-green-600 text-white text-xs text-center py-2 transition-opacity duration-300 opacity-100" `}
      >
        <a href="#" className="hover:underline">
          Oferta Especial: ¡20% en Orquídeas esta Semana!{" "}
          <ChevronRight className="inline h-3 w-3" />
        </a>
      </div>
      <div
        className={`h-16 transition-all duration-300  bg-white/90 backdrop-blur-md shadow-lg`}
      >
        <nav
          className={`px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between text-gray-800`}
        >
          <div className="flex items-center space-x-4">
            <button
              aria-label="Toggle menu"
              className="md:hidden hover:text-green-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} // Toggle menu
            >
              <Menu className="h-6 w-6" />
            </button>
            <a href="/home" className="text-2xl font-bold tracking-tight">
              Green<span className="text-green-600">Hub</span>
            </a>
            <div
              className={`hidden md:flex items-center rounded-md px-3 py-1.5 bg-gray-100
              }`}
            >
              <Search
                className={`h-4 w-4 mr-2 text-gray-500}`}
              />
              <input
                type="search"
                placeholder="Buscar flores, plantas..."
                className={`bg-transparent text-sm focus:outline-none w-64 text-gray-800 placeholder-gray-500`}
              />
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {["Productos", "Blog"].map((item) => (
              <Link
                key={item}
                href={
                  item === "Productos" ? "/products" : item === "Blog" ? "/blog" : "/home"
                }
                className={`hover:text-green-600 transition-colors`}
              >
                {item}
              </Link>
            ))}

            {[User, ShoppingBag].map((Icon, idx) => (
              <button key={idx} aria-label="User action" className="hover:text-green-600 transition-colors">
                {idx === 0 ? (
                  <Link href="/login">
                    <Icon className="h-5 w-5" />
                  </Link>
                ) : (
                  <Icon className="h-5 w-5" />
                )}
              </button>
            ))}
          </div>
          <div className="md:hidden flex items-center space-x-3">
            {[Search, User, ShoppingBag].map((Icon, idx) => (
              <button key={idx} aria-label="User action" className="hover:text-green-600 transition-colors">
                {idx === 1 ? (
                  <Link href="/login">
                    <Icon className="h-5 w-5" />
                  </Link>
                ) : (
                  <Icon className="h-5 w-5" />
                )}
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* Mobile menu, shown when isMobileMenuOpen is true */}
     {isMobileMenuOpen && (
  <div
    className={`md:hidden fixed inset-0 top-[calc(1.75rem+4rem)] z-40 bg-white/95 text-gray-800 p-6 space-y-4 backdrop-blur-md shadow-xl transition-all duration-300 ${
      collapsed ? "ml-20" : "ml-64"
    }`}
  >
    <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 mb-6">
      <Search className="h-5 w-5 text-gray-500 mr-2" />
      <input
        type="search"
        placeholder="Buscar flores..."
        className="bg-transparent text-sm placeholder-gray-500 focus:outline-none w-full"
      />
    </div>
    {["Productos", "Blog", "Mi Cuenta", "Favoritos"].map((item) => (
      <Link
        key={item}
        href={
          item === "Productos"
            ? "/products"
            : item === "Blog"
            ? "/blog"
            : "/home"
        }
        className="block py-2 hover:text-green-600 transition-colors text-lg"
      >
        {item}
      </Link>
    ))}
  </div>
)}
    </header>
  );
};

export default Header;
