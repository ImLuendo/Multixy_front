import ReactDOM from 'react-dom/client'
import { App } from './App'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Rendre le composant principal dans le DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>
    <Routes>
      <Route path="/" element = {<App />}>

      </Route>
    </Routes>
  </BrowserRouter>
)
