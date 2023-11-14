import React from 'react';
import axios from '../../api/axiosConfig';
import './AddProductPage.css';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';


const AddProductPage = () => {
    return(
        <div className="page-container">
            <div className="main-container">
                <form action="/addProduct" method="post">
                    <div className="small-container">
                        <div className="name-container">
                            <input name="name" type="text" placeholder="Name" required/>
                        </div>
                        <div className="price-container">
                            <input name="price" type="number" placeholder="Price" step="0.01" min="0" required/>
                        </div>
                    </div>
                    <div className="small-container">
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Category
                            </InputLabel>
                            <NativeSelect
                            defaultValue={30}
                            inputProps={{
                                name: 'age',
                                id: 'uncontrolled-native',
                            }}
                            >
                            <option value={"Art"}>Art</option>
                            <option value={"Baby"}>Baby</option>
                            <option value={"Books"}>Books</option>
                            <option value={"BusinessAndIndustrial"}>Business & Industrial</option>
                            <option value={"CamerasAndPhotos"}>Cameras & Photos</option>
                            <option value={"Electronics"}>Electronics</option>
                            <option value={"ClothingShoesAndAccessories"}>Clothing, Shoes & Accessories</option>
                            <option value={"HomeAndGarden"}>Home & Garden</option>
                            <option value={"JewelryAndWatches"}>Jewelry & Watches</option>
                            <option value={"MusicMusicalInstrumentsAndGear"}>Music, Musical instruments & Gear</option>
                            <option value={"PetSupplies"}>Pet Supplies</option>
                            <option value={"SportingGoods"}>Sporting Goods</option>
                            <option value={"ToysAndHobbies"}>Toys & Hobbies</option>
                            <option value={"Travel"}>Travel</option>
                            <option value={"VideoGamesAndConsoles"}>Video Games & Consoles</option>
                            </NativeSelect>
                        </FormControl>
                    </Box>

                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            State
                            </InputLabel>
                            <NativeSelect
                            defaultValue={30}
                            inputProps={{
                                name: 'age',
                                id: 'uncontrolled-native',
                            }}
                            >
                            <option value={"LIKE_NEW"}>Like new</option>
                            <option value={"GOOD"}>Good</option>
                            <option value={"OKAY"}>Okay</option>
                            <option value={"BAD"}>Bad</option>
                            </NativeSelect>
                        </FormControl>
                    </Box>
                    </div>
                    <div className="description-container">
                        <textarea name="description" type="text" placeholder="Description" rows="4" required/>
                    </div>
                    <div className="small-container">
                        <div className="delivery-container">
                            <input name="delivery" type="radio" value=""/>
                            <div className="radio-button-title">
                                <label for="buyerPaysDelivery">Buyer pays delivery</label>
                            </div>
                        </div>
                        <div className="delivery-container">
                            <input name="delivery" type="radio" value=""/>
                            <div className="radio-button-title">
                                <label for="sellerPaysDelivery">Seller pays delivery</label>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="submit-button">Add product</button>
                </form>
            </div>
        </div>
    )
};

export default AddProductPage;


