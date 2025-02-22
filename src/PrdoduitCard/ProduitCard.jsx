import { useNavigate } from "react-router-dom";
import { GesAppAPI } from "../api/GesApp-api";
// import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export function ProductCard() {
    const navigate = useNavigate();
    // const dispatch = useDispatch();

    // État local pour stocker la longueur des fournisseurs
    const [listOfProduit, setListOfProduit] = useState(0);

    async function fetchAllProduct() {
        try {
            const response = await GesAppAPI.fetchProduct();
            if (response && Array.isArray(response.produits)) {
                setListOfProduit(response.produits.length);
            } else {
                console.error("fetchProduct n'a pas retourné une liste valide :", response);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des produits :", error);
        }
    }
    
    
    console.log(listOfProduit)
    useEffect(() => {
        fetchAllProduct();
    }, []); // Appelé une seule fois au chargement du composant

    function handleNavigate(e) {
        navigate("/gesapp/ajouter-produit");
        e.stopPropagation();
    }

    function handleNavigatetToProductList(){
        navigate(`/gesapp/product-list`);
        
    }

    return (
        <div
        onClick={handleNavigatetToProductList}
        className="bg-gradient-to-r from-blue-700 to-gray-500 text-white rounded-2xl shadow-lg p-2 w-80 flex items-center justify-between cursor-pointer">
            <div>
                <h2 className="text-xl font-bold">Produits</h2>
                <p className="text-4xl font-extrabold mt-2">{listOfProduit}</p>
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
