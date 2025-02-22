import { ProduitForm } from "../ProduitForm/ProduitForm";
import { GesAppAPI } from "../api/GesApp-api";
import { addProduit } from "../store/produit-slice/produit-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export function ProduitCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nomProduit: "",
    prixProduit: "",
    dateExpiration: "",
    stock: "",
    id_fournisseur: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Convertir les champs spécifiques en entiers
    const newValue = ["prixProduit", "stock", "id_fournisseur"].includes(name)
      ? parseInt(value, 10) || ""
      : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });

    console.log(`${name}:`, newValue);
  };

  // Fonction de création de produit
  async function createProduit(formValue) {
    try {
      const createdProduit = await GesAppAPI.creeateProduit({ ...formValue });
      dispatch(addProduit(createdProduit));
      console.log("Produit créé avec succès :", createdProduit);
    } catch (error) {
      console.error("Erreur lors de la création du produit :", error.response?.data || error.message);
    }
  }

  // Fonction de validation et soumission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation simple des champs
    if (!formData.nomProduit || !formData.prixProduit || !formData.dateExpiration || !formData.stock || !formData.id_fournisseur) {
      console.error("Tous les champs sont obligatoires.");
      return;
    }

    if (isNaN(formData.prixProduit) || isNaN(formData.stock) || isNaN(formData.id_fournisseur)) {
      console.error("Les champs 'prixProduit', 'stock' et 'id_fournisseur' doivent être des nombres.");
      return;
    }

    console.log("Données du formulaire valides :", formData);
    createProduit(formData);
    navigate("/gesapp/product-list"); // Redirection vers la liste des produits après création

  };

  return (
    <ProduitForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
  );
}
