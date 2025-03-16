import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'

import { getCart, addToCart, deleteCartItem, deleteAllCart, updateCartItem } from '@apis/cart'

import { setIsLoading, setIsProcessing } from '@/redux/commonSlice'
import { addCoupon } from '@apis/order'

import Swal from 'sweetalert2'
import toast from '@utils/toast'

const swalCustomClass = Swal.mixin({
  customClass: {
    confirmButton: '!btn !btn-base !text-neutral-100 !block flex-1  !bg-secondary-200',
    cancelButton: '!btn-outline block flex-1 ml-4',
    actions: 'w-full px-4',
    title: 'ch-heading-3'
  },
  buttonsStyling: false,
  allowOutsideClick: false
})

export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState: {
    cartsData: {
      carts: [],
      final_total: 0,
      total: 0
    },
    couponCode: ''
  },
  reducers: {
    setCartData: (state, { payload }) => {
      const { carts, final_total, total } = payload
      state.cartsData.carts = carts
      state.cartsData.final_total = final_total
      state.cartsData.total = total
    }
  }
})

export const asyncCartData = createAsyncThunk(
  'cartSlice/getCart',
  async (content, { dispatch }) => {
    try {
      const res = await getCart()
      const { data } = res
      const { carts, final_total, total } = data
      dispatch(setCartData({ carts, final_total, total }))
    } catch (error) {
      console.error(error)
    }
  }
)

export const asyncAddToCart = createAsyncThunk(
  'cartSlice/addToCart',
  async (content, { dispatch }) => {
    dispatch(setIsProcessing(true))
    try {
      const res = await addToCart({ data: content })
      const {
        product: { title }
      } = res?.data || {}
      await toast.fire({
        icon: 'success',
        title: `${title} ${res.message}`
      })
      await dispatch(asyncCartData())
    } catch (error) {
      console.error(error)
    } finally {
      dispatch(setIsProcessing(false))
    }
  }
)

export const asyncUpdateCartItem = createAsyncThunk(
  'cartSlice/updateCartItem',
  async (content, { dispatch, getState }) => {
    dispatch(setIsProcessing(true))
    try {
      const {
        cartSlice: {
          cartsData: { carts: selectCartsData }
        }
      } = getState()
      const res = await updateCartItem({ data: content }, content.id)
      const { id } = res?.data || {}
      const findCartItem = selectCartsData.find((item) => item.id === id)
      const { title } = findCartItem.product
      await dispatch(asyncCartData())
      await toast.fire({
        icon: 'success',
        title: `已更新 ${title || ''} 商品數量`
      })
    } catch (error) {
      console.error(error)
    } finally {
      dispatch(setIsProcessing(false))
    }
  }
)

export const asyncDeleteCartItemData = createAsyncThunk(
  'cartSlice/deleteCartItem',
  async (content, { dispatch }) => {
    const { title } = content?.product || {}
    swalCustomClass
      .fire({
        icon: 'warning',
        title: `是否刪除 ${title} ?`,
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '確定'
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          // dispatch(setIsLoading(true))
          await dispatch(setIsProcessing(true))
          try {
            const res = await deleteCartItem(content.id)
            const { message } = res
            await toast.fire({
              icon: 'success',
              title: `${message} ${title || ''}`
            })
            await dispatch(asyncCartData())
          } catch (error) {
            console.error(error)
          } finally {
            await dispatch(setIsProcessing(false))
            // dispatch(setIsLoading(false))
          }
        }
      })
  }
)

export const asyncDeleteAllCartData = createAsyncThunk(
  'cartSlice/deleteAllCart',
  async (content, { dispatch }) => {
    swalCustomClass
      .fire({
        icon: 'warning',
        title: '是否要清空購物車?',
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '確定'
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          dispatch(setIsLoading(true))
          try {
            await deleteAllCart()
            await toast.fire({
              icon: 'success',
              title: '已清除購物車'
            })
            await dispatch(asyncCartData())
          } catch (error) {
            console.error(error)
          } finally {
            dispatch(setIsLoading(false))
          }
        }
      })
  }
)

export const asyncAddCoupon = createAsyncThunk(
  'orderSlice/addCoupon',
  async (content, { dispatch }) => {
    dispatch(setIsProcessing(true))
    try {
      const res = await addCoupon({ data: content })

      const { message } = res
      let couponText = message

      if (message.split(':')[1] === 'coupon_clear') {
        couponText = '已移除優惠券'
      }
      await toast.fire({
        icon: 'success',
        title: couponText
      })
      await dispatch(asyncCartData())
    } catch (error) {
      console.error(error)
    } finally {
      dispatch(setIsProcessing(false))
    }
  }
)
export const { setCartData, cartCoupon } = cartSlice.actions
export const selectCartsData = (state) => state.cartSlice.cartsData

// createSelector 記憶化
export const selectCartCoupon = createSelector([selectCartsData], (cartsData) => {
  const firstCart = cartsData?.carts?.length ? cartsData?.carts?.[0] : null
  if (firstCart && firstCart.coupon && firstCart.coupon.code !== 'coupon_clear') {
    return firstCart?.coupon || {}
  }
  return {}
})
export default cartSlice.reducer
