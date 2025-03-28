import { Outlet } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";

export function App() {
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header classique pour les utilisateurs non-admins */}
      <Header />

      {/* Contenu principal */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <Outlet /> {/* Affichage du contenu dynamique */}
      </main>

      {/* Footer présent uniquement pour les utilisateurs classiques */}
      <Footer />
    </div>
  );
}
