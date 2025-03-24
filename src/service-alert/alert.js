import Swal from 'sweetalert2';

export const showAlert = () => {
  Swal.fire({
    title: 'Connexion réussie !',
    text: 'Bienvenue sur multixy',
    icon: 'success',
    confirmButtonText: 'OK'
  });
};

