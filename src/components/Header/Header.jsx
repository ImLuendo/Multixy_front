"use client"

import { useState, useRef, useEffect } from "react"
import { LoginModal } from "../LoginModal/LoginModal"
import { CartButton } from "../CartButton/CartButton"
import { SignupModal } from "../SIgnupModal/SignupModal"
import { SearchBar } from "../SearchBar/SearchBar"

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSignupOpen, setIsSignupOpen] = useState(false)
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const categoriesRef = useRef(null)
  // const mobileMenuRef = useRef(null)

  // Fermer le dropdown des catégories quand on clique ailleurs
  useEffect(() => {
    function handleClickOutside(event) {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
        setIsCategoriesOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto md:px-6">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-white"
              >
                <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
                <path d="M12 3v6" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-blue-600">Multixy</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="/" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
            Accueil
          </a>
          <div className="relative" ref={categoriesRef}>
            <button
              className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
            >
              Catégories
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`ml-1 h-4 w-4 transition-transform ${isCategoriesOpen ? "rotate-180" : ""}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            {isCategoriesOpen && (
              <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                <div className="py-1">
                  <a
                    href="/categories/electronics"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                  >
                    Électronique
                  </a>
                  <a
                    href="/categories/fashion"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                  >
                    Mode
                  </a>
                  <a
                    href="/categories/home"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                  >
                    Maison & Jardin
                  </a>
                  <a
                    href="/categories/beauty"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                  >
                    Beauté & Santé
                  </a>
                  <a
                    href="/categories/sports"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                  >
                    Sports & Loisirs
                  </a>
                  <a
                    href="/categories/all"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                  >
                    Toutes les catégories
                  </a>
                </div>
              </div>
            )}
          </div>
          <a href="/contact" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
            Contact
          </a>
          <a href="/about" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
            À propos
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Rechercher"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={() => setIsLoginOpen(true)}
              className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded transition-colors"
            >
              Connexion
            </button>
            <button
              onClick={() => setIsSignupOpen(true)}
              className="px-3 py-1.5 text-sm font-medium border border-gray-300 rounded hover:border-blue-600 hover:text-blue-600 transition-colors"
            >
              Inscription
            </button>
          </div>

          {/* Cart Component */}
          <CartButton />

          {/* Mobile Menu */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md md:hidden hover:bg-gray-100 transition-colors"
          >
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col p-4 space-y-4">
            <a href="/" className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Accueil
            </a>
            <div>
              <button
                className="flex items-center justify-between w-full text-base font-medium text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => {
                  const submenu = document.getElementById("mobile-categories")
                  if (submenu) {
                    submenu.style.display = submenu.style.display === "none" ? "block" : "none"
                  }
                }}
              >
                <span>Catégories</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <div id="mobile-categories" className="pl-4 mt-2 space-y-2 hidden">
                <a
                  href="/categories/electronics"
                  className="block text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Électronique
                </a>
                <a
                  href="/categories/fashion"
                  className="block text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Mode
                </a>
                <a
                  href="/categories/home"
                  className="block text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Maison & Jardin
                </a>
                <a
                  href="/categories/beauty"
                  className="block text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Beauté & Santé
                </a>
                <a
                  href="/categories/sports"
                  className="block text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Sports & Loisirs
                </a>
              </div>
            </div>
            <a href="/contact" className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </a>
            <a href="/about" className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors">
              À propos
            </a>
            <div className="flex flex-col space-y-2 pt-2 border-t">
              <button
                onClick={() => {
                  setIsLoginOpen(true)
                  setIsMobileMenuOpen(false)
                }}
                className="w-full py-2 text-center text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
              >
                Connexion
              </button>
              <button
                onClick={() => {
                  setIsSignupOpen(true)
                  setIsMobileMenuOpen(false)
                }}
                className="w-full py-2 text-center border border-gray-300 rounded-md hover:border-blue-600 hover:text-blue-600 transition-colors"
              >
                Inscription
              </button>
            </div>
          </nav>
        </div>
      )}

      {/* Search Overlay */}
      {isSearchOpen && <SearchBar onClose={() => setIsSearchOpen(false)} />}

      {/* Login Modal */}
      {isLoginOpen && (
        <LoginModal
          onClose={() => setIsLoginOpen(false)}
          onSignupClick={() => {
            setIsLoginOpen(false)
            setIsSignupOpen(true)
          }}
        />
      )}

      {/* Signup Modal */}
      {isSignupOpen && (
        <SignupModal
          onClose={() => setIsSignupOpen(false)}
          onLoginClick={() => {
            setIsSignupOpen(false)
            setIsLoginOpen(true)
          }}
        />
      )}
    </header>
  )
}

