import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./signup-store/user-slice";
import { loginReducer } from "./login-slice/login-slice";
import { fournisseurReducer } from "./fournisseur-slice/fournisseur-slice";
import { produitReducer } from "./produit-slice/produit-slice";

export const store = configureStore({
  reducer: {
    USER: userReducer,
    AUTH: loginReducer,
    FOURNISSEUR: fournisseurReducer,
    PRODUIT: produitReducer
  },
});