import logo from './logo.svg';
import './App.css';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Homepage from './components/homepage/Homepage';
import ProductPage from './components/product-page/ProductPage';
import LoginPage from './components/login-page/LoginPage';
import RegisterPage from './components/register-page/RegisterPage';
import Header from './components/header/Header';
import AddProductPage from './components/add-product-page/AddProductPage';
import ProfilePage from './components/profile-page/ProfilePage';
import CategoryPage from './components/category-page/CategoryPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Header/>
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/product/:id" element={<ProductPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/addProduct" element={<AddProductPage/>}></Route>
          <Route path="/user/:userId" element={<ProfilePage/>} />
          <Route path="/products/category/:category" element={<CategoryPage/>} />
        </Routes>

      </BrowserRouter>
      
    </div>
  );
}

export default App;
