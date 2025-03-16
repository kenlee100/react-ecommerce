import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { setIsLoading, setIsProcessing } from '@/redux/commonSlice'
import { getOrder, sendOrder, payOrder } from '@apis/order'
import toast from '@utils/toast'
export const orderSlice = createSlice({
  name: 'orderSlice',
  initialState: {
    orderData: {
      create_at: null,
      id: '',
      is_paid: false,
      products: {},
      total: null,
      user: {
        address: '',
        county: '',
        district: '',
        email: '',
        name: '',
        tel: ''
      },
      message: ''
    },
    pageInfo: {
      total_pages: 1,
      current_page: 1,
      has_pre: false,
      has_next: true,
      category: ''
    }
  },
  reducers: {
    setOrder: (state, action) => {
      state.orderData = action.payload
    }
  }
})
export const asyncOrderData = createAsyncThunk(
  'orderSlice/getOrder',
  async (content, { dispatch }) => {
    dispatch(setIsLoading(true))

    try {
      const res = await getOrder(content)
      const { order } = res
      dispatch(setOrder(order))
    } catch (error) {
      console.error(error)
    } finally {
      dispatch(setIsLoading(false))
    }
  }
)

export const asyncSendOrder = createAsyncThunk('orderSlice/sendOrder', async (content) => {
  try {
    const res = await sendOrder({ data: content })
    return res
  } catch (error) {
    console.error(error)
  }
})

export const asyncPayOrder = createAsyncThunk(
  'orderSlice/payOrder',
  async (content, { dispatch }) => {
    dispatch(setIsProcessing(true))
    try {
      const res = await payOrder(content)
      const { message } = res
      await toast.fire({
        icon: 'success',
        title: message
      })
      await dispatch(asyncOrderData(content))
    } catch (error) {
      console.error(error)
    } finally {
      dispatch(setIsProcessing(false))
    }
  }
)
export const { setOrder } = orderSlice.actions

export const selectOrderData = (state) => state.orderSlice.orderData

export default orderSlice.reducer
