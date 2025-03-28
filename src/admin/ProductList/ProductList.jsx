import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Multixy_api } from "../../api/multixy-api";
import { useState } from "react";

export const ProductList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1); // État de la page actuelle

  // Récupération des produits avec pagination via React Query
  const { data: products, error, isLoading } = useQuery({
    queryKey: ["products", currentPage], // Ajout de la page courante dans la clé de la query
    queryFn: () => Multixy_api.fetchAllProducts({ page: currentPage, limit: 6 }), // Passer page et limit à l'API
    keepPreviousData: true, // Garde les anciennes données pendant le chargement de la nouvelle page
  });

  console.log("Données des produits :", products); // 🔍 Debug

  if (isLoading) return <p className="text-center text-blue-600">Chargement des produits...</p>;
  if (error) return <p className="text-center text-red-500">Erreur : {error.message}</p>;

  // Gestion de la navigation des pages
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= products.totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="p-6 mt-20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">LISTE DES PRODUITS</h2>
        <button
          onClick={() => navigate("/administration/addproduct")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition-colors duration-300"
        >
          + Ajouter un produit
        </button>
      </div>

      <div className="overflow-x-auto bg-gray-50 rounded-lg shadow-lg">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-500 text-white text-sm uppercase">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">ID</th>
              <th className="px-6 py-4 text-left font-semibold">Nom</th>
              <th className="px-6 py-4 text-left font-semibold">Description</th>
              <th className="px-6 py-4 text-left font-semibold">Code Produit</th>
              <th className="px-6 py-4 text-left font-semibold">Prix</th>
              <th className="px-6 py-4 text-left font-semibold">Stock</th>
              <th className="px-6 py-4 text-left font-semibold">Image</th>
              <th className="px-6 py-4 text-left font-semibold">ID Catégorie</th>
              <th className="px-6 py-4 text-left font-semibold">Créé le</th>
              <th className="px-6 py-4 text-left font-semibold">Statut</th>
            </tr>
          </thead>
          <tbody>
            {products?.data?.length > 0 ? (
              products.data.map((product) => (
                <tr
                  key={product.id_product}
                  className="border-b hover:bg-blue-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    {product.id_product}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.description}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.codeProduct}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.price}€</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.stock}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    ) : (
                      <span className="text-gray-400">Image non disponible</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.id_category}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(product.created_at).toLocaleDateString("fr-FR")}
                  </td>
                  <td
                    className={`px-6 py-4 text-sm font-semibold ${
                      product.is_deleted ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {product.is_deleted ? "Supprimé" : "Actif"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center text-gray-500 py-4">
                  Aucun produit disponible.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:bg-gray-400"
        >
          Précédent
        </button>
        <span className="px-4 py-2 text-lg">
          Page {currentPage} sur {products.totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === products.totalPages}
          className="px-4 py-2 mx-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:bg-gray-400"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};
