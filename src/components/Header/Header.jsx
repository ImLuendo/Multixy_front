/* eslint-disable no-unused-vars */
"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu, X, ShoppingCart, ChevronDown, ChevronUp } from "lucide-react";
import { Logo } from "../Logo/Logo";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "../SearchBar/SearchBar";
import { logout } from "../../multixy_store/loginSlice/loginSlice";

export const Header = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartItemsCount = 3;
  const logoPath = "src/assets/images/logo_multixy.svg";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.AUTH.isLoggedIn);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/multixy/login");
  };

  return (
    <header className="bg-white shadow-lg py-0 font-sans relative">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* MENU MOBILE */}
        <button className="md:hidden text-gray-700 focus:outline-none" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <Menu className="h-6 w-6" />
        </button>

        {/* LOGO */}
        <div className="text-xl font-semibold tracking-tight text-gray-900 absolute left-1/2 transform -translate-x-1/2 md:static md:left-0 md:transform-none md:flex md:items-center">
          <Logo image={logoPath} onClick={() => navigate("/")} />
        </div>

        {/* SEARCH BAR */}
        <div className="md:flex items-center mx-8">
          <SearchBar />
        </div>

        {/* MENU NAVIGATION */}
        <nav className="hidden md:flex flex-1 justify-center">
          <ul className="flex justify-center space-x-4">
            <li><a href="#" className="px-3 py-1 border-b-2 border-transparent hover:border-blue-500 text-sm font-normal">Accueil</a></li>
            <li className="relative">
              <a href="#" onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="px-3 py-1 flex items-center space-x-2 text-sm font-normal border-b-2 border-transparent hover:border-blue-500">
                <span>Catégories</span>
                {isDropdownOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </a>
              {isDropdownOpen && (
                <ul className="absolute left-0 bg-white border border-gray-200 rounded-md mt-2 w-56 shadow-lg z-10 py-2">
                  <li><a href="#" onClick={() => setSelectedCategory("Catégorie 1")} className="block px-5 py-2.5 hover:bg-blue-50">Catégorie 1</a></li>
                </ul>
              )}
            </li>
            <li><a href="#" className="px-3 py-1 border-b-2 border-transparent hover:border-blue-500 text-sm font-normal">Contact</a></li>
            <li><a href="#" className="px-3 py-1 border-b-2 border-transparent hover:border-blue-500 text-sm font-normal">À propos</a></li>
          </ul>
        </nav>

        {/* BOUTONS AUTH + PANIER */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <button onClick={handleLogout} className="text-blue-600 hover:text-blue-800">Déconnexion</button>
          ) : (
            <>
              <button onClick={() => navigate("/multixy/login")} className="px-4 py-2 border border-blue-600 rounded text-sm font-normal hover:bg-blue-50">Connexion</button>
              <button onClick={() => navigate("/multixy/signup")} className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-normal hover:bg-blue-700">Inscription</button>
            </>
          )}
          <div className="ml-2 p-2 hover:bg-gray-100 rounded-full cursor-pointer relative">
            <ShoppingCart className="h-5 w-5 text-gray-700" />
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{cartItemsCount}</span>
          </div>
        </div>

        {/* MENU MOBILE */}
        {isMobileMenuOpen && (
          <>
            <div className="fixed inset-0 bg-black/30 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
            <div className="fixed inset-y-0 left-0 w-[60%] max-w-xs z-50 md:hidden flex flex-col shadow-xl bg-white">
              <div className="p-4 flex justify-between border-b border-gray-200">
                <Logo image={logoPath} onClick={() => navigate("/")} />
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-blue-600 p-1 hover:bg-blue-50 rounded-full"><X className="h-6 w-6" /></button>
              </div>
              <div className="flex-1 bg-blue-600 text-white p-5 space-y-4">
                <a href="#" className="block py-2 px-3 hover:bg-blue-500 rounded-md">Accueil</a>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center justify-between w-full py-2 px-3 hover:bg-blue-500 rounded-md">
                  <span>Catégories</span>
                  {isDropdownOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                {isDropdownOpen && (
                  <div className="ml-4 pl-2 border-l-2 border-blue-400 space-y-2">
                    <a href="#" onClick={() => setSelectedCategory("Catégorie 1")} className="block py-1.5 px-3 hover:bg-blue-500/50">Catégorie 1</a>
                  </div>
                )}
                <a href="#" className="block py-2 px-3 hover:bg-blue-500 rounded-md">Contact</a>
                <a href="#" className="block py-2 px-3 hover:bg-blue-500 rounded-md">À propos</a>
              </div>
              <div className="p-5 flex justify-center space-x-3 border-t border-gray-200">
                {isAuthenticated ? (
                  <button onClick={handleLogout} className="py-2.5 text-blue-600 border border-blue-600 rounded-md w-full hover:bg-blue-50">Déconnexion</button>
                ) : (
                  <>
                    <button onClick={() => navigate("/multixy/login")} className="py-2.5 border border-blue-600 rounded-md text-blue-600 hover:bg-blue-50">Connexion</button>
                    <button onClick={() => navigate("/multixy/signup")} className="py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700">Inscription</button>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};
