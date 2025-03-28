import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Multixy_api } from '../../api/multixy-api';
import { useNavigate } from 'react-router-dom';

export const AddCategoryForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate()
  // Mutation pour ajouter une catégorie
  const mutation = useMutation({
    mutationFn: (newCategory) => Multixy_api.createCategory(newCategory),
    onSuccess: () => {
      setSuccess('Catégorie ajoutée avec succès !');
      setError('');
      setName('');
      setDescription('');
      navigate("/administration/category_list")

    },
    onError: (error) => {
      setError(error.message || 'Une erreur est survenue.');
      setSuccess('');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !description) {
      setError('Tous les champs sont obligatoires.');
      setSuccess('');
      return;
    }

    setError('');
    setSuccess('');

    // Exécution de la mutation
    mutation.mutate({ name, description });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-2xl border border-gray-300">
        <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">AJOUTER UNE CATEGORIE</h2>
        
        {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}
        {success && <p className="text-green-500 text-sm text-center mb-3">{success}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom de la catégorie</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Entrez le nom de la catégorie"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              rows="3"
              placeholder="Décrivez la catégorie..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-400"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? 'Ajout en cours...' : 'Ajouter la catégorie'}
          </button>
        </form>
      </div>
    </div>
  );
};
