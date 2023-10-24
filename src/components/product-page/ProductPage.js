import React from 'react';
import './ProductPage.css';

const ProductDetails = () => {
    return (
        <div className="main-box">
            <div className="images-box">
                <img className="main-image"alt="Main Product" />
                <div className="small-images-box">
                    <div className="small-image">
                        <img alt="Product Thumbnail" />
                    </div>
                </div>
            </div>
            <div className="details-box">
                <div className="product-title">
                    <p>Title</p>
                </div>
                <div className="product-details-box">
                    <p className="date">Posted on Date</p>
                    <p className="product-details">Description</p>
                    <div className="product-state">
                        <p>State: State</p>
                    </div>
                    <div className="product-price">
                        <p>Price: Price</p>
                    </div>
                    <div className="delivery-details">
                        <p>
                            <span>Buyer pays delivery</span>
                        </p>
                    </div>
                    <div className="delivery-location">
                        <p>Seller location: City, Country</p>
                    </div>
                </div>
                <div className="seller-details-box">
                    <div className="seller-names-box">
                        <p className="seller-names">Seller Name</p>
                        <p className="date">Active on SellBy since Date</p>
                    </div>
                    <div className="seller-rating-box">
                        <p className="no-rating-text">
                            The user doesn't have any comments yet
                        </p>
                    </div>
                    <div className="seller-rating-box">
                        <div className="star">
                            <i className="fa fa-star fa-2xl"></i>
                        </div>
                        <div className="star">
                            <i className="far fa-star fa-2xl"></i>
                        </div>
                        <div className="star">
                            <i className="fas fa-star-half-alt fa-2xl"></i>
                        </div>
                        <div className="star">
                            <i className="fas fa-star fa-2xl"></i>
                        </div>
                        <div className="star">
                            <i className="far fa-star fa-2xl"></i>
                        </div>
                        <div className="star">
                            <i className="fas fa-star-half-alt fa-2xl"></i>
                        </div>
                        <div className="star">
                            <i className="fas fa-star fa-2xl"></i>
                        </div>
                        <div className="star">
                            <i className="far fa-star fa-2xl"></i>
                        </div>
                        <div className="star">
                            <i className="fas fa-star-half-alt fa-2xl"></i>
                        </div>
                        <div className="star">
                            <i className="fas fa-star fa-2xl"></i>
                        </div>
                        <div className="star">
                            <i className="far fa-star fa-2xl"></i>
                        </div>
                        <div className="star">
                            <i className="fas fa-star-half-alt fa-2xl"></i>
                        </div>
                        <div className="star">
                            <i className="fas fa-star fa-2xl"></i>
                        </div>
                        <div className="star">
                            <i className="far fa-star fa-2xl"></i>
                        </div>
                        <div className="star">
                            <i className="fas fa-star-half-alt fa-2xl"></i>
                        </div>
                        <div className="star">
                            <i className="fas fa-star fa-2xl"></i>
                        </div>
                        <a href="#">Comments</a>
                    </div>
                    <div className="contact-box">
                        <div className="seller-email">
                            <p>Seller Email</p>
                        </div>
                        <div className="seller-phone">
                            <p>Seller Phone</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;