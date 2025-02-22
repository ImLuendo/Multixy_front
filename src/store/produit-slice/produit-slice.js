import { createSlice } from '@reduxjs/toolkit';

export const produitSlice = createSlice({
  name: 'produitSlice',
  "initialState": {
    produits: []//liste des produits
  },
  reducers: {
    addProduit: (state, action) =>{
        state.produits.push(action.payload);
    },
    // setFournissers: (state, action) =>{
    //   state.fournisseur = action.payload;
    // },
  },
});

export const produitReducer = produitSlice.reducer;
export const { addProduit} = produitSlice.actions;