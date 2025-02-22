/* eslint-disable react/prop-types */

export function FournisseurForm({ formData, handleChange, handleSubmit }) {
  return (
  <div className="flex items-center justify-center min-h-screen border rounded">
    <div className="w-100 p-8  rounded-2xl shadow-xl bg-white">
      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
        AJOUTER UN FOURNISSEUR
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="nomFournisseur"
            className="block text-sm font-semibold text-gray-600"
          >
            Nom du Fournisseur
          </label>
          <input
            type="text"
            id="nomFournisseur"
            name="nomFournisseur"
            value={formData.nomFournisseur}
            onChange={handleChange}
            className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500"
            placeholder="Entrez le nom du fournisseur"
            required
          />
        </div>

        <div>
          <label
            htmlFor="phoneFournisseur"
            className="block text-sm font-semibold text-gray-600"
          >
            Téléphone
          </label>
          <input
            type="tel"
            id="phoneFournisseur"
            name="phoneFournisseur"
            value={formData.phoneFournisseur}
            onChange={handleChange}
            className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500"
            placeholder="Entrez le numéro de téléphone"
            required
          />
        </div>

        <div>
          <label
            htmlFor="adresseFournisseur"
            className="block text-sm font-semibold text-gray-600"
          >
            Adresse
          </label>
          <input
            type="text"
            id="adresseFournisseur"
            name="adresseFournisseur"
            value={formData.adresseFournisseur}
            onChange={handleChange}
            className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500"
            placeholder="Entrez l'adresse du fournisseur"
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-2 px-4 py-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500"
            placeholder="Entrez l'email"
            required
          />
        </div>

        <div>
          <label
            htmlFor="type"
            className="block text-sm font-semibold text-gray-600"
          >
            Type
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500"
            required
          >
            <option value="">-- Sélectionnez le type de fournisseur --</option>
            <option value="local">Local</option>
            <option value="international">International</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gray-800 text-white font-bold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500"
        >
          Ajouter
        </button>
      </form>
    </div>
</div>

  );
}
