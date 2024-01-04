import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from '../../api/axiosConfig';
import './CategoryPage.css';

const CategoryPage = () => {

    const { category } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`/api/v1/products/category/${category}`)
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

      return (
        <div className="category-page-container">
            {products.map((product) => (
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
      )


}

export default CategoryPage;