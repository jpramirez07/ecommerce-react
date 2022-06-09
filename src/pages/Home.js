import React, { useEffect } from 'react';
import { getProducts } from '../store/Slices/products.slice';
import { useDispatch } from 'react-redux/es/exports';

const Home = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProducts())
    },[])

    return (
        <div>
            <h1>Home</h1>
        </div>
    );
};

export default Home;