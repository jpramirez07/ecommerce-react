import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { filterCategories, filterProducts, getProducts } from '../store/Slices/products.slice';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import axios from "axios"

const Home = () => {

    const dispatch = useDispatch()

    const products = useSelector(state => state.products)

    const navigate = useNavigate()

    const [search, setSearch] = useState("")
    const [categories, setCategories] = useState([])

    useEffect(() => {
        dispatch(getProducts())

        axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/products/categories")
            .then(res => setCategories(res.data.data.categories))
    }, [dispatch])

    const filterQuery = () => {
        dispatch(filterProducts(search))
    }

    const selectCategories = (id) => {
        dispatch(filterCategories(id))
    }

    return (
        <div>
            <h1>Home</h1>
            <h2>Categories</h2>
            <ul>
                {
                        categories.map( category => (
                            <li 
                                style={{cursor:"pointer"}} 
                                onClick={() => selectCategories(category.id)} 
                                key={category.id} 
                                >
                                    {category.name}
                            </li>
                        ))
                }
            </ul>
            <input 
                type="text"
                onChange={e => setSearch(e.target.value)}
                value={search}
            />
            <button onClick={filterQuery}>buscar</button>
            <div>
                {
                    products.map((product) => (
                        <div key={product.id} onClick={() => navigate(`/products/${product.id}`)} style={{cursor: "pointer"}}>
                            <img src={product.productImgs?.[0]} alt="" /> 
                            <h2>{product.title }</h2>
                            <p>{product.description}</p>
                            <p>{product.price}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Home;