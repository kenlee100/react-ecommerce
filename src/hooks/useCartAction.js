import { useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { selectCartsData, asyncAddToCart, asyncUpdateCartItem } from '@/redux/cartSlice'

// 自定義 Hook 管理購物車加入狀態
function useCartAction() {
  const dispatch = useDispatch()
  const cartData = useSelector(selectCartsData)

  // 處理加入購物車的主要邏輯
  const handleAddToCart = useCallback(
    async (data) => {
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
      }
    },
    [cartData, dispatch]
  )

  return {
    handleAddToCart
  }
}
export default useCartAction
