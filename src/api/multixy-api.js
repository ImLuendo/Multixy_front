import axios from "axios";

const BASE_URL = "http://localhost:3000";

export class Multixy_api{
  static async createUser(userData) {
    try {
      const response = await axios.post(`${BASE_URL}/api/users/create`, userData);
      return response.data; // Retourne les données de l'utilisateur
    } catch (error) {
      console.error(error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erreur lors de la création de l'utilisateur");
    }
  }

  static async loginUser(credentials) {
        try {
          const response = await axios.post(`${BASE_URL}/login`, credentials);
          return response.data; // Retourne les credentials de l'utilisateurs du login
        } catch (error) {  //Gestion de l'erreur 
          console.error(error.response?.data || error.message);
          throw new Error(error.response?.data?.message || "Erreur!!! Votre Username ou Mot de passe est incorrect !");
        }
      }
}

//   static async loginUser(credentials) {
//     try {
//       const response = await axios.post(`${BASE_URL}/login`, credentials);
//       return response.data; // Retourne les credentials de l'utilisateurs du login
//     } catch (error) {  //Gestion de l'erreur 
//       console.error(error.response?.data || error.message);
//       throw new Error(error.response?.data?.message || "Erreur!!! Votre Username ou Mot de passe est incorrect !");
//     }
//   }

//   static async createFournisseur(fournisseurDatas){
//     try{
//       const response = await axios.post(`${BASE_URL}/fournisseur`, fournisseurDatas)
//       return response.data;
//     }catch(error){
//       console.error(error.response?.data || error.message);
//       throw new Error(error.response?.data?.message || "Erreur!! Lors de la creation de fournisseur, veillez ressayer");
//     }
//   }

//   static async fetchFournisseur(){
//     try{
//       const response = await axios.get(`${BASE_URL}/fournisseurs`)
//       return response.data;
//     }catch(error){
//       console.error(error.response?.data || error.message);
//       throw new Error(error.response?.data?.message || "Erreur!! Lors de la recuperation des fournisseurs, veillez ressayer");
//     }
//   }

//   static async creeateProduit(produitData) {
//     try {
//         const response = await axios.post(`${BASE_URL}/produit`, produitData);
//         return response.data;
//     } catch (error) {
//         console.error("Erreur lors de l'ajout du produit1:", error.response?.data || error.message);
//         throw new Error("Erreur!! Lors de la création de produit, veillez ressayer");
//     }
//   }

//   static async fetchProduct(){
//     try{
//       const response = await axios.get(`${BASE_URL}/produits`)
//       return response.data;
//     }catch(error){
//       console.error(error.response?.data || error.message);
//       throw new Error(error.response?.data?.message || "Erreur!! Lors de la recuperation des produits, veillez ressayer");
//     }
//   }
// }