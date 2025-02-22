/* eslint-disable react/prop-types */
// import { useNavigate } from "react-router-dom";

export function FournisseurTable ({ fournisseurs }){
  // const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4 text-left">LISTE DES FOURNISSEURS</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-500 text-white">
              <th className="py-3 px-4 text-left border-b border-gray-200">Nom</th>
              <th className="py-3 px-4 text-left border-b border-gray-200">Téléphone</th>
              <th className="py-3 px-4 text-left border-b border-gray-200">Adresse</th>
              <th className="py-3 px-4 text-left border-b border-gray-200">Email</th>
              <th className="py-3 px-4 text-left border-b border-gray-200">Type</th>
            </tr>
          </thead>
          <tbody>
            {fournisseurs.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-4 text-gray-600 italic"
                >
                  Aucun fournisseur disponible.
                </td>
              </tr>
            ) : (
              fournisseurs.map((fournisseur, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="py-3 px-4 border-b border-gray-200">
                    {fournisseur.nomFournisseur}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    {fournisseur.phoneFournisseur}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    {fournisseur.adresseFournisseur}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    {fournisseur.email}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    {fournisseur.type}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};


