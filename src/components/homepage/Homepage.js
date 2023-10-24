import React from 'react';
import './Homepage.css';

const Homepage = () => {
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
            <div className="homepage-product-card">
              <a href="#">
                <i className="fa fa-heart cart" aria-hidden="true"></i>
                <img alt="Product Image" />
                <p className="homepage-product-title">Title</p>
                <p className="homepage-product-price">Price</p>
              </a>
            </div>

            <div className="homepage-product-card">
              <a href="#">
                <i className="fa fa-heart cart" aria-hidden="true"></i>
                <img alt="Product Image" />
                <p className="homepage-product-title">Title</p>
                <p className="homepage-product-price">Price</p>
              </a>
            </div>

            <div className="homepage-product-card">
              <a href="#">
                <i className="fa fa-heart cart" aria-hidden="true"></i>
                <img alt="Product Image" />
                <p className="homepage-product-title">Title</p>
                <p className="homepage-product-price">Price</p>
              </a>
            </div>
          </div>
        </div>
        <div className="homepage-small-product-box">
          <div className="homepage-product-row">
            <div className="homepage-product-card">
              <a href="#">
                <i className="fa fa-heart cart" aria-hidden="true"></i>
                <img alt="Product Image" />
                <p className="homepage-product-title">Title</p>
                <p className="homepage-product-price">Price</p>
              </a>
            </div>

            <div className="homepage-product-card">
              <a href="#">
                <i className="fa fa-heart cart" aria-hidden="true"></i>
                <img alt="Product Image" />
                <p className="homepage-product-title">Title</p>
                <p className="homepage-product-price">Price</p>
              </a>
            </div>

            <div className="homepage-product-card">
              <a href="#">
                <i className="fa fa-heart cart" aria-hidden="true"></i>
                <img alt="Product Image" />
                <p className="homepage-product-title">Title</p>
                <p className="homepage-product-price">Price</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;