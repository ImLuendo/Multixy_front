import ReactDOM from 'react-dom/client'
import { App } from './App'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginModal } from './components/LoginModal/LoginModal'
import { SignupModal } from './components/SIgnupModal/SignupModal'

// Rendre le composant principal dans le DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>
    <Routes>
      <Route path="/" element = {<App />}>
        <Route path="multixy/signup" element = {<SignupModal />}/>
        <Route path="multixy/login" element = {<LoginModal />}/>

      </Route>
    </Routes>
  </BrowserRouter>
)
