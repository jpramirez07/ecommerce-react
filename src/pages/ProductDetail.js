import React, { useEffect, useState } from 'react';
import axios from "axios"
import {useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { filterCategories } from '../store/Slices/products.slice';

const ProductDetail = () => {

    const [product, setProduct] = useState({})

    const {id} = useParams()

    const productsList = useSelector(state => state.products)
    const dispatch = useDispatch()

    useEffect(() => {
        axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/`)
            .then(res => {
                const productSearched = res.data.data.products.find(productItem => productItem.id === Number(id))
                setProduct(productSearched)
                dispatch(filterCategories(productSearched.category.id))
                console.log(productSearched)
            })
    }, [dispatch, id])

    return (
        <div>
            <h1>Product detail</h1>
            <h3>{product?.title}</h3>
            <p>{product.category?.name}</p>
            <p>{product?.price}</p>
            <h2>Similar items</h2>
            {
                productsList?.map(productsItem => (
                    <li key={productsItem.id}>{productsItem.title}</li>
                ))
            }
        </div>
    );
};

export default ProductDetail;