import { useNavigate } from "react-router-dom";
import { GesAppAPI } from "../../api/GesApp-api";
import { useDispatch } from "react-redux";
import { setFournissers } from "../../store/fournisseur-slice/fournisseur-slice";
import { useEffect, useState } from "react";

export function FournisseurCard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // État local pour stocker la longueur des fournisseurs
    const [lengthOfFournisseur, setLengthOfFournisseur] = useState(0);

    async function fetchLengthFournisseurs() {
        try {
            const fournisseurList = await GesAppAPI.fetchFournisseur();
            dispatch(setFournissers(fournisseurList)); // Mise à jour de redux si c'est important
            setLengthOfFournisseur(fournisseurList.length); // Je stocke la longuer de la liste des fournisseurs dans une variable loc pqrce que j'aurai besoin de la longuer de la liste des fournisseurs de la liste dans ce composant seulement
        } catch (error) {
            console.error("Erreur lors de la récupération des fournisseurs :", error);
        }
    }

    useEffect(() => {
        fetchLengthFournisseurs();
    }, []); // Appelé une seule fois au chargement du composant

    function handleNavigate(e) {
        navigate("/gesapp/fournisseurs");
        e.stopPropagation();
    }

    function handleNavigatetToFournisseurList(){
        navigate(`/gesapp/fournisseur-list`);
        
    }
    return (
        <div
        onClick={handleNavigatetToFournisseurList}
        className="bg-gradient-to-r from-gray-800 to-blue-300 text-white rounded-2xl shadow-lg p-2 w-80 flex items-center justify-between cursor-pointer">
            <div>
                <h2 className="text-xl font-bold">Fournisseurs</h2>
                <p className="text-4xl font-extrabold mt-2">{lengthOfFournisseur}</p>
            </div>
            <div className="flex items-center justify-center w-16 h-16 mt-8">
                <p
                    onClick={handleNavigate}
                    className="flex items-center justify-center text-white bg-white/20 rounded-full w-12 h-12 text-3xl hover:bg-gray-500 cursor-pointer"
                >
                    +
                </p>
            </div>
        </div>
    );
}
