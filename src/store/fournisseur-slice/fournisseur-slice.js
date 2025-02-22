import { createSlice } from '@reduxjs/toolkit';

export const fournisseurSlice = createSlice({
  name: 'fournisseurSlice',
  "initialState": {
    fournisseur: []//liste des fournisseurs
  },
  reducers: {
    addFournisseur: (state, action) =>{
        state.fournisseur.push(action.payload);
    },
    setFournissers: (state, action) =>{
      state.fournisseur = action.payload;
    },
  },
});

export const fournisseurReducer = fournisseurSlice.reducer;
export const { addFournisseur, setFournissers } = fournisseurSlice.actions;
