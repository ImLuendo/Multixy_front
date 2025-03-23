import { useState } from "react";

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="flex justify-center items-center py-4">
      <form onSubmit={handleSubmit} className="relative w-full max-w-md">
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Tapper le nom d'un produit ici ..."
          className="w-96 py-2 px-2 border-2 border-blue-500 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          type="submit"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 18l6-6m0 0l-6-6m6 6H4"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

