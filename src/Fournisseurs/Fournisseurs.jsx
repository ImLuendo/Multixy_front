import { FournisseurTable } from "../FournisseurTable/FournisseurTable";
import { useDispatch } from "react-redux";
import { GesAppAPI } from "../api/GesApp-api";
import { setFournissers } from "../store/fournisseur-slice/fournisseur-slice";
import { useState, useEffect } from "react";


export function Fournisseurs(){
    const dispatch = useDispatch();

    // État local pour stocker la longueur des fournisseurs
    const [listOfFournisseur, setListOfFournisseur] = useState([]);

    async function fetchLengthFournisseurs() {
        try {
            const fournisseurList = await GesAppAPI.fetchFournisseur();
            dispatch(setFournissers(fournisseurList)); // Mise à jour de redux si c'est important
            setListOfFournisseur(fournisseurList); // Je stocke la longuer de la liste des fournisseurs dans une variable loc pqrce que j'aurai besoin de la longuer de la liste des fournisseurs de la liste dans ce composant seulement
        } catch (error) {
            console.error("Erreur lors de la récupération des fournisseurs :", error);
        }
    }

    useEffect(() => {
        fetchLengthFournisseurs();
    }, []); // Appelé une seule fois au chargement du composant


    console.log(typeof listOfFournisseur)

    return(
        <div>
            <FournisseurTable fournisseurs = {listOfFournisseur}  />
        </div>
    )
}