import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GesAppAPI } from "../api/GesApp-api";
import { addUser } from "../store/signup-store/user-slice";

export function SignUp() {
  const [formData, setFormData] = useState({
    nomUtilisateur: "",
    username: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Validation des champs
  const validateForm = () => {
    const errors = {};

    if (!formData.nomUtilisateur) {
      errors.nomUtilisateur = "Le champ nom est obligatoire.";
    }

    if (!formData.username) {
      errors.username = "Le champ username est obligatoire.";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      errors.username = "Le nom d'utilisateur doit être alphanumérique.";
    }

    if (!formData.password) {
      errors.password = "Le champ mot de passe est obligatoire.";
    } else if (formData.password.length < 8) {
      errors.password = "Le mot de passe doit comporter au moins 8 caractères.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Gestion du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage({ type: "", text: "" }); // Réinitialiser le message de statut

    if (!validateForm()) return; // Arrête si la validation échoue

    try {
      // Appel API pour créer l'utilisateur
      const newUser = await GesAppAPI.createUser({
        nomUtilisateur: formData.nomUtilisateur,
        username: formData.username,
        password: formData.password,
      });

      // Mise à jour du state Redux
      dispatch(addUser(newUser));

      // Message de succès et redirection
      setStatusMessage({
        type: "success",
        text: "Inscription réussie ! Redirection en cours...",
      });
      setTimeout(() => navigate("/gesapp/login"), 2000);
    } catch (error) {
      // Gérer les erreurs spécifiques de l'API
      if (error.response?.status === 409) {
        setStatusMessage({
          type: "info",
          text: "Cet utilisateur existe déjà.",
        });
      } else {
        setStatusMessage({
          type: "error",
          text: "Erreur : Impossible de créer l'utilisateur. Veuillez réessayer.",
        });
      }
    }
  };

  // Gestion des changements dans les inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md mt-9 mb-10">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Créer un compte
        </h2>
        {statusMessage.text && (
          <p
            className={`text-center mb-4 ${
              statusMessage.type === "success"
                ? "text-green-600"
                : statusMessage.type === "info"
                ? "text-blue-600"
                : "text-red-600"
            }`}
          >
            {statusMessage.text}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          {/* Nom utilisateur */}
          <div className="mb-4">
            <label
              htmlFor="nomUtilisateur"
              className="block text-gray-700 font-medium mb-2"
            >
              Nom
            </label>
            <input
              type="text"
              name="nomUtilisateur"
              id="nomUtilisateur"
              value={formData.nomUtilisateur}
              onChange={handleChange}
              placeholder="Entrez votre nom"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                fieldErrors.nomUtilisateur
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
            />
            {fieldErrors.nomUtilisateur && (
              <p className="text-red-500 text-sm mt-1">
                {fieldErrors.nomUtilisateur}
              </p>
            )}
          </div>

          {/* Username */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-2"
            >
              Votre username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Entrez votre nom d'utilisateur"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                fieldErrors.username
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
            />
            {fieldErrors.username && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.username}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Entrez votre mot de passe"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                fieldErrors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
            />
            {fieldErrors.password && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300"
          >
            Valider
          </button>
        </form>

        <p className="text-center mt-4">
          Vous avez déjà un compte ?{" "}
          <Link to="/gesapp/login" className="text-blue-800 hover:text-gray-800">
            Connectez-vous
          </Link>
        </p>
      </div>
    </div>
  );
}
