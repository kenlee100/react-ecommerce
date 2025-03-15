import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { asyncCartData } from '@/redux/cartSlice'
import PageHeader from '@/components/PageHeader'
import CartStep from '@/components/CartStep'

import { setIsLoading, setIsProcessing } from '@/redux/commonSlice'

import { useDispatch, useSelector } from 'react-redux'
import {
  selectCartsData,
  asyncUpdateCartItem,
  asyncDeleteCartItemData,
  asyncDeleteAllCartData,
  asyncAddCoupon,
  selectCartCoupon
} from '@/redux/cartSlice'

export default function CartPage() {
  const dispatch = useDispatch()
  const cartsData = useSelector(selectCartsData)
  const cartCoupon = useSelector(selectCartCoupon)

  const [couponCode, setCouponCode] = useState('NEWLIFE')

  function handleCouponCodeChange(e) {
    setCouponCode(e.target.value)
  }

  async function removeCoupon() {
    await dispatch(setIsProcessing(true))
    await dispatch(
      asyncAddCoupon({
        code: 'coupon_clear'
      })
    )
    await dispatch(setIsProcessing(false))
  }

  useEffect(() => {
    ;(async () => {
      await dispatch(setIsLoading(true))
      await dispatch(asyncCartData())
      await dispatch(setIsLoading(false))
    })()
  }, [dispatch])

  return (
    <>
      <PageHeader
        pageTitle="購物車"
        imageUrl="https://images.unsplash.com/photo-1555255419-2b9ebb9d541d?q=80&w=1024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <div className="container">
        {cartsData?.carts && cartsData?.carts.length > 0 ? (
          <>
            <CartStep currentStep={1} />
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-8 lg:space-y-0">
              <div className="lg:w-[66.666%]">
                <div className="flex flex-col space-y-4">
                  {cartsData?.carts && cartsData?.carts.length > 0 ? (
                    <>
                      {cartsData?.carts.map(
                        ({ product, qty, id, total, product_id, final_total }) => {
                          return (
                            <div className="flex items-center bg-neutral-200 p-4" key={id}>
                              <div className="hidden w-[140px] flex-shrink-0 overflow-hidden md:flex [&:not(:last-child)]:mr-4">
                                <Link
                                  to={`/product/${product_id}`}
                                  className="flex w-full items-center"
                                >
                                  <div className="overflow-hidden">
                                    <img
                                      className="h-[90px] w-[140px] object-cover"
                                      src={product.imageUrl}
                                      alt={product.title}
                                    />
                                  </div>
                                </Link>
                              </div>
                              <div className="flex w-full flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                                <div className="w-full md:w-auto md:flex-1 md:pr-4">
                                  <h3 className="ch-heading-3 line-clamp-2 font-bold">
                                    <Link to={`/product/${product_id}`} title={product.title}>
                                      {product.title}
                                    </Link>
                                  </h3>
                                </div>
                                <div className="flex flex-1 items-center md:flex-shrink-0 md:justify-end">
                                  <div className="ch-body">
                                    <label htmlFor="" className="hidden">
                                      Qty:
                                    </label>
                                    <div className="form-select">
                                      <select
                                        value={qty}
                                        onChange={(e) =>
                                          dispatch(
                                            asyncUpdateCartItem({
                                              product_id,
                                              qty: Number(e.target.value),
                                              id
                                            })
                                          )
                                        }
                                      >
                                        {Array.from({ length: 20 }).map((_, index) => (
                                          <option key={index} value={index + 1}>
                                            {index + 1}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>
                                  <div className="ml-auto flex min-w-[120px] flex-shrink-0 items-center justify-end">
                                    <div className="flex min-w-[50px] flex-col items-end space-y-1">
                                      {final_total !== total && (
                                        <div className="en-caption-02 text-right line-through">
                                          ${total.toLocaleString()}
                                        </div>
                                      )}
                                      <div className="en-body text-right text-secondary-200">
                                        ${final_total.toLocaleString()}
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="ml-4 flex h-10 w-10 cursor-pointer items-center justify-center"
                                    onClick={() =>
                                      dispatch(asyncDeleteCartItemData({ id, product }))
                                    }
                                  >
                                    <span className="material-symbols-outlined ch-heading-2">
                                      close
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        }
                      )}
                      <div className="flex items-center justify-between">
                        <div className="text-end">
                          <button
                            className="btn-outline"
                            type="button"
                            onClick={() => dispatch(asyncDeleteAllCartData())}
                          >
                            清空購物車
                          </button>
                        </div>
                        <div className="ch-heading-4 flex space-x-4 font-bold text-neutral-300">
                          <span>共</span>
                          <p className="en-body text-secondary-200">{cartsData.carts.length}</p>
                          <span>件商品</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="d-flex justify-content-center flex-column align-items-center">
                      <p>購物車沒有任何商品</p>
                      <Link to={'/products'}>去購物吧</Link>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col lg:w-[33.333%]">
                <div className="sticky inset-x-0 top-[72px] space-y-8">
                  <div className="flex flex-col space-y-4 bg-neutral-200 p-4 md:p-6">
                    <h2 className="ch-heading-2 font-bold">購物車</h2>
                    <div className="flex flex-col space-y-2 pb-3">
                      <div className="flex justify-between">
                        <p className="ch-body font-bold">小計：</p>
                        <p
                          className={`en-caption-01 flex-shrink-0 ${cartCoupon.code && 'line-through'}`}
                        >
                          ${cartsData.total.toLocaleString()}
                        </p>
                      </div>

                      {cartsData.final_total !== cartsData.total && (
                        <div className="flex justify-between">
                          <p className="ch-body font-bold">折扣後：</p>
                          <p className="en-caption-01 flex-shrink-0">
                            ${cartsData.final_total.toLocaleString()}
                          </p>
                        </div>
                      )}
                      {cartCoupon.code && (
                        <div className="flex items-center space-x-2">
                          <p className="ch-body font-bold text-neutral-300">
                            已套用 {cartCoupon.code}
                          </p>
                          <div
                            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-neutral-300"
                            title="移除優惠券"
                            onClick={removeCoupon}
                          >
                            <span className="material-symbols-outlined ch-heading-4 text-neutral-100">
                              close
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between">
                      <p className="ch-heading-4 font-bold">總計:</p>
                      <p className="en-body flex-shrink-0 text-secondary-200">
                        ${cartsData.final_total.toLocaleString()}
                      </p>
                    </div>
                    <Link
                      to={'/order'}
                      className="btn-base w-full bg-secondary-200 text-neutral-100"
                    >
                      前往結帳
                    </Link>
                  </div>
                  <div className="bg-neutral-200 p-4 md:p-6">
                    <div className="flex items-center">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-input"
                          placeholder="輸入優惠券代碼"
                          value={couponCode}
                          onChange={(e) => handleCouponCodeChange(e)}
                        />
                        <button
                          type="button"
                          className="flex-shrink-0 whitespace-nowrap bg-neutral-400 p-4 text-neutral-100"
                          onClick={() => dispatch(asyncAddCoupon({ code: couponCode }))}
                        >
                          套用
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="mx-auto flex max-w-[800px] flex-col justify-center space-y-4">
            <p className="ch-heading-3 text-center">您的購物車沒有任何商品！</p>
            <div className="py-4 text-center">
              <Link className="btn-base bg-secondary-100 text-neutral-100" to="/products">
                瀏覽商品
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
