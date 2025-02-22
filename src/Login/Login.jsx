// Importation des outils nécessaires
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GesAppAPI } from "../api/GesApp-api";
// import { loginSuccess, loginFailure } from "../redux/login-slice";
import { loginSuccess, loginFailure } from "../store/login-slice/login-slice";

export function Login() {
  const [formDataLogin, setFormDataLogin] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); // Pour afficher les erreurs
  const [isSubmitting, setIsSubmitting] = useState(false); // Pour désactiver le bouton lors de la soumission

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Gestion des changements dans les champs du formulaire
  function handleChange(event) {
    const { name, value } = event.target;
    setFormDataLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Validation des champs du formulaire
  function validateForm() {
    if (!formDataLogin.username || !formDataLogin.password) {
      setErrorMessage("Veuillez remplir tous les champs.");
      return false;
    }
    if (formDataLogin.password.length < 8) {
      setErrorMessage("Le mot de passe doit comporter au moins 8 caractères.");
      return false;
    }
    return true;
  }

  // Gestion de la soumission du formulaire
  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
  
    if (!validateForm()) return;
  
    setIsSubmitting(true);
    try {
      // Appel API pour le login
      const response = await GesAppAPI.loginUser(formDataLogin);
  
      // Vérifiez la réponse de l'API
      console.log("Réponse de l'API :", response);
  
      // Stockage du token dans sessionStorage
      sessionStorage.setItem("authToken", response.token);
  
      // Dispatch de l'action Redux pour enregistrer l'utilisateur connecté
      dispatch(loginSuccess(response.user));
  
      // Affiche l'utilisateur connecté dans la console
      console.log("Utilisateur connecté après login :", response.user);
  
      // Redirection vers le tableau de bord
      navigate("/gesapp/dashbord");
    } catch (error) {
      // Gestion des erreurs d'API
      setErrorMessage(error.message || "Une erreur est survenue lors de la connexion.");
      dispatch(loginFailure(error.message));
    } finally {
      setIsSubmitting(false);
    }
  }
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Se connecter
        </h2>
        {errorMessage && (
          <p className="text-red-600 text-center mb-4 font-semibold">{errorMessage}</p>
        )}
        <form onSubmit={handleSubmit}>
          {/* Champ Username */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-2"
            >
              Nom d'utilisateur
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formDataLogin.username}
              onChange={handleChange}
              placeholder="Entrez votre nom d'utilisateur"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          {/* Champ Password */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formDataLogin.password}
              onChange={handleChange}
              placeholder="Entrez votre mot de passe"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          {/* Bouton Se connecter */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-gray-800 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <p className="text-center mt-4">
          Vous n'avez pas un compte ?{" "}
          <span
            className="text-blue-800 cursor-pointer hover:text-gray-800"
            onClick={() => navigate("/gesapp/signup")}
          >
            Inscrivez-vous
          </span>
        </p>
      </div>
    </div>
  );
}
