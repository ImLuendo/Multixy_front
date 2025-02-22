import { useSelector } from "react-redux";
// import { FournisseurCreate } from "../components/FournisseurCreate/FournisseurCreate";
import { FournisseurCard } from "../components/FournisseurCard/FournisseurCard";
import { ProductCard } from "../PrdoduitCard/ProduitCard";

export function Dashboard() {
  const currentUser = useSelector((state) => state.AUTH.currentUser);

  console.log("Utilisateur connecté :", currentUser);

  return (
    <div className="flex flex-wrap justify-center gap-20 p-6"> {/* Espacement réduit à gap-4 */}
      <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
        <FournisseurCard />
      </div>
      <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
        <ProductCard />
      </div>
      {/* <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
        <FournisseurCreate />
      </div> */}
    </div>
  );
}
