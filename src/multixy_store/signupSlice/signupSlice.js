import { createSlice } from "@reduxjs/toolkit";


export const signupSlice = createSlice({
    name: 'signupSlice',
    initialState: {
        users: [],
        message: null   // Pour les messages de succès ou d'erreur
    },
    reducers: {
        addUser: (state, action) =>{
            const userExist = state.users.find(
                (user) => user.email === action.payload.email
            );

            if(userExist) {
                state.message = "Il existe déjà un utilisateur avec ce email! veillez essayer un aure email"
            }else{
                state.users.push(action.payload);
                state.message = "Utilisateur ajouté avec succès"
            }
        }
    }
});

export const signupReducer = signupSlice.reducer;
export const { addUser } = signupSlice.actions;