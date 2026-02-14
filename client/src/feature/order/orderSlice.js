import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import orderService from './orderService';

const initialState = {
    orders: [],
    order: {},
    orderLoading: false,
    orderSuccess: false,
    orderError: false,
    orderErrorMessage: ""
}

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // place order 
            .addCase(placeOrder.pending, (state, action) => {
                state.orderLoading = true
                state.orderSuccess = false
                state.orderError = false
            }).addCase(placeOrder.fulfilled, (state, action) => {
                state.orderLoading = false
                state.orderSuccess = true
                state.order = action.payload
                state.orderError = false
            }).addCase(placeOrder.rejected, (state, action) => {
                state.orderLoading = false
                state.orderSuccess = false
                state.orderError = true
                state.orderErrorMessage = action.payload
            })
            // get all orders
            .addCase(getAllOrders.pending, (state, action) => {
                state.orderLoading = true
                state.orderSuccess = false
                state.orderError = false
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.orderLoading = false
                state.orderSuccess = true
                state.orders = action.payload
                state.orderError = false
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.orderLoading = false
                state.orderSuccess = false
                state.orderError = true
                state.orderErrorMessage = action.payload
            })
              // get  order
            .addCase(getMyOrder.pending, (state, action) => {
                state.orderLoading = true
                state.orderSuccess = false
                state.orderError = false
            })
            .addCase(getMyOrder.fulfilled, (state, action) => {
                state.orderLoading = false
                state.orderSuccess = true
                state.order = action.payload
                state.orderError = false
            })
            .addCase(getMyOrder.rejected, (state, action) => {
                state.orderLoading = false
                state.orderSuccess = false
                state.orderError = true
                state.orderErrorMessage = action.payload
            })
             // cancel  order
            .addCase(orderCancel.pending, (state, action) => {
                state.orderLoading = true
                state.orderSuccess = false
                state.orderError = false
            })
            .addCase(orderCancel.fulfilled, (state, action) => {
                state.orderLoading = false
                state.orderSuccess = true
                state.orders = state.orders.map(order => order._id === action.payload.updatedOrder._id ? action.payload.updatedOrder : order)
                state.orderError = false
            })
            .addCase(orderCancel.rejected, (state, action) => {
                state.orderLoading = false
                state.orderSuccess = false
                state.orderError = true
                state.orderErrorMessage = action.payload
            })

    }
});

export const { } = orderSlice.actions

export default orderSlice.reducer

// place order

export const placeOrder = createAsyncThunk("PLACED/ORDER", async (orderDetails, thunkAPI) => {

    let token = thunkAPI.getState().auth.user.token

    try {
        return await orderService.placeOrderByUser(token, orderDetails)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})

// get all order

export const getAllOrders = createAsyncThunk("GET/ORDERS", async (_, thunkAPI) => {

    let token = thunkAPI.getState().auth.user.token

    try {
        return await orderService.getOrderByUser(token)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})

// get single order

export const getMyOrder = createAsyncThunk("GET/ORDER", async (orderId, thunkAPI) => {

    let token = thunkAPI.getState().auth.user.token

    try {
        return await orderService.fetchMyOrder(token, orderId)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})

// cancel order order

export const orderCancel = createAsyncThunk("CANCEL/ORDER", async (orderId, thunkAPI) => {

    let token = thunkAPI.getState().auth.user.token

    try {
        return await orderService.cancelMyOrder(token, orderId)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})