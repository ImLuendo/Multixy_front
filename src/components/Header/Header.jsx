/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu, X, ShoppingCart, ChevronDown, ChevronUp } from "lucide-react";
import { Logo } from "../Logo/Logo";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "../SearchBar/SearchBar";
import { logout } from "../../multixy_store/loginSlice/loginSlice";
import { AdminHeader } from "../../admin/AdminHeader/AdminHeader";

export const Header = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartItemsCount = 3;
  const logoPath = "src/assets/images/logo_multixy.svg";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoggedIn, currentUser } = useSelector((state) => state.AUTH);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Si l'utilisateur est un admin, on redirige vers le tableau de bord admin
  if (isLoggedIn && currentUser?.role === "admin") {
    return (
      <div>
        <AdminHeader />
      </div>
    );
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-lg py-0 font-sans">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* MENU MOBILE */}
        <button 
          className="md:hidden text-gray-700 focus:outline-none" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
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
            <li>
              <a 
                href="#" 
                className="px-3 py-1 border-b-2 border-transparent hover:border-blue-500 text-sm font-normal"
              >
                Accueil
              </a>
            </li>
            <li className="relative">
              <a 
                href="#" 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                className="px-3 py-1 flex items-center space-x-2 text-sm font-normal border-b-2 border-transparent hover:border-blue-500"
              >
                <span>Catégories</span>
                {isDropdownOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </a>
              {isDropdownOpen && (
                <ul className="absolute left-0 bg-white border border-gray-200 rounded-md mt-2 w-56 shadow-lg z-10 py-2">
                  <li>
                    <a 
                      href="#" 
                      onClick={() => setSelectedCategory("Catégorie 1")} 
                      className="block px-5 py-2.5 hover:bg-blue-50"
                    >
                      Catégorie 1
                    </a>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <a 
                href="#" 
                className="px-3 py-1 border-b-2 border-transparent hover:border-blue-500 text-sm font-normal"
              >
                Contact
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="px-3 py-1 border-b-2 border-transparent hover:border-blue-500 text-sm font-normal"
              >
                À propos
              </a>
            </li>
          </ul>
        </nav>

        {/* BOUTONS AUTH + PANIER */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <button 
              onClick={handleLogout} 
              className="text-blue-600 hover:text-blue-800"
            >
              Déconnexion
            </button>
          ) : (
            <>
              <button 
                onClick={() => navigate("/login")} 
                className="px-4 py-2 border border-blue-600 rounded text-sm font-normal hover:bg-blue-50"
              >
                Connexion
              </button>
              <button 
                onClick={() => navigate("/signup")} 
                className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-normal hover:bg-blue-700"
              >
                Inscription
              </button>
            </>
          )}
          <div className="ml-2 p-2 hover:bg-gray-100 rounded-full cursor-pointer relative">
            <ShoppingCart className="h-5 w-5 text-gray-700" />
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemsCount}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
