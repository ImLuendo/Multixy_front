import { createSlice } from '@reduxjs/toolkit';

// Récupérer l'état initial depuis localStorage
const storedUser = JSON.parse(localStorage.getItem("currentUser")) || null;
const isLoggedInStored = localStorage.getItem("isLoggedIn") === "true";

export const loginSlice = createSlice({
  name: 'loginSlice',
  initialState: {
    isLoggedIn: isLoggedInStored, // Récupérer l'état de connexion depuis localStorage
    currentUser: storedUser, // Récupérer les informations de l'utilisateur
    error: null, // Pour gérer les erreurs de connexion
  },
  reducers: {
    loginSuccess: (state, action) => {
      console.log('Utilisateur connecté:', action.payload);
      state.isLoggedIn = true;
      state.currentUser = action.payload; // Stocke l'utilisateur connecté
      state.error = null; // Réinitialise les erreurs

      // Sauvegarder dans localStorage
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
      localStorage.setItem("isLoggedIn", "true");
    },
    loginFailure: (state, action) => {
      state.isLoggedIn = false;
      state.currentUser = null;
      state.error = action.payload; // Stocke le message d'erreur
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.currentUser = null;
      state.error = null;

      // Supprimer les informations d'authentification de localStorage
      localStorage.removeItem("currentUser");
      localStorage.removeItem("isLoggedIn");
    },
  },
});

export const loginReducer = loginSlice.reducer;
export const { loginSuccess, loginFailure, logout } = loginSlice.actions;
