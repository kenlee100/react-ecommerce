import { useState, useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { selectCartsData, asyncAddToCart, asyncUpdateCartItem } from '@/redux/cartSlice'

// 自定義 Hook 管理購物車加入狀態
function useCartAction() {
  const dispatch = useDispatch()
  const cartData = useSelector(selectCartsData)
  // 管理loading狀態的 Map
  const [cartLoadingStatus, setCartLoadingStatus] = useState([])

  // 開始加載
  const startLoading = useCallback((productId) => {
    setCartLoadingStatus((prev) => {
      return [...prev, productId]
    })
  }, [])

  // 結束加載
  const stopLoading = useCallback((productId) => {
    setCartLoadingStatus((prev) => {
      return prev.filter((state) => state.id === productId)
    })
  }, [])

  // 處理加入購物車的主要邏輯
  const handleAddToCart = useCallback(
    async (data) => {
      // 開始讀取
      startLoading(data.product_id)
      try {
        const findCartItem = cartData?.carts?.find((item) => {
          return data?.product_id === item?.product_id
        })
        if (findCartItem) {
          // 已存在於購物車，更新數量
          dispatch(
            asyncUpdateCartItem({
              product_id: data.product_id,
              qty: findCartItem.qty + data.qty,
              id: findCartItem.id
            })
          )
        } else {
          // 首次加入購物車
          dispatch(asyncAddToCart(data))
        }
      } catch (error) {
        console.error(error)
      } finally {
        // 結束讀取
        stopLoading(data.product_id)
      }
    },
    [cartData, dispatch, startLoading, stopLoading]
  )

  // 檢查特定商品是否正在讀取
  const isProductLoading = useCallback(
    (productId) => {
      return cartLoadingStatus?.find((state) => state === productId)
    },
    [cartLoadingStatus]
  )

  return {
    handleAddToCart,
    isProductLoading
  }
}
export default useCartAction
