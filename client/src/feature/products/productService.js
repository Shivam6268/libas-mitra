import axios from "axios"

const API_URL = '/api/products'

const fetchAllProducts = async () => {
    let response = await axios.get(API_URL)
    return response.data
}


const fetchProduct = async (pid) => {

    let response = await axios.get(API_URL + "/" + pid)
    return response.data
}


const fetchProductReviews = async (pid) => {

    let response = await axios.get(API_URL + "/" + pid + "/" + "review")
    return response.data
}

const createProductReviews = async (token, reviewData) => {


     let options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }


    const response = await axios.post(API_URL + "/" + reviewData._id + "/review", reviewData, options)
   console.log(response.data)
    return response.data
}



const productService = {fetchAllProducts, fetchProduct, fetchProductReviews,createProductReviews}

export default productService
