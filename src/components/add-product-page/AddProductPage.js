import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import axios from '../../api/axiosConfig';
import './AddProductPage.css';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

const AddProductPage = () => {

    const [images, setImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    function selectFiles(){
        fileInputRef.current.click();
    }

    function onFileSelect(event){
        const files = event.target.files;
        if (files.length === 0) return;
        for (let i = 0; i < files.length; i++){
            if (files[i].type.split('/')[0] !== 'image') continue;
            if (!images.some((e) => e.name === files[i].name)){
                setImages((prevImages) => [
                    ...prevImages,
                    {
                        name: files[i].name,
                        url: URL.createObjectURL(files[i]),
                    },
                ]);
            }
        }
    }

    function deleteImage(index){
        setImages((prevImages) => 
            prevImages.filter((_, i) => i !== index)
        );
    }
    function onDragOver(event){
        event.preventDefault();
        setIsDragging(true);
        event.dataTransfer.dropEffect = "copy";
    }

    function onDragLeave(event){
        event.preventDefault();
        setIsDragging(false);
    }

    function onDrop(event){
        event.preventDefault();
        setIsDragging(false);
        const files = event.dataTransfer.files;
        for (let i = 0; i < files.length; i++){
            if (files[i].type.split('/')[0] !== 'image') continue;
            if (!images.some((e) => e.name === files[i].name)){
                setImages((prevImages) => [
                    ...prevImages,
                    {
                        name: files[i].name,
                        url: URL.createObjectURL(files[i]),
                    },
                ]);
            }
        }
    }

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        sellerId: 1, //use current user id
        stateId: 1,
        categoryId: 1,
        buyerPayingDelivery: true
    });

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'radio' ? (value === 'true') : (type === 'checkbox' ? checked : value);
    
        setFormData({
            ...formData,
            [name]: newValue
        });
    };

    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/v1/products', formData);
            
            navigate(`/product/${response.data.id}`);
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return(
        <div className="page-container">
            <div className="main-container">
                 <form onSubmit={handleSubmit}>
                    <div className="small-container">
                        <div className="name-container">
                            <input name="name" type="text" placeholder="Name" value={formData.name} onChange={handleChange} required/>
                        </div>
                        <div className="price-container">
                            <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} step="0.01" min="0" required/>
                        </div>
                    </div>
                    <div className="small-container">
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Category
                            </InputLabel>
                            <NativeSelect
                            defaultValue={1}
                            onChange={handleChange}
                            name="categoryId"
                            >
                            <option value={1}>Art</option>
                            <option value={2}>Baby</option>
                            <option value={3}>Books</option>
                            <option value={4}>Business & Industrial</option>
                            <option value={5}>Cameras & Photos</option>
                            <option value={6}>Electronics</option>
                            <option value={7}>Clothing, Shoes & Accessories</option>
                            <option value={8}>Home & Garden</option>
                            <option value={9}>Jewelry & Watches</option>
                            <option value={10}>Music, Musical instruments & Gear</option>
                            <option value={11}>Pet Supplies</option>
                            <option value={12}>Sporting Goods</option>
                            <option value={13}>Toys & Hobbies</option>
                            <option value={14}>Travel</option>
                            <option value={15}>Video Games & Consoles</option>
                            </NativeSelect>
                        </FormControl>
                    </Box>

                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            State
                            </InputLabel>
                            <NativeSelect
                            defaultValue={1}
                            onChange={handleChange}
                            name="stateId"
                            >
                            <option value={1}>Like new</option>
                            <option value={2}>Good</option>
                            <option value={3}>Okay</option>
                            <option value={4}>Bad</option>
                            </NativeSelect>
                        </FormControl>
                    </Box>
                    </div>
                    <div className="description-container">
                        <textarea name="description" type="text" placeholder="Description" rows="4" value={formData.description} onChange={handleChange} required/>
                    </div>
                    <div className="small-container">
                        <div className="delivery-container">
                            <input name="buyerPayingDelivery" type="radio" value="true" checked={formData.buyerPayingDelivery === true} onChange={handleChange}/>
                            <div className="radio-button-title">
                                <label for="buyerPaysDelivery">Buyer pays delivery</label>
                            </div>
                        </div>
                        <div className="delivery-container">
                            <input name="buyerPayingDelivery" type="radio" value="false" checked={formData.buyerPayingDelivery === false} onChange={handleChange}/>
                            <div className="radio-button-title">
                                <label for="sellerPaysDelivery">Seller pays delivery</label>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="drag-area" onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
                            {isDragging ? (
                                <span className="select">Drop images here</span>
                            ) : (
                                <>
                                    Drag & Drop image here or {" "}
                                    <span className="select" role="button" onClick={selectFiles}>Browse</span>
                                </>
                            )}
                            <input name="file" type="file" className="file" multiple ref={fileInputRef} onChange={onFileSelect}/>
                        </div>
                        <div className="container">
                            {images.map((images, index) => (
                                <div className="image" key={index}>
                                    <span className="delete" onClick={() => deleteImage(index)}>&times;</span>
                                    <img src={images.url} alt={images.name}/>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button type="submit" className="submit-button">Add product</button>
                </form>
            </div>
        </div>
    )
};

export default AddProductPage;


