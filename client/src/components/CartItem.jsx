import React from 'react'
import {useDispatch} from "react-redux"
import { removeCartItems, updateItemToCart } from '../feature/cart/cartSlice'

export const CartItem = ({item}) => {

    const {image, name, category, size, salePrice} = item.product
    const dispatch = useDispatch()

    const handleRemoveItem = (productId) => {
        dispatch(removeCartItems(productId))
    }


    const handleUpdateItem = cartData => {

        if(cartData.qty <= 0){
            dispatch(removeCartItems(cartData.productId))
        }
        else{
            dispatch(updateItemToCart(cartData))
        }
    }
  
    return (
        <div className="bg-white rounded-3xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col sm:flex-row gap-6">
                 <div style={{ backgroundImage: `url(${image})` }} className="w-full sm:w-32 h-40 rounded-2xl flex-shrink-0 bg-cover bg-center"></div> 

                <div className="flex-1">
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <h3 className="text-lg font-bold text-neutral-900 mb-1">{name}</h3>
                            <p className="text-sm text-gray-600">{category}</p>
                        </div>
                        <button onClick={() => handleRemoveItem(item.product._id)} className="text-gray-400 hover:text-red-500 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                        <div>
                            <p className="text-xs text-gray-500 mb-1">Size</p>
                            <p className="text-sm font-semibold text-neutral-900">{size.toUpperCase()}</p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="flex items-center border-2 border-gray-300 rounded-xl overflow-hidden">
                            <button onClick={() => handleUpdateItem({productId: item.product._id, qty: item.qty - 1})}  className="px-4 py-2 hover:bg-gray-100 transition-colors">
                                <span className="text-lg font-semibold">−</span>
                            </button>
                            <span className="px-4 py-2 font-semibold text-neutral-900 border-x-2 border-gray-300">{item.qty}</span>
                            <button onClick={() => handleUpdateItem({productId: item.product._id, qty: item.qty + 1})}  className="px-4 py-2 hover:bg-gray-100 transition-colors">
                                <span className="text-lg font-semibold">+</span>
                            </button>
                        </div>
                        <p className="text-2xl font-bold text-neutral-900">₹{salePrice}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
