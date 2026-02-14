import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import adminService from './adminService';
import { act } from 'react';

const initialState = {
    adminIsLoading: false,
    adminIsSuccess: false,
    adminIsError: false,
    adminMessage: "",
    allUsers: [],
    allProducts: [],
    allOrders: [],
    allCoupons: [],
    allReviews: [],
    productEdit : {
        product: {},
        isEdit: false
    }

}

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        editProduct : (state, action) => {
            return{
                ...state,
                productEdit: { product: action.payload, isEdit: true }
            }
        }
    },
    extraReducers: (builder) => { 
        builder
        // Fetch all Users for admin
        .addCase(getAllUsersForAdmin.pending, (state, action) => {
            state.adminIsLoading = true
            state.adminIsSuccess = false
            state.adminIsError = false
            state.adminMessage = " "
        })
        .addCase(getAllUsersForAdmin.fulfilled, (state, action) => {
            state.adminIsLoading = false
            state.adminIsSuccess = true
            state.adminIsError = false
            state.adminMessage = " "
            state.allUsers = action.payload
        })
        .addCase(getAllUsersForAdmin.rejected, (state, action) => {
            state.adminIsLoading = false
            state.adminIsSuccess = false
            state.adminIsError = true
            state.adminMessage = action.payload
        })

        // Fetch all orders for admin

        .addCase(getAllOrdersForAdmin.pending, (state, action) => {
            state.adminIsLoading = true
            state.adminIsSuccess = false
            state.adminIsError = false
            state.adminMessage = " "
        })
        .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
            state.adminIsLoading = false
            state.adminIsSuccess = true
            state.adminIsError = false
            state.adminMessage = " "
            state.allOrders = action.payload
        })
        .addCase(getAllOrdersForAdmin.rejected, (state, action) => {
            state.adminIsLoading = false
            state.adminIsSuccess = false
            state.adminIsError = true
            state.adminMessage = action.payload
        })

        // update user
        .addCase(updateUserForAdmin.pending, (state, action) => {
            state.adminIsLoading = true
            state.adminIsSuccess = false
            state.adminIsError = false
            state.adminMessage = " "
        })
        .addCase(updateUserForAdmin.fulfilled, (state, action) => {
            state.adminIsLoading = false
            state.adminIsSuccess = true
            state.adminIsError = false
            state.adminMessage = " "
            state.allUsers = state.allUsers.map(user => user._id === action.payload._id ? action.payload : user )
        })
        .addCase(updateUserForAdmin.rejected, (state, action) => {
            state.adminIsLoading = false
            state.adminIsSuccess = false
            state.adminIsError = true
            state.adminMessage = action.payload
        })

        //  Add products 
        .addCase(createProductByAdmin.pending, (state, action) => {
            state.adminIsLoading = true
            state.adminIsSuccess = false
            state.adminIsError = false
            state.adminMessage = " "
        })
        .addCase(createProductByAdmin.fulfilled, (state, action) => {
            state.adminIsLoading = false
            state.adminIsSuccess = true
            state.adminIsError = false
            state.adminMessage = " "
            state.allProducts = [action.payload, ...state.allProducts]
        })
        .addCase(createProductByAdmin.rejected, (state, action) => {
            state.adminIsLoading = false
            state.adminIsSuccess = false
            state.adminIsError = true
            state.adminMessage = action.payload
        })


        //  Update  product
        .addCase(updateProductByAdmin.pending, (state, action) => {
            state.adminIsLoading = true
            state.adminIsSuccess = false
            state.adminIsError = false
            state.adminMessage = " "
        })
        .addCase(updateProductByAdmin.fulfilled, (state, action) => {
            state.adminIsLoading = false
            state.adminIsSuccess = true
            state.adminIsError = false
            state.adminMessage = " "
            state.allProducts = state.allProducts.map(product => product.id === action.payload.id ? action.payload : product)
            state.productEdit = {product: {}, isEdit: false}
        })
        .addCase(updateProductByAdmin.rejected, (state, action) => {
            state.adminIsLoading = false
            state.adminIsSuccess = false
            state.adminIsError = true
            state.adminMessage = action.payload
        })

        //  get all products 
        .addCase(getAllProducts.pending, (state, action) => {
            state.adminIsLoading = true
            state.adminIsSuccess = false
            state.adminIsError = false
            state.adminMessage = " "
        })
        .addCase(getAllProducts.fulfilled, (state, action) => {
            state.adminIsLoading = false
            state.adminIsSuccess = true
            state.adminIsError = false
            state.adminMessage = " "
            state.allProducts = action.payload
        })
        .addCase(getAllProducts.rejected, (state, action) => {
            state.adminIsLoading = false
            state.adminIsSuccess = false
            state.adminIsError = true
            state.adminMessage = action.payload
        })

        //  update orders 
        .addCase(updateOrdersForAdmin.pending, (state, action) => {
            state.adminIsLoading = true
            state.adminIsSuccess = false
            state.adminIsError = false
            state.adminMessage = " "
        })
        .addCase(updateOrdersForAdmin.fulfilled, (state, action) => {
            state.adminIsLoading = false
            state.adminIsSuccess = true
            state.adminIsError = false
            state.adminMessage = " "
            state.allOrders = state.allOrders.map(order => order._id === action.payload._id ? action.payload : order)
        })
        .addCase(updateOrdersForAdmin.rejected, (state, action) => {
            state.adminIsLoading = false
            state.adminIsSuccess = false
            state.adminIsError = true
            state.adminMessage = action.payload
        })


        //  GET COUPON 
        .addCase(getAllCoupon.pending, (state, action) => {
            state.adminIsLoading = true
            state.adminIsSuccess = false
            state.adminIsError = false
            state.adminMessage = " "
        })
        .addCase(getAllCoupon.fulfilled, (state, action) => {
            state.adminIsLoading = false
            state.adminIsSuccess = true
            state.adminIsError = false
            state.adminMessage = " "
            state.allCoupons = action.payload
        })
        .addCase(getAllCoupon.rejected, (state, action) => {
            state.adminIsLoading = false
            state.adminIsSuccess = false
            state.adminIsError = true
            state.adminMessage = action.payload
        })

          //  CREATE COUPON 
        .addCase(createCouponByAdmin.pending, (state, action) => {
            state.adminIsLoading = true
            state.adminIsSuccess = false
            state.adminIsError = false
            state.adminMessage = " "
        })
        .addCase(createCouponByAdmin.fulfilled, (state, action) => {
            state.adminIsLoading = false
            state.adminIsSuccess = true
            state.adminIsError = false
            state.adminMessage = " "
            state.allCoupons = [action.payload, ...state.allCoupons]
        })
        .addCase(createCouponByAdmin.rejected, (state, action) => {
            state.adminIsLoading = false
            state.adminIsSuccess = false
            state.adminIsError = true
            state.adminMessage = action.payload
        })

        // GET ALL REVIEWS 

         .addCase(getAllReviewsByAdmin.pending, (state, action) => {
            state.adminIsLoading = true
            state.adminIsSuccess = false
            state.adminIsError = false
            state.adminMessage = " "
        })
        .addCase(getAllReviewsByAdmin.fulfilled, (state, action) => {
            state.adminIsLoading = false
            state.adminIsSuccess = true
            state.adminIsError = false
            state.adminMessage = " "
            state.allReviews = action.payload
        })
        .addCase(getAllReviewsByAdmin.rejected, (state, action) => {
            state.adminIsLoading = false
            state.adminIsSuccess = false
            state.adminIsError = true
            state.adminMessage = action.payload
        })


    }
});

