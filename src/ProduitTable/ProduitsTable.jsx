import { useState, useEffect } from "react";
import { GesAppAPI } from "../api/GesApp-api";

export function ProduitTable() {
  const [produits, setProduits] = useState([]);

  // Fonction pour récupérer la liste des produits
  async function fetchAllProducts() {
    try {
      const response = await GesAppAPI.fetchProduct();
      if (response && Array.isArray(response.produits)) {
        setProduits(response.produits);
      } else {
        console.error("fetchProduct n'a pas retourné une liste valide :", response);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des produits :", error);
    }
  }

  useEffect(() => {
    fetchAllProducts();
  }, []); // Appelé une seule fois au chargement du composant

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4 text-left">LISTE DES PRODUITS</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-500 text-white">
              <th className="py-3 px-4 text-left border-b border-gray-200">Nom du produit</th>
              <th className="py-3 px-4 text-left border-b border-gray-200">prix</th>
              <th className="py-3 px-4 text-left border-b border-gray-200">date d'expiration</th>
              <th className="py-3 px-4 text-left border-b border-gray-200">En stock</th>
              <th className="py-3 px-4 text-left border-b border-gray-200">Fournisseur</th>
            </tr>
          </thead>
          <tbody>
            {produits.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-4 text-gray-600 italic"
                >
                  Aucun produit disponible.
                </td>
              </tr>
            ) : (
              produits.map((produit, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="py-3 px-4 border-b border-gray-200">
                    {produit.nomProduit}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    {produit.prixProduit}$
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    {new Date(produit.dateExpiration).toLocaleDateString('fr-FR')} 
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    {produit.stock}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    {produit.fournisseurs.nomFournisseur}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
