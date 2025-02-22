// utils/validation.js
export const validateForm = ({ nomUtilisateur, username, password }) => {
    if (!nomUtilisateur || !username || !password) {
      return "Tous les champs sont obligatoires !";
    }
    if (password.length < 8) {
      return "Le mot de passe doit comporter au moins 8 caractères.";
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return "Le nom d'utilisateur doit être alphanumérique.";
    }
    return null; // Pas d'erreurs
  };
  