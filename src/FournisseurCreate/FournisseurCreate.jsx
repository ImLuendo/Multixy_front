import { useState } from "react";
import { FournisseurForm } from "../components/Fournisseur/FournisseurForm";
import { GesAppAPI } from "../api/GesApp-api";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { addFournisseur } from "../store/fournisseur-slice/fournisseur-slice";

export function FournisseurCreate(){
    const dispatch = useDispatch();
    // const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nomFournisseur: '',
        phoneFournisseur: '',
        adresseFournisseur: '',
        email: '',
        type: '',
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    
        console.log(value)
      };
    
      //Fonction de creation de fournisseur
      async function createFournisseur(fomValue) {
        const createdFournisseur = await GesAppAPI.createFournisseur({...fomValue});
        dispatch(addFournisseur(createdFournisseur));
      }

      //Fonction de validation de formulaire
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Données du formulaire:', formData);
        createFournisseur(formData);
        alert("Creation du fournisseur avec succes !!!")
      };
    return(
        <FournisseurForm formData = {formData} handleChange = {handleChange} handleSubmit = {handleSubmit} onSub />
    )

}