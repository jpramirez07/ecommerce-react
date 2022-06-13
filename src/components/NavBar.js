import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCart } from '../store/Slices/cart.slice';
import '../Styles/NavBar.css'


const NavBar = () => {

    const logout = () => localStorage.setItem("token", "")
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getCart())
    }, [dispatch])

    return (
        <nav>
            <div className='links'>
                <Link className='e-commerce' to="/">e-commerce</Link>
            </div>
            <div className='links'>
                <Link to="/Login">
                    <i class="fa-solid fa-user icons"></i>
                </Link>
                <Link to="/Purchases">
                    <i class="fa-solid fa-box-archive icons"></i>
                </Link>
                <Link to="/Cart">
                    <i class="fa-solid fa-cart-shopping icons"></i>
                </Link>
            <button onClick={logout} style={{cursor: "pointer"}}><i class="fa-solid fa-right-from-bracket icons"></i></button>
            </div>
        </nav>
    );
};

export default NavBar;