import axios from "axios"

let FETCH_API = "/api/admin"

// all Users
const fetchAllUser = async (token) => {

    let options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(FETCH_API + "/users", options)

    return response.data
}


// all Orders

const fetchAllOrders = async (token) => {

    let options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(FETCH_API + "/orders", options)

    return response.data
}


// Update Orders

const updateOrder = async (orderData, token) => {

    console.log(orderData)

    let options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(FETCH_API + "/orders/" + orderData.orderId, orderData, options)

    return response.data
}


// update user 

const updateUser = async (userData, token) => {

    let options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }


    const response = await axios.put(FETCH_API + "/users/" + userData.userId, userData, options)

    return response.data
}

// ADD PRODUCT 

const createProduct = async (formData, token) => {
    let options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }


    const response = await axios.post(FETCH_API + "/product/add", formData, options)
    return response.data

}

// UPDATE PRODUCT 

const updateProduct = async (formData, productId, token) => {

    console.log(productId)

    let options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }


    const response = await axios.put(FETCH_API + "/product/" + productId, formData, options)
    return response.data

}


// Get Products 

const getProducts = async () => {
    const response = await axios.get("/api/products")
    return response.data
}

// Get Coupon 

const getCoupon = async (token) => {

    let options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(FETCH_API + "/coupon/", options)
    return response.data
}

// Create Coupon 

const createCoupon = async (couponData, token) => {


    const options = {
        headers: {
            authorization: `Bearer ${couponData, token}`
        }
    }

    const response = await axios.post(FETCH_API + "/coupon/add", couponData, options)
    return response.data
}

// GET All REVIEWS 

const getAllReviews = async (token) => {


    const options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(FETCH_API + "/reviews", options)
    return response.data
}


const adminService = { fetchAllUser, fetchAllOrders, updateUser, getProducts, createProduct, updateProduct, updateOrder, getCoupon, createCoupon, getAllReviews }

export default adminService