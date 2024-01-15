import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from '../../api/axiosConfig'
import './ProductPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar, faStarHalfAlt as SolidHalfStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regulerStar} from '@fortawesome/free-regular-svg-icons';
import AuthService from '../../service/AuthService';
import { jwtDecode } from 'jwt-decode';

import SwiperCore from "swiper";
import { Swiper, SwiperSlide} from 'swiper/react';
import { Navigation, Pagination} from 'swiper/modules'
import 'swiper/css';
import "swiper/css/navigation"
import "swiper/css/pagination"
//import 'swiper/css/navigation'
//import 'swiper/css/pagination'


SwiperCore.use([Navigation])

const ProductDetails = () => {

    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [comments, setComments] = useState([]);
    const [averageRating, setAverageRating] = useState(null);

    const [currentUser, setCurrentUser] = useState(undefined);
    const [userDetails, setUserDetails] = useState([]);
    useEffect(() => {
        const fetchUserData = async () => {
            const user = AuthService.getCurrentUser();
    
            if (user) {
                setCurrentUser((prevUser) => {
                    if (prevUser !== user) {
                        return user;
                    }
                    return prevUser;
                });
                console.log(user);
                try {
                    const response = await axios.get(`/api/v1/users/email/${jwtDecode(user.token).sub}`);
                    setUserDetails(response.data);
                } catch (error) {
                    console.error('Error getting user: ', error);
                }
            }
        };
        fetchUserData();
    }, []);

    useEffect(() => {
        axios.get(`/api/v1/products/${id}`)
            .then((productResponse) => {
                const productData = productResponse.data;
                setProduct(productData);
            })
            .catch((error) => {
                console.error('Error fetching product:', error);
            });

        axios.get(`/api/v1/productPhotos/product/${id}`)
            .then((photosResponse) => {
                const photosData = photosResponse.data;
                setPhotos(photosData);
            })
            .catch((error) => {
                console.error('Error fetching photos:', error);
            });
    }, [id]);

    useEffect(() => {
        if (product && product.seller) {
            axios.get(`/api/v1/comments/user/${product.seller.id}`)
                .then((commentsResponse) => {
                    const commentsData = commentsResponse.data;
                    setComments(commentsData);
                })
                .catch((error) => {
                    console.error('Error fetching comments:', error);
                });
        }        
    }, [product]);

    useEffect(() => {
        if (comments.length > 0) {
            const sumOfRatings = comments.reduce((total, comment) => total + comment.rating, 0);
            const avgRating = sumOfRatings / comments.length;
            setAverageRating(avgRating);
        }
        else{
            setAverageRating(-1);
        }
    }, [comments]);

    if (!product || photos.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="main-box">
            <div className="images-box">
                <Swiper
                    className="swiper"
                    spaceBetween={50}
                    slidesPerView={1}
                    loop={true}
                    navigation={{ clickable: true }}
                    pagination={{ clickable: true }}
                    modules={[Pagination]}
                >
                    {photos.map((photo, index) => (
                        <SwiperSlide className="swiper-slide" key={index}>
                            <img 
                            className="image"
                            src={`data:image/jpeg;base64,${photo}`}
                            alt={`Product Image ${index + 1}`}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="details-box">
                <div className="product-title">
                    <p>{product.name}</p>
                </div>
                <div className="product-details-box">
                    <p className="date">Posted on: {product.createdDate}</p>
                    <p className="product-price">{product.price}$</p>
                    <p className="product-details">{product.description}</p>
                    <div className="container">
                        <div className="product-state">
                            <p>State: {product.state.stateString}</p>
                        </div>
                        <div className="delivery-details">
                        <p>
                            {product.buyerPayingDelivery
                                ? <span>Buyer pays delivery</span>
                                : <span>Seller pays delivery</span>
                            }
                        </p>
                        </div>
                        {currentUser ? (
                            <div className="delivery-location">
                                <p>Seller location: {product.seller.city}, {product.seller.country}</p>
                            </div>
                        ) : (
                            <div className="delivery-location">
                                <p>Seller location: Create an account to see</p>
                            </div>
                        )}
                        
                    </div>
                    
                </div>
                {currentUser ? (
                    <div className="seller-details-box">
                    <div className="seller-names-box">
                        <a className="seller-names" href={`/user/${product.seller.id}`}> {product.seller.first_name} {product.seller.last_name}</a>
                        <p className="date">Active on SellBy since {product.seller.createdDate}</p>
                    </div>
                    <div className="seller-rating-box">
                        {comments.length === 0 ? (
                            <p className="no-rating-text">The user doesn't have any comments yet</p>
                        ) : (
                            <>
                                <div className="star">
                                    <FontAwesomeIcon icon={solidStar} size="3x" />
                                </div>
                                <div className="star">
                                    {averageRating < 1.25 && <FontAwesomeIcon icon={regulerStar} size="3x" />}
                                    {averageRating >= 1.25 && averageRating < 1.75 && <FontAwesomeIcon icon={SolidHalfStar} size="3x" />}
                                    {averageRating >= 1.75 && <FontAwesomeIcon icon={solidStar} size="3x" />}
                                </div>
                                <div className="star">
                                    {averageRating < 2.25 && <FontAwesomeIcon icon={regulerStar} size="3x" />}
                                    {averageRating >= 2.25 && averageRating < 2.75 && <FontAwesomeIcon icon={SolidHalfStar} size="3x" />}
                                    {averageRating >= 2.75 && <FontAwesomeIcon icon={solidStar} size="3x" />}
                                </div>
                                <div className="star">
                                    {averageRating < 3.25 && <FontAwesomeIcon icon={regulerStar} size="3x" />}
                                    {averageRating >= 3.25 && averageRating < 3.75 && <FontAwesomeIcon icon={SolidHalfStar} size="3x" />}
                                    {averageRating >= 3.75 && <FontAwesomeIcon icon={solidStar} size="3x" />}
                                </div>
                                <div className="star">
                                    {averageRating < 4.25 && <FontAwesomeIcon icon={regulerStar} size="3x" />}
                                    {averageRating >= 4.25 && averageRating < 4.75 && <FontAwesomeIcon icon={SolidHalfStar} size="3x" />}
                                    {averageRating >= 4.75 && <FontAwesomeIcon icon={solidStar} size="3x" />}
                                </div>
                                <Link to={`/user/${product.seller.id}`}>{comments.length} Comments</Link>
                            </>
                        )}
                    </div>
                    <div className="contact-box">
                        <div className="seller-email">
                            <p>{product.seller.email}</p>
                        </div>
                        <div className="seller-phone">
                            <p>{product.seller.number}</p>
                        </div>
                    </div>
                </div>
                ) : (
                    <div className="no-seller-details-box">
                        <p>Login to see user details!</p>
                    </div>
                )}
                
            </div>
        </div>
    );
};

export default ProductDetails;