import logo from './logo.svg';
import './App.css';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Homepage from './components/homepage/Homepage';
import ProductPage from './components/product-page/ProductPage';
import LoginPage from './components/login-page/LoginPage';
import RegisterPage from './components/register-page/RegisterPage';
import Header from './components/header/Header';

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Header/>
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/productPage" element={<ProductPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
        </Routes>

      </BrowserRouter>
      
    </div>
  );
}

export default App;