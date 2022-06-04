import React, { Component } from 'react';
import axios from 'axios';

import { useState, useEffect } from 'react';
import CollectionItem from './Items';
import CustomerNavbar from '../CustomerNavbar';
import { Link } from 'react-router-dom';

const PAGE_PRODUCT = 'products';
const PAGE_CART = 'cart';
const PAGE_WISHLIST = 'wishlist';
let price = 0;


function cusStock() {
    const [cart, setCart] = useState([]);
    const [wishList, setWishList] = useState([]);
    const [page, setPage] = useState('products');

    const handleClick = (item) => {
        setCart([...cart, item])
    }

    const handleWishClick = (item) => {
        setWishList([...wishList, item])
    }


    const [stockList, setStock] = useState([]);

    const url = 'http://localhost:3000/store/';

    useEffect(() => {
        function getStock() {
            axios.get(url).then((res) => {
                setStock(res.data);
            }).catch((err) => {
                alert(err);
            });
        }
        getStock();
    }, [])


    const renderProduct = () => (
        <div>
            <div>
                <h1>View Items</h1>
                {stockList.map((item) => (
                    <CollectionItem key={item.id} item={item} handleClick={handleClick} handleWishClick={handleWishClick} />
                ))}
            </div>
        </div>
    );

    function priceDisplay() {
        for (let i = 0; i < cart.length; i++) {
            price += cart[i].price;
        }
        console.log(price);
        alert(`Your Price is ${price}
            And Thank you
        `)

    }

    const renderCart = () => {

        return (
            <div>
                <div>
                    <h1>Cart</h1>
                    <div style={{ marginLeft: '690px' }}>
                        <button className='btn btn-primary' onClick={priceDisplay}>Purchase</button>
                        <button className='btn btn-primary' onClick={() => navigateTo(PAGE_PRODUCT)} >Go Back</button><br /><br /><br />
                    </div>

                    {cart.map((item, idx) => (
                        <div style={{ width: '18rem', display: 'inline-flex' }} >
                            <span className='card m-4 bg-dark '>
                                <h3 style={{ color: 'white' }}>Item Name: {item.name}</h3>
                                <h4 style={{ color: 'white' }}>Item Price: ${item.price}</h4>

                                <div className='image' style={{ backgroundImage: `url(${item.imageUrl})`, height: '200px', width: '200px', marginLeft: '19px' }}></div>
                            </span>
                        </div>

                    ))}
                </div>
            </div>
        )

    }

    const renderWishList = () => (
        <div>
            <div>
                <h1>WishList</h1><br />
                <button className='btn btn-primary' style={{ marginLeft: '730px' }} onClick={() => navigateTo(PAGE_PRODUCT)} >Go Back</button><br />
                {wishList.map((item, idx) => (
                    <div style={{ width: '18rem', display: 'inline-flex' }} >
                        <span style={{ display: 'flex' }} className='card m-4 bg-dark '>
                            <h3 style={{ color: 'white' }}>Item Name: {item.name}</h3>
                            <h4 style={{ color: 'white' }}>Item Price: ${item.price}</h4>
                            <div className='image' style={{ backgroundImage: `url(${item.imageUrl})`, height: '200px', width: '200px', marginLeft: '19px' }}></div>
                        </span>
                    </div>

                ))}
            </div>
        </div>
    )

    const navigateTo = (nxtPage) => {
        setPage(nxtPage);
    }

    return (
        <div>
            <CustomerNavbar />
            <header style={{ marginLeft: '40%' }}>
                <button className='btn btn-dark m-3' onClick={() => navigateTo(PAGE_CART)}>Go to cart  {cart.length}</button>
                <button className='btn btn-dark' onClick={() => navigateTo(PAGE_WISHLIST)}>Go to WishList  {wishList.length}</button>
            </header>
            {page === PAGE_PRODUCT && renderProduct()}
            {page === PAGE_CART && renderCart()}
            {page === PAGE_WISHLIST && renderWishList()}

        </div>

    )
}

export default cusStock;
