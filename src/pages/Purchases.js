import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import PurchaseItem from '../components/PurchaseItem';
import { getPurchases } from '../store/Slices/purchases.slice';
import '../Styles/Purchases.css'

const Purchases = () => {

    const dispatch = useDispatch()

    const purchases = useSelector(state => state.purchases)

    useEffect(() => {
        dispatch(getPurchases())
    }, [dispatch])


    return (
        <div className='body-purchases'>
            <h1>My purchases</h1>
            <div className='container-cardpurchases'>
                {
                    purchases.length ? (
                        purchases.map(purchase => (
                            <PurchaseItem purchase={purchase} key={purchase.id} />
                        ))
                    ) : (
                        <p>Cart is empty</p>
                    )
                }
            </div>
        </div>
    );
};

export default Purchases;