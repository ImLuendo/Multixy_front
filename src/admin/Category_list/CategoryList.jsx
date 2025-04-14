import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Multixy_api } from "../../api/multixy-api";
import { MdEdit } from 'react-icons/md';
import { CategoryDelete } from "../CategoryDelete/CategoryDelete";

export const CategoryList = () => {
  const navigate = useNavigate();

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
              <th className="px-6 py-4 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories?.filter(category => category.id_category !== 0).length > 0 ? (
              categories
                .filter(category => category.id_category !== 0)
                .map((category) => (
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
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {category.description || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {category.created_at
                        ? new Date(category.created_at).toLocaleDateString("fr-FR")
                        : "Non défini"}
                    </td>
                    <div className="flex gap-4">
                    <td className="px-6 py-4 flex gap-4">
                      <button
                        onClick={() =>
                          navigate(`/administration/updatecategory/${category.id_category}`)
                        }
                        className="flex items-center gap-1 bg-green-600 text-white px-1 py-2 rounded-md hover:bg-green-700 transition duration-300 shadow-md hover:shadow-lg"
                        title="Modifier la catégorie"
                      >
                        <MdEdit size={15} />
                        <span className="font-medium">Update</span>
                      </button>

                      <CategoryDelete
                        categoryId={category.id_category}
                        categoryName={category.name}
                      />
                    </td>
  
                    </div>
                    

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
