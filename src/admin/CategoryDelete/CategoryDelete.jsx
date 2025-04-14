/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Multixy_api } from "../../api/multixy-api";
import { useState } from "react";
import { MdDelete } from "react-icons/md";

export const CategoryDelete = ({ categoryId, categoryName }) => {
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => Multixy_api.deleteCategory(categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      setShowModal(false);
    },
    onError: (error) => {
      console.error("Erreur suppression :", error.message);
      alert("Erreur lors de la suppression");
    },
  });

  const handleDelete = () => {
    mutation.mutate();
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-1 bg-red-600 text-white px-1 py-2 rounded-md hover:bg-red-900 transition duration-300 shadow-md hover:shadow-lg"
        title="Supprimer la catégorie"
      >
        <MdDelete size={15} />
        <span>Delete</span>
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Supprimer la catégorie ?
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Êtes-vous sûr de vouloir supprimer la catégorie <strong>{categoryName}</strong> ?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-1 bg-red-600 text-white px-1 py-2 rounded-md hover:bg-red-900 transition duration-300 shadow-md hover:shadow-lg"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
