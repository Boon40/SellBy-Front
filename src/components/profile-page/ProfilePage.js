import React, { startTransition, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../api/axiosConfig'
import './ProfilePage.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar, faStarHalfAlt as SolidHalfStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regulerStar} from '@fortawesome/free-regular-svg-icons';



const ProfilePage = () => {

    const { userId } = useParams();
    const [products, setProducts] = useState([]);
    const [comments, setComments] = useState([]);
    const [averageRating, setAverageRating] = useState(null);
    const [user, setUser] = useState(null);
    const [rating, setRating] = useState(1);
    const [hover, setHover] = useState(null);
    

    const getUser = async () =>{
        try{
            console.log(userId);
            const response = await axios.get(`/api/v1/users/${userId}`);
            console.log(response.data);
            setUser(response.data);
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
        senderId: 2  //TODO replace with current user's id
    }, [user])

    useEffect(() => {
        if (user){
            axios.get(`/api/v1/products/user/${user.id}`)
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
      }, [user]);

      useEffect(() => {
        if (user){
            axios.get(`/api/v1/comments/user/${user.id}`)
                .then((commentsResponse) => {
                    const commentsData = commentsResponse.data;
                    setComments(commentsData);
                })
                .catch((error) => {
                    console.error('Error fetching comments:', error);
                });
        }
    }, [user]);

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

    if (!user) {
        return <div>Loading...</div>;
    }

    const handleSubmit = async () => {
        formData.rating = rating;
        try{
            const response = await axios.post(`/api/v1/comments`, formData);
        } catch (error){
            console.error('Error adding comment', error);
        }
    }

    return (
        <div className="page-container">
            <div className="details-and-comments-container">
                <div className="user-details-container">
                    <div className="user-names-box">
                        <p className="user-names">{user.first_name} {user.last_name}</p>
                        <p className="profile-date">Active on SellBy since {user.createdDate}</p>
                    </div>
                    <div className="user-rating-container">
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
                            </>
                        )}
                    </div>
                    <div className="contact-box">
                        <div className="seller-email">
                            <p>{user.email}</p>
                        </div>
                        <div className="seller-phone">
                            <p>{user.number}</p>
                        </div>
                    </div>
                </div>

                <div className="add-comment-container">
                    <p className="add-comment-text">Add comment about {user.first_name}</p>
                    <div className="comment-description-container">
                        <textarea name="description" type="text" placeholder="description" rows="4" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required/>
                    </div>
                    <div className="stars-container">
                    {[...Array(5)].map((star, index) => {
                        const currentRating = index + 1;
                        return(
                            <label>
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

                <div className="comments-container">
                    <p className="comment-about-user">{comments.length} comments about {user.first_name}:</p>
                    {comments.map((comment) => (
                        <div className="comment-container">
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
                <p className="listed-products-title">{user.first_name}'s listed products</p>
                
                {products.map((product) => (
                    <Link className="link" to={`/product/${product.id}`}>
                        <div key={product.id} className="product-container">
                            <img src={`/images/${product.photos[0].path}`} className="product-image" alt="Product image" />
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