import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Multixy_api } from "../../api/multixy-api";

export const CategoryList = () => {
  const navigate = useNavigate();

  // Récupération des catégories via React Query
  const { data: categories, error, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: Multixy_api.fetchAllCategories,
  });

  if (isLoading)
    return <p className="text-center text-blue-600">Chargement des catégories...</p>;
  if (error)
    return <p className="text-center text-red-500">Erreur : {error.message}</p>;

  return (
    <div className="p-6 mt-20">
      {/* En-tête avec le titre et le bouton */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">LISTE DES CATÉGORIES</h2>
        <button
          onClick={() => navigate("/administration/addcategory")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition-colors duration-300"
        >
          + Ajouter une catégorie
        </button>
      </div>

      <div className="overflow-x-auto bg-gray-50 rounded-lg shadow-lg">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-500 text-white text-sm uppercase">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">ID</th>
              <th className="px-6 py-4 text-left font-semibold">Nom</th>
              <th className="px-6 py-4 text-left font-semibold">Description</th>
              <th className="px-6 py-4 text-left font-semibold">Créé le</th>
              <th className="px-6 py-4 text-left font-semibold">Statut</th>
            </tr>
          </thead>
          <tbody>
            {categories?.length > 0 ? (
              categories.map((category) => (
                <tr
                  key={category.id_category}
                  className="border-b hover:bg-blue-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    {category.id_category}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    {category.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{category.description}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(category.created_at).toLocaleDateString("fr-FR")}
                  </td>
                  <td
                    className={`px-6 py-4 text-sm font-semibold ${
                      category.is_deleted ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {category.is_deleted ? "Supprimé" : "Actif"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4">
                  Aucune catégorie disponible.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
