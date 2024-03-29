import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../api/axiosConfig'
import './ProfilePage.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar, faStarHalfAlt as SolidHalfStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regulerStar} from '@fortawesome/free-regular-svg-icons';
import AuthService from '../../service/AuthService';
import { jwtDecode } from 'jwt-decode';


const ProfilePage = () => {

    const { userId } = useParams();
    const [products, setProducts] = useState([]);
    const [comments, setComments] = useState([]);
    const [averageRating, setAverageRating] = useState(null);
    const [viewedUser, setViewedUser] = useState(null);
    const [rating, setRating] = useState(1);
    const [hover, setHover] = useState(null);
    
    const [currentUser, setCurrentUser] = useState(null);
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
            try {
              const currentResponse = await axios.get(`http://localhost:8080/api/v1/users/email/${jwtDecode(user.token).sub}`);
              setUserDetails(currentResponse.data);
      
              // Set sellerId in formData directly
              setFormData((prevFormData) => ({
                ...prevFormData,
                sellerId: currentResponse.data.id,
              }));
              console.log("current user")
              console.log(currentResponse.data.id);
            } catch (error) {
              console.error('Error getting user: ', error);
              console.log(currentUser);
            }
          }
        };
      
        fetchUserData();
      }, []);
    

    const getUser = async () =>{
        try{
            const response = await axios.get(`/api/v1/users/${userId}`);
            setViewedUser(response.data);
            console.log("user")
            console.log(response.data.id);
        } catch (error){
            console.log(error);
        }
    }

    useEffect (() => {
        getUser();
    }, [])

    const [formData, setFormData] = useState({
        rating: 1,
        description: '',
        receiverId: userId, 
        senderId: 2
    });

    useEffect(() => {
        if (userDetails && userDetails.id && viewedUser) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                sellerId: userDetails.id
            }));
        }
    }, [userDetails, viewedUser]);

    useEffect(() => {
        if (viewedUser) {
          axios.get(`/api/v1/products/user/${viewedUser.id}`)
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
        }
      }, [viewedUser]);

      useEffect(() => {
        if (viewedUser){
            axios.get(`/api/v1/comments/user/${viewedUser.id}`)
                .then((commentsResponse) => {
                    const commentsData = commentsResponse.data;
                    setComments(commentsData);
                })
                .catch((error) => {
                    console.error('Error fetching comments:', error);
                });
        }
    }, [viewedUser]);

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

    if (!viewedUser || !userDetails) {
        return <div>Loading...</div>;
    }

    const handleSubmit = async () => {
        formData.rating = rating;
        try{
            await axios.post(`/api/v1/comments`, formData);
            window.location.reload();
        } catch (error){
            console.error('Error adding comment', error);
        }
    }

    return (
        <div className="page-container">
            <div className="details-and-comments-container">
                <div className="user-details-container">
                    <div className="user-names-box">
                        <p className="user-names">{viewedUser.first_name} {viewedUser.last_name}</p>
                        <p className="profile-date">Active on SellBy since {viewedUser.createdDate}</p>
                    </div>
                    <div className="user-rating-container">
                        {comments.length === 0 ? (
                            <p className="no-rating-text">The user does not have any comments yet</p>
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
                            </>
                        )}
                    </div>
                    <div className="contact-box">
                        <div className="seller-email">
                            <p>{viewedUser.email}</p>
                        </div>
                        <div className="seller-phone">
                            <p>{viewedUser.number}</p>
                        </div>
                    </div>
                </div>
                
                {userDetails.id !== viewedUser.id ?(
                    <div className="add-comment-container">
                    <p className="add-comment-text">Add comment about {viewedUser.first_name}</p>
                    <div className="comment-description-container">
                        <textarea name="description" type="text" placeholder="description" rows="4" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required/>
                    </div>
                    <div className="stars-container">
                    {[...Array(5)].map((star, index) => {
                        const currentRating = index + 1;
                        return(
                            <label key={index}>
                                <input
                                    className="comment-radio"
                                    type="radio"
                                    name="rating"
                                    value={currentRating}
                                    onClick={() => setRating(currentRating)}
                                />
                                <div className="add-comment-star">
                                    <FontAwesomeIcon 
                                    icon={solidStar} 
                                    size="3x"
                                    color={currentRating <= (hover || rating) ? "#FFDF00" : "white"}
                                    onMouseEnter={() => setHover(currentRating)}
                                    onMouseLeave={() => setHover(null)}
                                    />
                                </div>
                            </label>
                        );
                    })}
                    </div>
                    <button type="submit" className="submit-button" onClick={handleSubmit}>Submit comment</button>
                </div>
                ) : (
                    <br></br>
                )}
                

                <div className="comments-container">
                    <p className="comment-about-user">{comments.length} comments about {viewedUser.first_name}:</p>
                    {comments.map((comment) => (
                        <div key={comment.id} className="comment-container">
                        <div className="rating-and-date-container">

                            <div className="star">
                                <FontAwesomeIcon icon={solidStar} size="2x"/>
                            </div>

                            <div className="star">
                                {comment.rating < 1.25 && <FontAwesomeIcon icon={regulerStar} size="2x" />}
                                {comment.rating >= 1.25 && comment.rating < 1.75 && <FontAwesomeIcon icon={SolidHalfStar} size="2x" />}
                                {comment.rating >= 1.75 && <FontAwesomeIcon icon={solidStar} size="2x" />}
                            </div>

                            <div className="star">
                                {comment.rating < 2.25 && <FontAwesomeIcon icon={regulerStar} size="2x" />}
                                {comment.rating >= 2.25 && comment.rating < 2.75 && <FontAwesomeIcon icon={SolidHalfStar} size="2x" />}
                                {comment.rating >= 2.75 && <FontAwesomeIcon icon={solidStar} size="2x" />}
                            </div>

                            <div className="star">
                                {comment.rating < 3.25 && <FontAwesomeIcon icon={regulerStar} size="2x" />}
                                {comment.rating >= 3.25 && comment.rating < 3.75 && <FontAwesomeIcon icon={SolidHalfStar} size="2x" />}
                                {comment.rating >= 3.75 && <FontAwesomeIcon icon={solidStar} size="2x" />}
                            </div>

                            <div className="star">
                                {comment.rating < 4.25 && <FontAwesomeIcon icon={regulerStar} size="2x" />}
                                {comment.rating >= 4.25 && comment.rating < 4.75 && <FontAwesomeIcon icon={SolidHalfStar} size="2x" />}
                                {comment.rating >= 4.75 && <FontAwesomeIcon icon={solidStar} size="2x" />}
                            </div>
                            <p className="comment-date">written on: 11.12.2023</p>
                        </div>
                        <div className="comment">
                            <p>{comment.description}</p>
                        </div>
                    </div>
                    ))}
                </div>
            </div>

            <div className="products-container">
                <p className="listed-products-title">{viewedUser.first_name} listed products</p>
                
                {products.map((product) => (
                    <Link key={product.id} className="link" to={`/product/${product.id}`}>
                        <div key={product.id} className="product-container">
                            <img src={`data:image/jpeg;base64,${product.photos[0]}`} className="product-image" alt="Product image" />
                            <div className="product-details">
                                <p className="title">{product.name}</p>
                                <p className="date">Posted on: {product.createdDate}</p>
                                <p className="price">Price: {product.price}$</p>
                            </div>
                        </div>
                    </Link>
                ))}
                
            </div>
        </div>
    );
};

export default ProfilePage;