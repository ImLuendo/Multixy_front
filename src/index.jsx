import ReactDOM from 'react-dom/client'
import { App } from './App'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginModal } from './components/LoginModal/LoginModal'
import { SignupModal } from './components/SIgnupModal/SignupModal'
import { Provider } from 'react-redux'
import { multixy_store } from './multixy_store/multixy_store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SearchBar } from './components/SearchBar/SearchBar'
// Rendre le composant principal dans le DOM

// Création du client React Query
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <QueryClientProvider client={queryClient}>

    <Provider store={multixy_store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element = {<App />}>
            <Route path="multixy/signup" element = {<SignupModal />}/>
            <Route path="multixy/login" element = {<LoginModal />}/>
            <Route path="multixy/searchbar" element = {<SearchBar />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>

  </QueryClientProvider>
  
  
)
