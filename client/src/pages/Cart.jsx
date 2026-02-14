
import { useEffect } from 'react';
import { CartItem } from '../components/CartItem';
import OrderSummery from '../components/OrderSummery';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import Loder from "../components/Loder"
import { getCartItems } from '../feature/cart/cartSlice';
import {Link} from "react-router-dom"

const Cart = () => {

    const { cart, cartLoading, cartError, cartErrorMessage } = useSelector(state => state.cart)

    const dispatch = useDispatch()

    useEffect(() => {

        if (!cart) {
            dispatch(getCartItems())
        }

        if (cartError && cartErrorMessage) {
            toast.error(cartErrorMessage, { position: 'top-center' })
        }

    }, [cartError, cartErrorMessage, cart])


    if (!cart || cartLoading) {
        return (
            <Loder loadingMessage={"Cart Is Loading..."} />
        )
    }


    return (
        <div className="min-h-screen bg-stone-50">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <nav className="text-sm text-gray-600 mb-6">
                    <span>Home</span> <span className="mx-2">/</span>
                    <span className="text-neutral-900 font-medium">Shopping Cart</span>
                </nav>

                <h2 className="text-4xl font-bold text-neutral-900 mb-8">Your Cart</h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="space-y-4">
                            {cart?.products?.map((item) => (
                                <CartItem key={item.product._id} item={item} />
                            ))}
                        </div>

                        <Link to="/collections" className="mt-6 text-violet-600 font-semibold hover:text-violet-700 transition-colors flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Continue Shopping
                        </Link>
                    </div>
                    <OrderSummery cart={cart} />
                </div>
            </div>
        </div>
    );
}

export default Cart;
