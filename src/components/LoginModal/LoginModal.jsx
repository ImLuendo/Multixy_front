import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, loginFailure } from '../../multixy_store/loginSlice/loginSlice';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { Multixy_api } from '../../api/multixy-api';
import Swal from 'sweetalert2';

export const LoginModal = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const errorMessage = useSelector((state) => state.AUTH.error);

  // Validation des champs
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

  // Mutation avec gestion des erreurs et du délai de réponse
  const mutation = useMutation({
    mutationFn: Multixy_api.loginUser,
    onMutate: () => {
      // Afficher un loader pendant la requête
      Swal.fire({
        title: "Connexion en cours...",
        text: "Veuillez patienter...",
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Définir un timeout en cas de lenteur du serveur (10s)
      mutation.timeoutId = setTimeout(() => {
        Swal.fire({
          title: "Serveur trop lent...",
          text: "Le serveur met du temps à répondre. Veuillez réessayer plus tard.",
          icon: "warning",
          confirmButtonText: "OK",
        });
      }, 10000);
    },
    onSuccess: (data) => {
      clearTimeout(mutation.timeoutId); // Annuler le timeout si réponse reçue
      dispatch(loginSuccess(data));
      Swal.close();

      // Vérifiez le rôle de l'utilisateur et redirigez en conséquence
      if (data.user && data.user.role === 'admin') {
        navigate("/administration/dashbord"); // Redirige vers l'administration pour un admin
      } else {
        navigate("/"); // Sinon vers la page d'accueil
      }
    },
    onError: (error) => {
      clearTimeout(mutation.timeoutId); // Annuler le timeout en cas d'erreur

      Swal.fire({
        title: "Erreur !",
        text: error?.response?.data?.message || "L'email ou le mot de passe est incorrect !",
        icon: "error",
        confirmButtonText: "Réessayer",
      });

      dispatch(
        loginFailure(
          error?.response?.data?.message || "Une erreur est survenue, veuillez réessayer plus tard."
        )
      );
    },
  });

  // Gestion du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForms()) return;
    mutation.mutate(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center items-center mt-28 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md border">
        <h2 className="text-xl font-semibold text-center text-blue-600 mb-4">
          SE CONNECTER
        </h2>

        {errorMessage && <p className="text-red-500 text-xs mt-1">{errorMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-normal text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 ${
                fieldErrors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-400"
              }`}
            />
            {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-normal text-gray-600">Mot de passe</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 ${
                fieldErrors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-400"
              }`}
            />
            {fieldErrors.password && <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={mutation.isLoading}
            className={`w-full py-2 mt-2 font-semibold rounded-md transition duration-300 focus:outline-none ${
              mutation.isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {mutation.isLoading ? "Connexion en cours..." : "Se connecter"}
          </button>

          <p className="mt-3 text-sm font-normal text-center">
            Vous n'avez pas de compte ? <Link to="/multixy/signup" className="text-blue-600"> Inscrivez-vous</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

