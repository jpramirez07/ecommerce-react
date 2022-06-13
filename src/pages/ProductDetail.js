import React, { useEffect, useState } from 'react';
import axios from "axios"
import { useNavigate, useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { filterCategories } from '../store/Slices/products.slice';
import { addToCart } from '../store/Slices/cart.slice';
import '../Styles/ProductDetail.css'

const ProductDetail = () => {

    const [product, setProduct] = useState({})
    const [quantity, setQuantity ] = useState(0)

    const { id } = useParams()

    const productsList = useSelector(state => state.products)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/`)
            .then(res => {
                const productSearched = res.data.data.products.find(productItem => productItem.id === Number(id))
                setProduct(productSearched)
                dispatch(filterCategories(productSearched.category.id))
            })
    }, [dispatch, id])

    const addProduct = () => {
        const added = {
            id: id,
            quantity: quantity,
        }
        dispatch(addToCart(added))
    }

    return (
        <div className='body-detail'>
            <h1>{product?.title}</h1>
            <div className='productdetail-body'>
                <div className='imgdetail'>
                    <img src={product.productImgs} alt="" />
                </div>
                <div className='descriptionDetail'>
                    <p><b>Description</b></p>
                    <p>{product.description}</p>
                    <p>Price: <b>{product?.price}</b></p>
                    <input className='input-quantity'
                        type="number"
                        placeholder='quantity'
                        onChange={(e) => setQuantity(e.target.value)}
                        value={quantity}></input>
                    <button style={{cursor:"pointer"}} onClick={addProduct}>
                        <i class="fa-solid fa-cart-shopping cartdetail"></i>
                    </button>
                </div>
            </div>
            <div className='similarItems'>
                <h2>Similar items</h2>
                <div className='body-cardsimilar'>
                {
                    productsList?.map(productsItem => (
                        <div className='card' style={{cursor:"pointer"}} onClick={() => navigate(`/Products/${productsItem.id}`) } key={productsItem.id}>
                            <div className='body-img'>
                                    <div className='img-container'>
                                        <img src={productsItem.productImgs?.[0]} alt="" />
                                    </div>
                                </div>
                                <div className='description'>
                                    <h2>{productsItem.title}</h2>
                                    <p>Price</p>
                                    <p><b>$ {productsItem.price}</b></p>
                                </div>
                        </div>
                    ))
                }
                </div>
            </div>
        </div>
    );
};

export default ProductDetail; 