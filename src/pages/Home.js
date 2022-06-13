import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { filterCategories, filterProducts, getProducts } from '../store/Slices/products.slice';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import axios from "axios"
import '../Styles/Home.css'

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
            <form className='search'>
                <input
                    type="text"
                    onChange={e => setSearch(e.target.value)}
                    value={search}
                />
                <div>
                    <button className='btn-search' onClick={filterQuery}>
                        <i class="fa-solid fa-magnifying-glass search-icon"></i>
                    </button>
                </div>
            </form>
            <div className='body-home'>
                <div className='body-categories'>
                    <h2>Categories</h2>
                    <ul>
                        {
                            categories.map(category => (
                                <li
                                    style={{ cursor: "pointer" }}
                                    onClick={() => selectCategories(category.id)}
                                    key={category.id}
                                >
                                    {category.name}
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className='body-products'>
                    {
                        products.map((product) => (
                            <div className='card' key={product.id} onClick={() => navigate(`/products/${product.id}`)} style={{ cursor: "pointer" }}>
                                <div className='body-img'>
                                    <div className='img-container'>
                                        <img src={product.productImgs?.[0]} alt="" />
                                    </div>
                                </div>
                                <div className='description'>
                                    <h2>{product.title}</h2>
                                    <p>Price</p>
                                    <p><b>$ {product.price}</b></p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;