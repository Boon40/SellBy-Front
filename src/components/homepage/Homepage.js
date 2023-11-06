import React, { useEffect, useState } from 'react';
import axios from '../../api/axiosConfig'
import { Link } from 'react-router-dom';
import './Homepage.css';

const Homepage = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/v1/products')
      .then((response) => {
        const productData = response.data;
        const productWithPhotosPromises = productData.map((product) => {
          return axios.get(`/api/v1/productPhotos/product/${product.id}`)
            .then((photoResponse) => {
              const productWithPhotos = {
                ...product,
                photos: photoResponse.data,
              };
              return productWithPhotos;
            });
        });

        Promise.all(productWithPhotosPromises)
          .then((productsWithPhotos) => {
            setProducts(productsWithPhotos);
          });
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const topRowProducts = products.slice(0, 3);
  const bottomRowProducts = products.slice(3);

  return (
    <div className="homepage-box">
      <div className="homepage-categories-box">
        <span><a href="#">Art</a></span>
        <span><a href="#">Baby</a></span>
        <span><a href="#">Books</a></span>
        <span><a href="#">Business & Industrial</a></span>
        <span><a href="#">Cameras & Photos</a></span>
        <span><a href="#">Electronics</a></span>
        <span><a href="#">Clothing, Shoes & Accessories</a></span>
        <span><a href="#">Home & Garden</a></span>
        <span><a href="#">Jewelry & Watches</a></span>
        <span><a href="#">Music, Musical instruments & Gear</a></span>
        <span><a href="#">Pet Supplies</a></span>
        <span><a href="#">Sporting Goods</a></span>
        <span><a href="#">Toys & Hobbies</a></span>
        <span><a href="#">Travel</a></span>
        <span><a href="#">Video Games & Consoles</a></span>
      </div>
      <div className="homepage-product-box">
        <div className="homepage-small-product-box">
          <div className="homepage-product-row">
            {topRowProducts.map((product) => (
              <div key={product.id} className="homepage-product-card">
              <Link to={`/product/${product.id}`}>
                <i className="fa fa-heart cart" aria-hidden="true"></i>
                <img src={`/images/${product.photos[0].path}`} alt="Product Image" />
                <p className="homepage-product-title">{product.name}</p>
                <p className="homepage-product-price">{product.price}$</p>
              </Link>
            </div>
            ))}
          </div>
        </div>
        <div className="homepage-small-product-box">
          <div className="homepage-product-row">
          {bottomRowProducts.map((product) => (
              <div key={product.id} className="homepage-product-card">
              <Link to={`/product/${product.id}`}>
                <i className="fa fa-heart cart" aria-hidden="true"></i>
                <img src={`/images/${product.photos[0].path}`} alt="Product Image" />
                <p className="homepage-product-title">{product.name}</p>
                <p className="homepage-product-price">{product.price}$</p>
              </Link>
            </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;