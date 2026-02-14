import axios from "axios"

const API = "/api/order"

// place order
const placeOrderByUser = async (token, orderDetails) => {

    let options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    let response = await axios.post(API, orderDetails, options)
    return response.data
}

// get order

const getOrderByUser = async (token) => {

    let options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    let response = await axios.get(API, options)
    return response.data
}

// get order

const fetchMyOrder = async (token, orderId) => {

    let options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    let response = await axios.get(`${API}/${orderId}`, options)
    return response.data
}

// cancel order

const cancelMyOrder = async (token, orderId) => {

    let options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }


    let response = await axios.put(`${API}/${orderId}`, options)
    console.log(response.data)
    return response.data
}

const orderService = {placeOrderByUser, getOrderByUser, fetchMyOrder, cancelMyOrder}

export default orderService