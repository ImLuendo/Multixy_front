import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginModal } from './components/LoginModal/LoginModal';
import { SignupModal } from './components/SIgnupModal/SignupModal';
import { Provider } from 'react-redux';
import { multixy_store } from './multixy_store/multixy_store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SearchBar } from './components/SearchBar/SearchBar';
import { AddCategoryForm } from './admin/Category/AddCategory';
import { Dashboard } from './admin/Dashbord/Dashbord';
import { AdminLayout } from './admin/AdminLayout/AdminLayout';
import { CategoryList } from './admin/Category_list/CategoryList';
import { AddProductForm } from './admin/AddProduct/AddProductForm';
import { ProductList } from './admin/ProductList/ProductList';

// Création du client React Query
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={multixy_store}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<App />}>
            <Route path="signup" element={<SignupModal />} />
            <Route path="login" element={<LoginModal />} />
            <Route path="searchbar" element={<SearchBar />} />
          </Route>

          {/* Routes administrateur */}
          <Route path="/administration" element={<AdminLayout />}>
            <Route path="addcategory" element={<AddCategoryForm />} />
            <Route path="dashbord" element={<Dashboard />} />
            <Route path="category_list" element={<CategoryList />} />
            <Route path="addproduct" element={<AddProductForm />} />
            <Route path="product_list" element={<ProductList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>
);
