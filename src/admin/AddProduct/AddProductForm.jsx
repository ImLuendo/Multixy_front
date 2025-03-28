import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Multixy_api } from '../../api/multixy-api';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export const AddProductForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); // URL de l'image locale
  const [id_category, setId_Category] = useState('');
  const [codeProduct, setCodeProduct] = useState('');
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate()

  // Effect pour récupérer les catégories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await Multixy_api.fetchAllCategories(); // Utilisation de la méthode fetchAllCategories
        setCategories(response); // Mettre à jour les catégories dans l'état
      } catch (error) {
        setError('Erreur lors de la récupération des catégories.');
        console.error(error.message);
      }
    };

    fetchCategories(); // Appel de la fonction au montage du composant
  }, []);

  // Mutation pour envoyer les données du produit
  const mutation = useMutation({
    mutationFn: async (newProduct) => {
      try {
        const response = await Multixy_api.createProduct(newProduct); // Utilisation de la méthode createProduct
        return response; // Retourner les données du produit créé
      } catch (error) {
        console.error("Erreur lors de l'ajout du produit :", error.message);
        throw new Error(error.message || 'Erreur lors de l\'ajout du produit.');
      }
    },
    onSuccess: () => {
      setSuccess('Produit ajouté avec succès !');
      setError('');
      setName('');
      setDescription('');
      setPrice('');
      setStock('');
      setImage(null);
      setImageUrl(null);
      setId_Category('');
      setCodeProduct('');
      Swal.fire({
        title: 'Succès !',
        text: 'Produit ajouté avec succès.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      navigate("/administration/product_list")
      
    },
    onError: (error) => {
      setError(error.message || 'Une erreur est survenue.');
      setSuccess('');
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Utilisation de FileReader pour obtenir l'URL locale
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);  // Afficher l'URL locale
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Nom:', name);
    console.log('Prix:', price);
    console.log('Stock:', stock);
    console.log('CodeProduct:', codeProduct);
    console.log('ID Catégorie:', id_category);

    if (!name || !description || !price || !stock || !id_category || !codeProduct) {
      setError('Tous les champs sont obligatoires.');
      setSuccess('');
      return;
    }

    const priceNumber = parseFloat(price);
    const stockNumber = parseInt(stock, 10);
    const categoryId = parseInt(id_category, 10);

    if (isNaN(priceNumber) || isNaN(stockNumber) || isNaN(categoryId)) {
      setError('Le prix, le stock, et la catégorie doivent être des valeurs valides.');
      return;
    }

    setError('');
    setSuccess('');

    const productData = {
      name,
      description,
      price: priceNumber,
      stock: stockNumber,
      id_category: categoryId,
      codeProduct,
      image: image ? image.name : null, // Utilisation du nom de l'image pour l'envoyer
    };

    console.log('Product Data:', productData);

    // Appel à la mutation pour envoyer les données via react-query
    mutation.mutate(productData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen mt-10">
      <div className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-2xl border border-gray-300">
        <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">AJOUTER UN PRODUIT</h2>

        {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
        {success && <p className="text-green-500 text-sm text-center mb-2">{success}</p>}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom du produit</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Entrez le nom du produit"
              />
            </div>

            <div className="mb-2">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Prix</label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Entrez le prix"
              />
            </div>

            <div className="mb-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                rows="3"
                placeholder="Décrivez le produit..."
              />
            </div>

            <div className="mb-2">
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
              <input
                type="number"
                id="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Stock disponible"
              />
            </div>

            <div className="mb-2">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
              <input
                type="file"
                id="image"
                onChange={handleImageChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {imageUrl && <img src={imageUrl} alt="Preview" className="mt-4 w-full max-w-[150px] rounded-lg shadow" />}
            </div>

            <div className="mb-2">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Catégorie</label>
              <select
                id="category"
                value={id_category}
                onChange={(e) => setId_Category(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="">----- Sélectionner une catégorie -----</option>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <option key={category.id} value={category.id_category}>
                      {category.name}
                    </option>
                  ))
                ) : (
                  <option disabled>Chargement des catégories...</option>
                )}
              </select>
            </div>

            {/* Nouveau champ pour le code */}
            <div className="mb-2">
              <label htmlFor="codeProduct" className="block text-sm font-medium text-gray-700">Code du produit</label>
              <input
                type="text"
                id="codeProduct"
                value={codeProduct}
                onChange={(e) => setCodeProduct(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Entrez le code du produit"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-400"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? 'Ajout en cours...' : 'Ajouter le produit'}
          </button>
        </form>
      </div>
    </div>
  );
};
