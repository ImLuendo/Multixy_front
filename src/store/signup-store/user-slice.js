import { createSlice } from '@reduxjs/toolkit';

export const signUpSlice = createSlice({
  name: 'signUpSlice',
  initialState: {
    users: [],
    message: null, // Pour les messages de succès ou d'erreur
  },
  reducers: {
    addUser: (state, action) => {
      const userExists = state.users.find(
        (user) => user.username === action.payload.username
      );
      if (userExists) {
        state.message = 'Utilisateur déjà existant !';
      } else {
        state.users.push(action.payload);
        state.message = 'Utilisateur ajouté avec succès !';
      }
    },
    clearMessage: (state) => {
      state.message = null; // Pour réinitialiser le message
    },
    removeUser: (state, action) => {
      state.users = state.users.filter(
        (user) => user.username !== action.payload.username
      );
      state.message = 'Utilisateur supprimé avec succès !';
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(
        (user) => user.username === action.payload.username
      );
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...action.payload };
        state.message = 'Utilisateur mis à jour avec succès !';
      } else {
        state.message = 'Utilisateur introuvable !';
      }
    },
  },
});

export const userReducer = signUpSlice.reducer;
export const { addUser, clearMessage, removeUser, updateUser } = signUpSlice.actions;



