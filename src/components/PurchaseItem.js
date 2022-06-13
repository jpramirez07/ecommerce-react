import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Purchases.css'

const PurchaseItem = ({purchase}) => {

    const options = {year: "numeric", month:"long", day:"numeric"}

    const date = new Date(purchase.createdAt).toLocaleDateString('en-us', options)

    const navigate = useNavigate()

    return (
      <div className='container-purchases'>
        <div className='date'>
            <b>{date}</b>
        </div>
        <div>
            {purchase.cart.products.map(productItem => (
                <div className='infoitem' style={{cursor:"pointer"}} key={productItem.id} onClick={() => navigate(`/products/${productItem.id}`)} >
                    <div>{productItem.title}</div> <div><b>$ {productItem.price}</b></div>
                </div>
            ))}
        </div>
      </div>
    );
};

export default PurchaseItem;