export const {editProduct} = adminSlice.actions

export default adminSlice.reducer

// FETCH ADMIN USERS 

export const getAllUsersForAdmin = createAsyncThunk("FETCH/ADMIN/USERS", async (_, thunkAPI) => {

    let token = thunkAPI.getState().auth.user.token

    try {
        return await adminService.fetchAllUser(token)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})


// FETCH ADMIN ORDERS 

export const getAllOrdersForAdmin = createAsyncThunk("FETCH/ADMIN/ORDERS", async (_, thunkAPI) => {

    let token = thunkAPI.getState().auth.user.token

    try {
        return await adminService.fetchAllOrders(token)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})

// UPDATE ADMIN ORDERS 

export const updateOrdersForAdmin = createAsyncThunk("UPDATE/ADMIN/ORDERS", async (orderData, thunkAPI) => {

    let token = thunkAPI.getState().auth.user.token

    try {
        return await adminService.updateOrder(orderData, token)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})



// FETCH ADMIN ORDERS 

export const updateUserForAdmin = createAsyncThunk("UPDATE/ADMIN/USER", async (userData, thunkAPI) => {

    let token = thunkAPI.getState().auth.user.token

    try {
        return await adminService.updateUser(userData, token)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})


// ADD ADMIN PRODUCT 

export const createProductByAdmin = createAsyncThunk("ADD/ADMIN/PRODUCT", async (formData, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token
    try {
        return await adminService.createProduct(formData, token)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }

})


// UPDATE ADMIN PRODUCT 

export const updateProductByAdmin = createAsyncThunk("UPDATE/ADMIN/PRODUCT", async (formData, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token
    let productId = thunkAPI.getState().admin.productEdit.product._id

    console.log(productId)
    try {
        return await adminService.updateProduct(formData, productId, token)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }

})



// GET ALL PRODUCTS 

export const getAllProducts = createAsyncThunk("GET/PRODUCTS", async(_ , thunkAPI) => {
    try {
        return await adminService.getProducts()
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})

// GET ALL Coupon 

export const getAllCoupon = createAsyncThunk("GET/COUPON", async(_ , thunkAPI) => {

   let token = thunkAPI.getState().auth.user.token


    try {
        return await adminService.getCoupon(token)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})


// Create Coupon 

export const createCouponByAdmin = createAsyncThunk("ADD/ADMIN/COUPON", async(couponData , thunkAPI) => {
    
    let token = thunkAPI.getState().auth.user.token
    
    try {
        return await adminService.createCoupon(couponData, token)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})


// GET ALL REVIEWS 

export const getAllReviewsByAdmin = createAsyncThunk("GET/ADMIN/REVIEWS", async(_ , thunkAPI) => {
    
    let token = thunkAPI.getState().auth.user.token

    try {
        return await adminService.getAllReviews(token)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})
