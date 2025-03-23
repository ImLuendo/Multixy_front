"use client"

import { useState } from "react"
import { Menu, X, ShoppingCart, ChevronDown, ChevronUp } from "lucide-react"
import { Logo } from "../Logo/Logo"
import { useNavigate } from "react-router-dom"
import { SearchBar } from "../SearchBar/SearchBar"

export const Header = () => {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  // Placeholder for cart items count - will be replaced with actual state management later
  const cartItemsCount = 3
  const logoPath = "src/assets/images/logo_multixy.svg"
  const navigate = useNavigate()

  // Fonction pour gérer la sélection de la catégorie
  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
    setIsDropdownOpen(false) // Ferme le menu déroulant après la sélection
    setIsMobileMenuOpen(false) // Ferme le menu mobile après la sélection
  }

  // Fonction pour afficher/fermer le menu déroulant
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  // Fonction pour afficher/fermer le menu mobile
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="bg-white shadow-lg py-0 font-sans relative">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* VZESION MOBILE DE L'ECRAN */}
        <button className="md:hidden text-gray-700 focus:outline-none" onClick={toggleMobileMenu}>
          <Menu className="h-6 w-6" />
        </button>

        {/* Logo (centered on mobile, left on desktop) */}
        <div className="text-xl font-semibold tracking-tight text-gray-900 absolute left-1/2 transform -translate-x-1/2 md:static md:left-0 md:transform-none md:flex md:items-center">
          <Logo image={logoPath} onClick= {()=>{navigate("/")}} />
        </div>

        {/* SearchBar (just after the logo) */}
        <div className="md:flex items-center mx-8 ma-96">  {/* Add margin for spacing */}
          <SearchBar />  {/* Ajouter le composant SearchBar ici */}
        </div>

        {/* Menu (hidden on mobile) */}
        <nav className="hidden md:flex flex-1 justify-center">
          <ul className="flex justify-center space-x-4"> {/* Réduction de l'espacement */}
            <li>
              <a
                href="#"
                className="px-3 py-1 relative inline-block border-b-2 border-transparent hover:border-blue-500 text-sm font-normal"
              >
                Accueil
              </a>
            </li>
            <li className="relative">
              <a
                href="#"
                onClick={toggleDropdown}
                className="px-3 py-1 relative inline-block border-b-2 border-transparent hover:border-blue-500 flex items-center space-x-2 text-sm font-normal"
              >
                <span>Catégories</span>
                {/* GESTION DE L'ICONE FLECHE SUR LE MENU CATEGOR */}
                <span className="text-sm transform transition-transform duration-200 ease-in-out">
                  {isDropdownOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </span>
              </a>
              {/* Menu déroulant amélioré */}
              {isDropdownOpen && (
                <ul className="absolute left-0 bg-white border border-gray-200 rounded-md mt-2 w-56 shadow-lg transition-all duration-300 ease-in-out z-10 py-2">
                  <li>
                    <a
                      href="#"
                      onClick={() => handleCategoryClick("Catégorie 1")}
                      className={`flex items-center px-5 py-2.5 hover:bg-blue-50 transition-all duration-200 ease-in-out ${
                        selectedCategory === "Catégorie 1"
                          ? "bg-blue-500 text-white hover:bg-blue-600"
                          : "text-gray-700"
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-blue-500 mr-3"></span>
                      Catégorie 1
                    </a>
                  </li>
                  {/* Autres éléments de catégorie */}
                </ul>
              )}
            </li>
            <li>
              <a
                href="#"
                className="px-3 py-1 relative inline-block border-b-2 border-transparent hover:border-blue-500 text-sm font-normal"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="#"
                className="px-3 py-1 relative inline-block border-b-2 border-transparent hover:border-blue-500 text-sm font-normal"
              >
                À propos
              </a>
            </li>
          </ul>
        </nav>
        
        {/* Connexion, Inscription et Panier (hidden on mobile) */}
        <div className="hidden md:flex items-center space-x-4">
          <button onClick={()=> {navigate("/multixy/login")}} className="px-4 py-2 border border-blue-600 rounded text-sm font-normal hover:bg-blue-50 transition-colors">
            Connexion
          </button>
          <button onClick={()=>{navigate("/multixy/signup")}} className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-normal hover:bg-blue-700 transition-colors">
            Inscription
          </button>
          <div className="ml-2 p-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors relative">
            <ShoppingCart className="h-5 w-5 text-gray-700" />
            {/* Badge pour le nombre d'articles dans le panier */}
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemsCount}
            </span>
          </div>
        </div>

        {/* Panier (visible on mobile) */}
        <div className="md:hidden flex items-center">
          <div className="p-1.5 hover:bg-gray-100 rounded-full cursor-pointer transition-colors relative">
            <ShoppingCart className="h-5 w-5 text-gray-700" />
            {/* Badge pour le nombre d'articles dans le panier (mobile) */}
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
              {cartItemsCount}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Menu (overlay) - Half screen with blue top and white bottom */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop overlay */}
          <div className="fixed inset-0 bg-black/30 z-40 md:hidden" onClick={toggleMobileMenu}></div>

          {/* Half-screen menu */}
          <div className="fixed inset-y-0 left-0 w-[60%] max-w-xs z-50 md:hidden flex flex-col shadow-xl">
            {/* White header with logo and blue X */}
            <div className="bg-white border-b border-gray-200">
              <div className="flex justify-between items-center p-4">
                <div className="text-xl font-semibold text-blue-600">Logo</div>
                <button
                  onClick={toggleMobileMenu}
                  className="text-blue-600 focus:outline-none p-1 hover:bg-blue-50 rounded-full transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Blue section with menu items */}
            <div className="bg-blue-600 text-white flex-1">
              {/* Main menu items */}
              <div className="p-5 space-y-4">
                <a
                  href="#"
                  className="block py-2 px-3 rounded-md hover:bg-blue-500 transition-colors font-medium"
                  onClick={toggleMobileMenu}
                >
                  Accueil
                </a>

                <div>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center justify-between w-full py-2 px-3 rounded-md hover:bg-blue-500 transition-colors font-medium"
                  >
                    <span>Catégories</span>
                    <span>
                      {isDropdownOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </span>
                  </button>

                  {/* Categories dropdown */}
                  {isDropdownOpen && (
                    <div className="mt-2 ml-4 pl-2 border-l-2 border-blue-400 space-y-2">
                      <a
                        href="#"
                        onClick={() => handleCategoryClick("Catégorie 1")}
                        className="flex items-center py-1.5 px-3 text-white/90 hover:text-white rounded-md hover:bg-blue-500/50"
                      >
                        <span className="w-2 h-2 rounded-full bg-white mr-3"></span>
                        Catégorie 1
                      </a>
                      <a
                        href="#"
                        onClick={() => handleCategoryClick("Catégorie 2")}
                        className="flex items-center py-1.5 px-3 text-white/90 hover:text-white rounded-md hover:bg-blue-500/50"
                      >
                        <span className="w-2 h-2 rounded-full bg-white mr-3"></span>
                        Catégorie 2
                      </a>
                      <a
                        href="#"
                        onClick={() => handleCategoryClick("Catégorie 3")}
                        className="flex items-center py-1.5 px-3 text-white/90 hover:text-white rounded-md hover:bg-blue-500/50"
                      >
                        <span className="w-2 h-2 rounded-full bg-white mr-3"></span>
                        Catégorie 3
                      </a>
                      <a
                        href="#"
                        onClick={() => handleCategoryClick("Catégorie 4")}
                        className="flex items-center py-1.5 px-3 text-white/90 hover:text-white rounded-md hover:bg-blue-500/50"
                      >
                        <span className="w-2 h-2 rounded-full bg-white mr-3"></span>
                        Catégorie 4
                      </a>
                    </div>
                  )}
                </div>

                <a
                  href="#"
                  className="block py-2 px-3 rounded-md hover:bg-blue-500 transition-colors font-medium"
                  onClick={toggleMobileMenu}
                >
                  Contact
                </a>

                <a
                  href="#"
                  className="block py-2 px-3 rounded-md hover:bg-blue-500 transition-colors font-medium"
                  onClick={toggleMobileMenu}
                >
                  À propos de nous
                </a>
              </div>
            </div>

            {/* White bottom section */}
            <div className="bg-white">
              <div className="p-5 flex flex-row justify-center space-x-3 border-t border-gray-200">
                <button
                  className="flex-1 py-2.5 border border-blue-600 rounded-md text-blue-600 font-medium hover:bg-blue-50 transition-colors"
                  onClick={toggleMobileMenu}
                >
                  Connexion
                </button>
                <button
                  className="flex-1 py-2.5 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
                  onClick={toggleMobileMenu}
                >
                  Inscription
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  )
}

