import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, loginFailure } from '../../multixy_store/loginSlice';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { Multixy_api } from '../../api/multixy-api';

export const LoginModal = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Accéder à l'erreur dans le store Redux sous la clé "AUTH"
  const errorMessage = useSelector((state) => state.AUTH.error);

  const validateForms = () => {
    const errors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!formData.email.trim()) {
      errors.email = "Le champ Email est obligatoire.";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Veuillez entrer un email valide.";
    }

    if (!formData.password) {
      errors.password = "Le champ Mot de passe est obligatoire.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const mutation = useMutation({
    mutationFn: Multixy_api.loginUser,
    onSuccess: (data) => {
      console.log("Utilisateur connecté avec succès", data);
      dispatch(loginSuccess(data));
      navigate("/"); // Redirige après connexion réussie
    },
    onError: (error) => {
      console.error("Erreur lors de la connexion:", error);
      // Appel de loginFailure avec le message d'erreur
      dispatch(loginFailure(error.response?.data?.message || "L'email ou votre mot passe est incorrect! Veillez ressayer plus tard."));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForms()) return;

    try {
      mutation.mutate(formData);
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire:", error);
    }
  };

  return (
    <div className="flex justify-center items-center mt-12 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md border">
        <h2 className="text-xl font-semibold text-center text-blue-600 mb-4">
          SE CONNECTER
        </h2>
        {/* Afficher le message d'erreur de connexion si disponible */}
        {errorMessage && <p className="text-red-500 text-xs mt-1">{errorMessage}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-normal text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2
                ${fieldErrors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-400"}`}
            />
            {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-normal text-gray-600">Mot de passe</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={`w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2
                ${fieldErrors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-400"}`}
            />
            {fieldErrors.password && <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300 focus:outline-none"
          >
            Se connecter
          </button>

          <p className="mt-3 text-sm font-normal text-center">
            Vous n'avez pas de compte ? 
            <Link to="/signup" className="text-blue-600"> Inscrivez-vous</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
