import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import productService from './productService'


const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        product: {},
        productReviews : [],
        productLoading: false,
        productSuccess: false,
        productError: false,
        productErrorMessage: ""
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

        // GET ALL PRODUCTS
        .addCase(getAllProducts.pending, (state, action) => {
            state.productLoading = true 
            state.productSuccess = false 
            state.productError = false
        })
        .addCase(getAllProducts.fulfilled, (state, action) => {
            state.productLoading = false 
            state.productSuccess = true 
            state.productError = false
            state.products = action.payload
        })
        .addCase(getAllProducts.rejected, (state, action) => {
            state.productLoading = false 
            state.productSuccess = false 
            state.productError = true 
            state.productErrorMessage = action.payload
        })

         // GET  PRODUCT
        .addCase(getProduct.pending, (state, action) => {
            state.productLoading = true 
            state.productSuccess = false 
            state.productError = false
        })
        .addCase(getProduct.fulfilled, (state, action) => {
            state.productLoading = false 
            state.productSuccess = true 
            state.productError = false
            state.product = action.payload
        })
        .addCase(getProduct.rejected, (state, action) => {
            state.productLoading = false 
            state.productSuccess = false 
            state.productError = true 
            state.productErrorMessage = action.payload
        })

         // GET  PRODUCT REVIEWS
        .addCase(getProductAllReviews.pending, (state, action) => {
            state.productLoading = true 
            state.productSuccess = false 
            state.productError = false
        })
        .addCase(getProductAllReviews.fulfilled, (state, action) => {
            state.productLoading = false 
            state.productSuccess = true 
            state.productError = false
            state.productReviews = action.payload
        })
        .addCase(getProductAllReviews.rejected, (state, action) => {
            state.productLoading = false 
            state.productSuccess = false 
            state.productError = true 
            state.productErrorMessage = action.payload
        })

          // ADD  PRODUCT REVIEW
        .addCase(addProductReview.pending, (state, action) => {
            state.productLoading = true 
            state.productSuccess = false 
            state.productError = false
        })
        .addCase(addProductReview.fulfilled, (state, action) => {
            state.productLoading = false 
            state.productSuccess = true 
            state.productError = false
            state.productReviews = [action.payload, ...state.productReviews]
        })
        .addCase(addProductReview.rejected, (state, action) => {
            state.productLoading = false 
            state.productSuccess = false 
            state.productError = true 
            state.productErrorMessage = action.payload
        })
    }

})



export default productSlice.reducer


// GET ALL PRODUCTS

export const getAllProducts = createAsyncThunk("GET/PRODUCTS", async(_ , thunkAPI) => {
    try {
        return productService.fetchAllProducts()
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})


// GET PRODUCT

export const getProduct = createAsyncThunk("GET/PRODUCT", async(pid , thunkAPI) => {


    try {
        return productService.fetchProduct(pid)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})

// GET PRODUCT ALL REVIEWS

export const getProductAllReviews = createAsyncThunk("GET/PRODUCT_REVIEWs", async(pid , thunkAPI) => {


    try {
        return productService.fetchProductReviews(pid)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})


// GET PRODUCT ALL REVIEWS

export const addProductReview = createAsyncThunk("ADD/PRODUCT_REVIEW", async(reviewData , thunkAPI) => {

     let token = thunkAPI.getState().auth.user.token
    try {
        return await productService.createProductReviews(token, reviewData)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})


