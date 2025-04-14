import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { Multixy_api } from '../../api/multixy-api';

export const CategoryUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Récupération des données de la catégorie à modifier
  const { data: category, isLoading } = useQuery({
    queryKey: ['category', id],
    queryFn: () => Multixy_api.getCategoryById(id),
    enabled: !!id,
  });

  // Remplissage des champs une fois les données récupérées
  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description);
    }
  }, [category]);

  // Mutation pour mise à jour
  const mutation = useMutation({
    mutationFn: (updatedCategory) =>
      Multixy_api.updateCategory(id, updatedCategory),
    onSuccess: () => {
      setSuccess('Catégorie mise à jour avec succès !');
      setError('');
      navigate('/administration/category_list');
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

    mutation.mutate({ name, description });
  };

  if (isLoading) return <p className="text-center">Chargement...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-2xl border border-gray-300">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        MODIFIER LA CATEGORIE  <span className="text-blue-600">{category.name.toUpperCase()}</span>
      </h2>

        {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}
        {success && <p className="text-green-500 text-sm text-center mb-3">{success}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Entrez le nom"
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
              placeholder="Décrivez la catégorie"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-400"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? 'Mise à jour...' : 'Mettre à jour'}
          </button>
        </form>
      </div>
    </div>
  );
};
