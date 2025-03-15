import { configureStore } from '@reduxjs/toolkit'
import commonReducer from '@/redux/commonSlice'
import productReducer from '@/redux/productSlice'
import cartReducer from '@/redux/cartSlice'
import orderReducer from '@/redux/orderSlice'

export const store = configureStore({
  reducer: {
    commonSlice: commonReducer,
    cartSlice: cartReducer,
    productSlice: productReducer,
    orderSlice: orderReducer
  }
})
