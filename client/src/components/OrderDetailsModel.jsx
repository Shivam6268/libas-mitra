import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loder from './Loder'


const OrderDetailsModel = ({handleShowOrder}) => {

     const { order, orderError, orderLoading, orderErrorMessage } = useSelector(state => state.order)

    let subTotal = order.products.reduce((acc, product) => acc + product.product.salePrice * product.qty, 0)

     useEffect(() => {


        if (orderError && orderErrorMessage) {
            toast.error(couponErrorMessage, { position: "top-center" })
        }


    }, [orderError, orderErrorMessage])


    if (orderLoading) {
        return (
            <Loder loadingMessage={"Getting Orders"} />
        )
    }



    


    return (
        <div className="absolute top-25 right-15 md:right-40 z-40 w-4/5 bg-white rounded-2xl shadow-md p-6 mb-12">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
                <button onClick={() => handleShowOrder(null)} className="text-gray-500 hover:text-gray-900 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500 mb-1">Order ID</p>
                    <p className="font-semibold text-gray-900">#{order._id}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500 mb-1">Order Date</p>
                    <p className="font-medium text-gray-900">{new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500 mb-1">Status</p>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {order.status}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="border border-gray-200 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Shipping Address</h3>
                    <p className="text-gray-600 text-sm">{order.user.name}</p>
                    <p className="text-gray-600 text-sm">{order.shippingAddress}</p>
                </div>
                <div className="border border-gray-200 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Payment Method</h3>
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-gray-900 font-medium">Visa ending in 4242</p>
                            <p className="text-gray-500 text-sm">Expires 12/25</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Order Items</h3>
                <div className="space-y-4">
                    {
                        order.products.map(item => {
                            return (
                                <div key={item._id} className="flex items-center space-x-4 pb-4 border-b border-gray-100">
                                    <div style={{ backgroundImage: `url(${item.product.image})` }} className="w-20 h-20 sm:w-24 sm:h-24 bg-cover bg-center rounded-lg flex-shrink-0"></div>
                                    <div className="flex-grow">
                                        <h4 className="font-semibold text-gray-900 mb-1">{item.product.name}</h4>
                                        <p className="text-sm text-gray-600 mb-1">Size: {item.product.size.toUpperCase()}</p>
                                        <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-gray-900"> ₹ {item.product.salePrice}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="mt-6 space-y-2">
                    <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>₹{subTotal}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span>₹0.00</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        {order.isDescounted ? <span> - ₹{subTotal - order.totalBillAmount}</span> : <span>₹0.00</span>}
                    </div>
                    <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-200">
                        <span>Total</span>
                        <span>₹{order.totalBillAmount} </span>
                    </div>
                </div>
            </div>
        </div>

    )

}

export default OrderDetailsModel