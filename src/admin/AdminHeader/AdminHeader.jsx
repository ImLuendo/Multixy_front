import { NavLink, useNavigate } from "react-router-dom"; 
import { FiGrid, FiBox, FiLayers, FiShoppingCart, FiUsers, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { logout } from "../../multixy_store/loginSlice/loginSlice";
import { useState } from "react";

export const AdminHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");  
    setIsMenuOpen(false); // Fermer le menu après déconnexion
  };

  return (
    <header className="shadow-md p-4 w-full bg-blue-600 fixed top-0 left-0 z-50">
      <div className="flex items-center justify-between px-4 lg:px-12 relative">
        
        {/* Bouton menu hamburger (mobile) */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="lg:hidden text-white absolute left-4 top-1/2 transform -translate-y-1/2"
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Logo (centré sur mobile, à gauche sur desktop) */}
        <h2 className="text-xl font-bold text-white lg:ml-0 ml-10">MULTIXY</h2>

        {/* MENU MOBILE (Sidebar) */}
        <div className={`fixed top-16 left-0 h-full w-64 bg-blue-700 shadow-lg transform transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:hidden`}>
          <nav className="flex flex-col space-y-4 p-6 mt-6">
            <NavLink to="/administration/dashbord" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-2 p-3 text-white hover:bg-blue-800 rounded-md">
              <FiGrid /><span>Tableau de bord</span>
            </NavLink>
            <NavLink to="/products" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-2 p-3 text-white hover:bg-blue-800 rounded-md">
              <FiBox /><span>Produits</span>
            </NavLink>
            <NavLink to="/administration/category_list" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-2 p-3 text-white hover:bg-blue-800 rounded-md">
              <FiLayers /><span>Catégories</span>
            </NavLink>
            <NavLink to="/orders" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-2 p-3 text-white hover:bg-blue-800 rounded-md">
              <FiShoppingCart /><span>Commandes</span>
            </NavLink>
            <NavLink to="/clients" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-2 p-3 text-white hover:bg-blue-800 rounded-md">
              <FiUsers /><span>Clients</span>
            </NavLink>

            {/* Déconnexion */}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 p-3 text-white hover:bg-blue-800 rounded-md"
            >
              <FiLogOut />
              <span>Déconnexion</span>
            </button>
          </nav>
        </div>

        {/* MENU DESKTOP */}
        <nav className="hidden lg:flex space-x-2 absolute left-1/2 transform -translate-x-1/2">
          <NavLink to="/administration/dashbord" className="flex items-center space-x-2 p-2 text-white hover:bg-blue-700 rounded-md">
            <FiGrid /><span>Tableau de bord</span>
          </NavLink>
          <NavLink to="/administration/product_list" className="flex items-center space-x-2 p-2 text-white hover:bg-blue-700 rounded-md">
            <FiBox /><span>Produits</span>
          </NavLink>
          <NavLink to="/administration/category_list" className="flex items-center space-x-2 p-2 text-white hover:bg-blue-700 rounded-md">
            <FiLayers /><span>Catégories</span>
          </NavLink>
          <NavLink to="/orders" className="flex items-center space-x-2 p-2 text-white hover:bg-blue-700 rounded-md">
            <FiShoppingCart /><span>Commandes</span>
          </NavLink>
          <NavLink to="/clients" className="flex items-center space-x-2 p-2 text-white hover:bg-blue-700 rounded-md">
            <FiUsers /><span>Clients</span>
          </NavLink>
        </nav>

        {/* Bouton de déconnexion (Desktop) */}
        <button
          onClick={handleLogout}
          className="hidden lg:flex items-center space-x-2 p-2 text-white hover:bg-blue-700 rounded-md"
        >
          <FiLogOut />
          <span>Déconnexion</span>
        </button>
      </div>
    </header>
  );
};
