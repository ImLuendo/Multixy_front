import axios from 'axios';

const BASE_URL = "http://localhost:3000";

export class Multixy_api {
  static async createUser(userData) {
    try {
      const response = await axios.post(`${BASE_URL}/api/users/create`, userData, {
        headers: {
          'Content-Type': 'application/json', // S'assurer que les données sont envoyées en JSON
        },
      });
      return response.data; // Retourne les données de l'utilisateur
    } catch (error) {
      console.error(error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erreur lors de la création de l'utilisateur");
    }
  }

  static async loginUser(credentials) {
    try {
      const response = await axios.post(`${BASE_URL}/login`, credentials, {
        headers: {
          'Content-Type': 'application/json', // S'assurer que les données sont envoyées en JSON
        },
      });
      return response.data;
    } catch (error) {
      console.error(error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erreur!!! Votre Username ou Mot de passe est incorrect !");
    }
  }

  static async createCategory(category) {
    try {
      const response = await axios.post(`${BASE_URL}/api/categories/create`, category, {
        headers: {
          'Content-Type': 'application/json', // S'assurer que les données sont envoyées en JSON
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la création de la catégorie :", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erreur lors de l'ajout de la catégorie.");
    }
  }

  // 🔥 Nouvelle fonction : Récupérer toutes les catégories
  static async fetchAllCategories() {
    try {
      const response = await axios.get(`${BASE_URL}/api/categories/`);
      return response.data; // Retourne la liste des catégories
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories :", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erreur lors de la récupération des catégories.");
    }
  }

  // 🚀 Nouvelle fonction : Créer un produit
  static async createProduct(productData) {
    try {
      // Envoi des données sous format JSON avec les bons en-têtes
      const response = await axios.post(`${BASE_URL}/api/products/create`, productData, {
        headers: {
          'Content-Type': 'application/json', // S'assurer que les données sont envoyées en JSON
        },
      });
      return response.data; // Retourne les données du produit créé
    } catch (error) {
      console.error("Erreur lors de la création du produit :", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erreur lors de l'ajout du produit.");
    }
  }

  // 🚀 Nouvelle fonction : Récupérer tous les produits avec pagination
  static async fetchAllProducts({ page, limit }) {
    try {
      // Envoie des paramètres de pagination dans la requête GET
      const response = await axios.get(`${BASE_URL}/api/products/`, {
        params: {
          page: page,  // Page actuelle
          limit: limit,  // Nombre de produits par page
        },
      });
  
      // Retourner les données de l'API, y compris les produits et les informations de pagination
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des produits :", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erreur lors de la récupération des produits.");
    }
  }

  // 🚀 Nouvelle fonction : Mettre à jour un produit
  static async updateProduct(productId, productData) {
    try {
      const response = await axios.put(`${BASE_URL}/api/products/update/${productId}`, productData, {
        headers: {
          'Content-Type': 'application/json', // S'assurer que les données sont envoyées en JSON
        },
      });
      return response.data; // Retourner les données du produit mis à jour
    } catch (error) {
      console.error("Erreur lors de la mise à jour du produit :", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erreur lors de la mise à jour du produit.");
    }
  }

  // 🚀 Nouvelle fonction : Supprimer un produit (soft delete)
  static async deleteProduct(productId) {
    try {
      const response = await axios.delete(`${BASE_URL}/api/products/delete/${productId}`, {
        headers: {
          'Content-Type': 'application/json', // S'assurer que les données sont envoyées en JSON
        },
      });
      return response.data; // Retourner la réponse après la suppression
    } catch (error) {
      console.error("Erreur lors de la suppression du produit :", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erreur lors de la suppression du produit.");
    }
  }

    // 🔍 Récupérer une catégorie par son ID
  static async getCategoryById(categoryId) {
    try {
      const response = await axios.get(`${BASE_URL}/api/categories/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération de la catégorie :", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erreur lors de la récupération de la catégorie.");
    }
  }

  // ✏️ Mettre à jour une catégorie
  static async updateCategory(categoryId, updatedCategory) {
    try {
      const response = await axios.put(`${BASE_URL}/api/categories/update/${categoryId}`, updatedCategory,
        {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la catégorie :", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erreur lors de la mise à jour de la catégorie.");
    }
  }

  // ❌ Supprimer une catégorie (soft delete)
  static async deleteCategory(categoryId) {
    try {
      const response = await axios.delete(`${BASE_URL}/api/categories/delete/${categoryId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data; // Retourne le message de succès ou les infos supprimées
    } catch (error) {
      console.error("Erreur lors de la suppression de la catégorie :", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erreur lors de la suppression de la catégorie.");
    }
  }


}
