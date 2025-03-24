import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { addUser } from "../../multixy_store/signupSlice/signupSlice";
import { Multixy_api } from "../../api/multixy-api";
import Swal from "sweetalert2";

export const SignupModal = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForms = () => {
    const errors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^(?:\+?\d{1,3})?[ -]?\d{2,4}[ -]?\d{3,4}[ -]?\d{3,4}$/;

    if (!formData.first_name.trim()) {
      errors.first_name = "Le champ Nom est obligatoire.";
    }
    if (!formData.last_name.trim()) {
      errors.last_name = "Le champ Prénom est obligatoire.";
    }
    if (!formData.email.trim()) {
      errors.email = "Le champ Email est obligatoire.";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Veuillez entrer un email valide. Ex: test@example.com";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Le numéro de téléphone est obligatoire.";
    } else if (!phoneRegex.test(formData.phone)) {
      errors.phone = "Veuillez entrer un numéro de téléphone valide.";
    }
    if (!formData.password) {
      errors.password = "Le champ mot de passe est obligatoire.";
    } else if (formData.password.length < 8) {
      errors.password = "Le mot de passe doit comporter au moins 8 caractères.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const mutation = useMutation({
    mutationFn: Multixy_api.createUser,
    onSuccess: (data) => {
      setIsSubmitting(false);
      Swal.fire({
        title: "Succès",
        text: "Votre compte a été créé avec succès !",
        icon: "success",
        confirmButtonText: "OK",
        customClass: {
          popup: "swal-small-popup",
          title: "swal-small-title",
          content: "swal-small-text",
          confirmButton: "swal-small-button",
        },
      });
      dispatch(addUser(data));
      navigate("/multixy/login");
    },
    onError: (error) => {
      setIsSubmitting(false);
      Swal.fire({
        title: "Erreur",
        text: error?.response?.data?.message || "Votre email est déjà associé à un compte multixy !!!! Veillez rassayer plus tard",
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          popup: "swal-small-popup",
          title: "swal-small-title",
          content: "swal-small-text",
          confirmButton: "swal-small-button",
        },
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForms()) return;

    setIsSubmitting(true);
    mutation.mutate(formData);
  };

  return (
    <div className="flex justify-center items-center mt-12 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-2xl border">
        <h2 className="text-xl font-semibold text-center text-blue-600 mb-4">
          CRÉER VOTRE COMPTE
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {["first_name", "last_name", "email", "phone", "address", "password"].map((field, index) => (
            <div key={index} className="col-span-1">
              <label className="block text-gray-600 text-sm font-normal">
                {field === "first_name" ? "Nom" :
                 field === "last_name" ? "Prénom" :
                 field === "email" ? "Email" :
                 field === "phone" ? "Téléphone" :
                 field === "address" ? "Adresse" : "Mot de passe"}
              </label>
              <input
                type={field === "password" ? "password" : field === "email" ? "email" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className={`w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2
                  ${fieldErrors[field] ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-400"}`}
                required
                disabled={isSubmitting}
              />
              {fieldErrors[field] && <p className="text-red-500 text-xs mt-1">{fieldErrors[field]}</p>}
            </div>
          ))}
          <div className="col-span-2">
            <button
              type="submit"
              className={`w-full py-2 mt-2 font-semibold rounded-md transition duration-300 focus:outline-none
                ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enregistrement..." : "Enregistrer"}
            </button>
            <p className="mt-3 text-sm font-normal text-center">
              Vous avez déjà un compte ?
              <Link to="/multixy/login" className="text-blue-600"> Connectez-vous</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
