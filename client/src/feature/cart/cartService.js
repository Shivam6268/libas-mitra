import axios from "axios"

const API_URL = "/api/cart"

// ADD ITEM 

const addToCart = async (token, cartData) => {

    let options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    let response = await axios.post(API_URL, cartData, options)
    return response.data
}


// GET ITEM 

const fetchItem = async (token) => {

    let options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    let response = await axios.get(API_URL, options)
    return response.data
}

// REMOVE ITEM 

const removeItem = async (token, productId) => {

    let options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    let response = await axios.delete("/api/cart/" + productId, options)
    return response.data
}

// UPDATE CART ITEM 

const updateCartItem = async(token, cartData) => {

    let options = {
        headers:{
            authorization: `Bearer ${token}`
        }
    }
    
    let response = await axios.put(API_URL, cartData, options)
    return response.data
    
}


// APPLY COUPON CART  

const applyCoupon = async(token, couponCode) => {

    let options = {
        headers:{
            authorization: `Bearer ${token}`
        }
    }

    
    let response = await axios.post("/api/coupon", couponCode, options)
    return response.data
    
}

const cartService = {addToCart, fetchItem, removeItem, updateCartItem, applyCoupon}

export default cartService