import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WelcomePage } from "./WelcomePage/WelcomePage.jsx";
import { Login } from "./Login/Login.jsx";
import { SignUp } from "./SignUp/SignUp.jsx";
import { PageNotFound } from "./PageNotFound/PageNotFound.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux"; // Importer le Provider
import { store } from "./store/index.js";
import { Dashboard } from "./Dashboard/Dashboard.jsx";
import { FournisseurCreate } from "./FournisseurCreate/FournisseurCreate.jsx";
import { Fournisseurs } from "./Fournisseurs/Fournisseurs.jsx";
import { ProduitCreate } from "./ProduitCreate/ProduitCreate.jsx";
import { ProduitTable } from "./ProduitTable/ProduitsTable.jsx";

// Initialisation correcte du QueryClient
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}> {/* Envelopper l'application avec le Provider */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<WelcomePage />} />
            <Route path="gesapp/login" element={<Login />} />
            <Route path="gesapp/signup" element={<SignUp />} />
            <Route path="gesapp/dashbord" element={<Dashboard />} />
            <Route path="gesapp/fournisseurs" element={<FournisseurCreate />} />
            <Route path="gesapp/fournisseur-list" element={<Fournisseurs />} />
            <Route path="gesapp/ajouter-produit" element={<ProduitCreate />} />
            <Route path="gesapp/product-list" element={<ProduitTable />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
  </QueryClientProvider>
);
