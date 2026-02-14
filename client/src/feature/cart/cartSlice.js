import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import cartService from './cartService.js';

const initialState = {
  cart: null,
  coupon: null,
  cartLoading: false,
  cartSuccess: false,
  cartError: false,
  cartErrorMessage: "",
  couponErrorMessage: "",
  couponError: false
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // add Item into card 
      .addCase(addItemToCart.pending, (state, action) => {
        state.cartLoading = true
        state.cartSuccess = false
        state.cartError = false
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.cartLoading = false
        state.cartSuccess = true
        state.cart = action.payload
        state.cartError = false
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.cartLoading = false
        state.cartSuccess = false
        state.cartError = true
        state.cartErrorMessage = action.payload
      })

      // fetch Item into card 
      .addCase(getCartItems.pending, (state, action) => {
        state.cartLoading = true
        state.cartSuccess = false
        state.cartError = false
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.cartLoading = false
        state.cartSuccess = true
        state.cart = action.payload
        state.cartError = false
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.cartLoading = false
        state.cartSuccess = false
        state.cartError = true
        state.cartErrorMessage = action.payload
      })


       // Remove Item into card 
      .addCase(removeCartItems.pending, (state, action) => {
        state.cartLoading = true
        state.cartSuccess = false
        state.cartError = false
      })
      .addCase(removeCartItems.fulfilled, (state, action) => {
        state.cartLoading = false
        state.cartSuccess = true
        state.cart = action.payload
        state.cartError = false
      })
      .addCase(removeCartItems.rejected, (state, action) => {
        state.cartLoading = false
        state.cartSuccess = false
        state.cartError = true
        state.cartErrorMessage = action.payload
      })


      // Update Item from card 
      .addCase(updateItemToCart.pending, (state, action) => {
        state.cartLoading = true
        state.cartSuccess = false
        state.cartError = false
      })
      .addCase(updateItemToCart.fulfilled, (state, action) => {
        state.cartLoading = false
        state.cartSuccess = true
        state.cart = action.payload
        state.cartError = false
      })
      .addCase(updateItemToCart.rejected, (state, action) => {
        state.cartLoading = false
        state.cartSuccess = false
        state.cartError = true
        state.cartErrorMessage = action.payload
      })

      // Apply Coupon
      .addCase(applyCouponOnCart.pending, (state, action) => {
        state.cartLoading = true
        state.cartSuccess = false
        state.cartError = false
      })
      .addCase(applyCouponOnCart.fulfilled, (state, action) => {
        state.cartLoading = false
        state.cartSuccess = true
        state.coupon = action.payload
        state.couponError = false
      })
      .addCase(applyCouponOnCart.rejected, (state, action) => {
        state.cartLoading = false
        state.cartSuccess = false
        state.couponError = true
        state.couponErrorMessage = action.payload
      })
  }
});

export const { } = cartSlice.actions

export default cartSlice.reducer


// ADD IREM TO CART 

export const addItemToCart = createAsyncThunk("ADD_ITEM/CART", async (cartData, thunkAPI) => {

  let token = thunkAPI.getState().auth.user.token

  try {
    return await cartService.addToCart(token, cartData)
  } catch (error) {
    let message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }

})

// GET CART 

export const getCartItems = createAsyncThunk("GET_ITEM/CART", async (_, thunkAPI) => {

  let token = thunkAPI.getState().auth.user.token

  try {
    return await cartService.fetchItem(token)
  } catch (error) {
    let message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }

})

// REMOVE CART ITEM 

export const removeCartItems = createAsyncThunk("REMOVE_ITEM/CART", async (productId, thunkAPI) => {

  let token = thunkAPI.getState().auth.user.token

  try {
    return await cartService.removeItem(token, productId)
  } catch (error) {
    let message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }

})


// UPDATE CART ITEM 

export const updateItemToCart = createAsyncThunk("UPDATE_ITEM/CART", async(cartData, thunkAPI) => {

  let token = thunkAPI.getState().auth.user.token

   try {
      return await cartService.updateCartItem(token, cartData)
   } catch (error) {
    let message = error.response.data.message 
    return thunkAPI.rejectWithValue(message)
   }
})


// APPLY COUPON ON CART  

export const applyCouponOnCart = createAsyncThunk("APPLY_COUPON/CART", async(couponCode, thunkAPI) => {

  let token = thunkAPI.getState().auth.user.token

   try {
      return await cartService.applyCoupon(token, couponCode)
   } catch (error) {
    let message = error.response.data.message 
    return thunkAPI.rejectWithValue(message)
   }
})