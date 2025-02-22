/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { GesAppAPI } from "../api/GesApp-api";
import { setFournissers } from "../store/fournisseur-slice/fournisseur-slice";
import { useState, useEffect } from "react";

export function ProduitForm({ formData, handleChange, handleSubmit }) {
  const dispatch = useDispatch();

  const [listOfFournisseur, setListOfFournisseur] = useState([]);

  // Récupération des fournisseurs
  async function fetchLengthFournisseurs() {
    try {
      const fournisseurList = await GesAppAPI.fetchFournisseur();
      dispatch(setFournissers(fournisseurList)); // Mise à jour de redux si nécessaire
      setListOfFournisseur(fournisseurList);
    } catch (error) {
      console.error("Erreur lors de la récupération des fournisseurs :", error);
    }
  }

  useEffect(() => {
    fetchLengthFournisseurs();
  }, []); // Appelé une seule fois au chargement du composant

  return (
    <div className="flex items-center justify-center min-h-screen border rounded">
      <div className="w-100 p-8 rounded-2xl shadow-xl bg-white">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          AJOUTER UN PRODUIT
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="nomProduit"
              className="block text-sm font-semibold text-gray-600"
            >
              Nom du Produit
            </label>
            <input
              type="text"
              id="nomProduit"
              name="nomProduit"
              value={formData.nomProduit}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500"
              placeholder="Entrez le nom du produit"
              required
            />
          </div>

          <div>
            <label
              htmlFor="prixProduit"
              className="block text-sm font-semibold text-gray-600"
            >
              Prix
            </label>
            <input
              type="number"
              id="prixProduit"
              name="prixProduit"
              value={formData.prixProduit}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500"
              placeholder="Entrez le prix du produit"
              required
            />
          </div>

          <div>
            <label
              htmlFor="dateExpiration"
              className="block text-sm font-semibold text-gray-600"
            >
              Date d'Expiration
            </label>
            <input
              type="date"
              id="dateExpiration"
              name="dateExpiration"
              value={formData.dateExpiration}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="stock"
              className="block text-sm font-semibold text-gray-600"
            >
              Stock
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500"
              placeholder="Entrez la quantité en stock"
              required
            />
          </div>

          <div>
            <label
              htmlFor="id_fournisseur"
              className="block text-sm font-semibold text-gray-600"
            >
              Fournisseur
            </label>
            <select
              id="id_fournisseur"
              name="id_fournisseur"
              value={formData.id_fournisseur}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500"
              required
            >
              <option value="">-- Sélectionnez un fournisseur --</option>
              {listOfFournisseur.map((fournisseur) => (
                <option key={fournisseur.idFournisseur} value={fournisseur.idFournisseur}>
                  {fournisseur.nomFournisseur}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gray-800 text-white font-bold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500"
          >
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
}
