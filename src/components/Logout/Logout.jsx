import { useDispatch } from "react-redux";
import { logout } from "../../multixy_store/loginSlice/loginSlice";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Déconnexion de l'utilisateur
    dispatch(logout());
    // Redirection après la déconnexion
    navigate("/multixy/login"); // ou vers la page d'accueil "/"
  };

  return (
    <button
  onClick={handleLogout}
  className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold rounded-lg shadow-md hover:from-red-600 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-all duration-300"
>
  Déconnexion
</button>

  );
};
