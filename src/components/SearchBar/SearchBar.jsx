import { useState, useEffect, useRef } from "react";

// Données fictives pour les suggestions
const popularCategories = [
  "Smartphones",
  "Ordinateurs portables",
  "Vêtements femme",
  "Chaussures homme",
  "Montres",
  "Accessoires",
  "Meubles",
  "Décoration",
];

const recentSearches = ["iPhone 13", "Nike Air Max", "Samsung TV", "Canapé d'angle"];

const trendingSearches = [
  "Écouteurs sans fil",
  "Aspirateur robot",
  "Montre connectée",
  "Air fryer",
  "Console de jeux",
  "Tablette",
];

// eslint-disable-next-line react/prop-types
export function SearchBar({ onClose }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("popular");
  const searchBarRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus the input when the search bar opens
    inputRef.current?.focus();

    // Add event listener for escape key
    function handleEscape(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    function handleClickOutside(event) {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);

    // Empêcher le scroll du body quand la recherche est ouverte
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    inputRef.current?.focus();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-start justify-center pt-16 md:pt-32 px-4">
      <div ref={searchBarRef} className="bg-white rounded-lg shadow-xl w-full max-w-3xl overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Rechercher sur Multixy</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Fermer la recherche"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <form onSubmit={handleSubmit} className="relative">
            <input
              ref={inputRef}
              type="search"
              placeholder="Que recherchez-vous aujourd'hui?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </form>
        </div>

        <div className="p-4">
          <div className="border-b mb-4 flex space-x-4">
            <button onClick={() => setActiveTab("popular")} className={activeTab === "popular" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600"}>
              Catégories populaires
            </button>
            <button onClick={() => setActiveTab("recent")} className={activeTab === "recent" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600"}>
              Recherches récentes
            </button>
            <button onClick={() => setActiveTab("trending")} className={activeTab === "trending" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600"}>
              Tendances
            </button>
          </div>

          {activeTab === "popular" && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {popularCategories.map((category, index) => (
                <button key={index} className="border border-gray-300 rounded-md py-3 px-4 text-left hover:border-blue-500 hover:text-blue-600 transition-colors" onClick={() => handleSuggestionClick(category)}>
                  {category}
                </button>
              ))}
            </div>
          )}

          {activeTab === "recent" && (
            <div className="space-y-2">
              {recentSearches.length > 0 ? (
                <ul className="space-y-1">
                  {recentSearches.map((search, index) => (
                    <li key={index}>
                      <button className="w-full text-left p-2 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-2" onClick={() => handleSuggestionClick(search)}>
                        {search}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-center py-4">Aucune recherche récente</p>
              )}
            </div>
          )}

          {activeTab === "trending" && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {trendingSearches.map((trend, index) => (
                <button key={index} className="border border-gray-300 rounded-md py-3 px-4 text-left hover:border-blue-500 hover:text-blue-600 transition-colors" onClick={() => handleSuggestionClick(trend)}>
                  {trend}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
