import { useNavigate } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import { SearchBar } from "../SearchBar/SearchBar";
import { useState } from "react";
import { useSelector } from "react-redux";

export function Header() {
  const navigate = useNavigate();
  const btnSignUpString =  "S'inscrire"

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logoPath = "src/assets/images/logoo.png";

  return (
    <div className="flex items-center justify-between bg-white p-6 shadow-md">
      <div className="lg:hidden flex items-center">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-2xl"
        >

        </button>
      </div>

      {/* Logo (Centered on large screens) */}
      <div className="flex-1 flex justify-center lg:justify-start">
        <Logo
          onClick={() => navigate("/")}
          title="GesApp"
          subtitle="Gérez facilement votre business"
          image={logoPath}
        />
      </div>

      {/* Search Bar */}
      <div className="ml-4 flex-grow hidden lg:block">
        <SearchBar placeholder="Rechercher..." />
      </div>

      {/* Login and Signup Buttons */}


      <div className="hidden lg:flex space-x-4">
        <button
          onClick={() => navigate("gesapp/login")}
          className="px-4 py-2 border text-blue-500 rounded-md font-bold"
        >
          Se connecter
        </button>
        <button
          onClick={() => navigate("gesapp/signup")}
          className="px-4 py-2 bg-blue-500 text-white rounded-md font-bold"
        >
          {btnSignUpString}
        </button>
      </div>

      {/* Mobile Menu!!! ici il y a la logique de gestion de header sur un petit écran */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed top-20 left-0 h-full w-2/4 bg-gray-500 shadow-md flex flex-col items-start p-6 space-y-2"
        >
          {/* Close Button */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-white text-xl self-end"
          >
          </button>
          {/* Login Link!!!! Gestion de navigation avec useNavigate() un hooks de react-route-dom  */}
          <a
            onClick={() => {
              setIsMenuOpen(false);
              navigate("/gesapp/login");
            }}
            className="text-white text-lg cursor-pointer"
          >
            Se connecter
          </a>
          {/* Signup Link */}
          <a
            onClick={() => {
              setIsMenuOpen(false);
              navigate("/gesapp/singup");
            }}
            className="text-white text-lg cursor-pointer"
          >
            S'inscrire
          </a>
        </div>
      )}
    </div>
  );
}
