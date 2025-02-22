

export const ProductCard = () => {
  return (
    <div className="max-w-xs rounded-lg shadow-lg overflow-hidden bg-white">
      <img  className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">T-shirt</h3>
        <p className="text-gray-600 mt-2">enu Hamburger (trois lignes) pour petits écrans :

            Utilise le bouton avec lg:hidden pour cacher l'icône de menu sur les grands écrans et l'afficher seulement sur les écrans plus petits.
            Le bouton affiche une icône de trois lignes (hamburger) en utilisant SVG.
            Lorsqu'on clique dessus, toggleMenu modifie l'état isMobileMenuOpen pour afficher ou masquer le menu mobile.
            Barre de recherche :

            La barre de recherche est affichée sur les grands écrans avec hidden lg:block, donc elle sera masquée sur les petits écrans.
            lg:block signifie que la barre de recherche sera visible à partir des écrans larges.
            Liens de navigation :

            Sur les écrans larges (lg:flex), les liens sont affichés de manière horizontale.
            Sur les petits écrans, ils sont cachés par défaut, et un menu mobile est affiché lorsque le bouton hamburger est cliqué.
            Menu mobile :

            Le menu mobile est conditionné par la variable d'état isMobileMenuOpen. Si cette variable est true, le menu sera affiché.
            Il est caché par défaut, et il s'affiche avec un fond gris plus foncé bg-gray-700.
            Responsive Design :

            La classe lg:hidden cache certains éléments sur les petits écrans (menu hamburger et barre de recherche).
        </p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">$9.9</span>
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
