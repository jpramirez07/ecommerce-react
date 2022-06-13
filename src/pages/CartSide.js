import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { buy } from '../store/Slices/cart.slice';
import '../Styles/CartSide.css'

const CartSide = () => {

    const cartProducts = useSelector(state => state.Cart)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    console.log(cartProducts)


    return (
        <div className='body-cart'>
            <h1>Cartside</h1>
            <div className='body-cart-side'>
                {
                    cartProducts.map(product => (
                        <div style={{ cursor: "pointer" }} className='card cart-side' key={product.id} onClick={() => navigate (`/Products/${product.id}`)}>
                            <div className='description'>
                                <h2>{product.title}</h2>
                                <p>Price</p>
                                <p><b>$ {product.price}</b></p>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='div-btn' style={{ cursor: "pointer" }} onClick={() => dispatch(buy())}>
                <button style={{ cursor: "pointer" }} onClick={() => dispatch(buy())}>
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default CartSide;