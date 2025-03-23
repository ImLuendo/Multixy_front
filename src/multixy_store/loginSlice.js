import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'loginSlice',
  "initialState": {
    isLoggedIn: false,
    currentUser: null, // Pour stocker les informations de l'utilisateur connecté
    error: null, // Pour gérer les erreurs de connexion
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.currentUser = action.payload; // Stocke l'utilisateur connecté
      state.error = null; // Réinitialise les erreurs
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
    },
  },
});

export const loginReducer = loginSlice.reducer;
export const { loginSuccess, loginFailure, logout } = loginSlice.actions;