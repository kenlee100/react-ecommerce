import { useEffect, useMemo } from 'react'
import { useLocation, Link, useParams } from 'react-router-dom'

import PageHeader from '@/components/PageHeader'
import CartStep from '@/components/CartStep'

import { useDispatch, useSelector } from 'react-redux'
import { asyncOrderData, selectOrderData, asyncPayOrder } from '@/redux/orderSlice'

export default function CheckoutPage() {
  const dispatch = useDispatch()
  const orderData = useSelector(selectOrderData)
  const location = useLocation()
  const { orderId } = useParams()
  const orderIdData = location?.state?.orderId || orderId
  useEffect(() => {
    dispatch(asyncOrderData(orderIdData))
  }, [orderIdData, dispatch])

  // 處理訂單內的產品資料
  const orderDataList = useMemo(() => {
    return Object.keys(orderData?.products).map((item) => {
      return orderData?.products[item]
    })
  }, [orderData])

  const finalTotal = useMemo(() => {
    return Object.entries(orderData?.products).reduce((acc, current) => acc + current[1].total, 0)
  }, [orderData])

  function convertTime(timestamp) {
    const time = timestamp * 1000
    const date = new Date(time)
    return date.toLocaleString()
  }

  const orderCoupon = useMemo(() => {
    if (Object.keys(orderData).length) {
      const firstCheckoutId = Object.keys(orderData?.products)?.[0]
      const products = orderData?.products[firstCheckoutId]
      if (
        firstCheckoutId &&
        Object.keys(products).includes('coupon') &&
        products?.coupon?.code !== 'coupon_clear'
      ) {
        return products.coupon
      }
    }
    return {}
  }, [orderData])

  const productsId = useMemo(() => {
    return Object.keys(orderData.products)[0]
  }, [orderData])

  const couponIsShow = useMemo(() => {
    return (
      orderData.products[productsId] &&
      Object.keys(orderData.products[productsId]).includes('coupon')
    )
  }, [orderData, productsId])

  function payOrderData() {
    dispatch(asyncPayOrder(orderIdData))
  }

  return (
    <>
      <PageHeader
        pageTitle="訂單完成"
        imageUrl="https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?q=80&w=1024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <div className="container">
        <CartStep currentStep={3} />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-8 lg:space-y-0">
          <div className="lg:w-[66.666%]">
            <div className="flex flex-col space-y-4">
              {orderDataList.map(({ product, qty, id, product_id, total, final_total }) => {
                return (
                  <div className="flex items-center bg-neutral-200 p-4" key={id}>
                    <div className="hidden w-[140px] flex-shrink-0 overflow-hidden md:flex [&:not(:last-child)]:mr-4">
                      <Link
                        to={`/product/${product_id}`}
                        className="flex w-full items-center"
                        target="_blank"
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
                        <h3 className="ch-heading-3 line-clamp-2 font-bold">{product.title}</h3>
                      </div>
                      <div className="flex flex-1 items-center md:flex-shrink-0 md:justify-end">
                        <div className="en-caption-01 whitespace-nowrap">
                          x {qty} {product.unit}
                        </div>
                        <div className="ml-auto flex min-w-[120px] flex-shrink-0 items-center justify-end">
                          <div className="flex min-w-[50px] flex-col items-end space-y-1">
                            {final_total !== total && (
                              <div className="en-caption-02 text-right line-through">
                                ${product.price.toLocaleString()}
                              </div>
                            )}
                            <div className="en-body text-right text-secondary-200">
                              ${final_total.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
              <div className="flex items-center justify-end">
                <div className="ch-heading-4 flex space-x-4 font-bold text-neutral-300">
                  <span>共</span>
                  <p className="en-body text-secondary-200">{orderDataList.length}</p>
                  <span>件商品</span>
                </div>
              </div>
              <div className="space-y-8">
                <div className="flex flex-col space-y-4 bg-neutral-200 p-4 md:p-6">
                  <div className="flex flex-col space-y-2 pb-3">
                    <div className="flex justify-between">
                      <p className="ch-body font-bold">小計：</p>
                      <p
                        className={`en-caption-01 flex-shrink-0 ${couponIsShow && `line-through`}`}
                      >
                        ${finalTotal.toLocaleString()}
                      </p>
                    </div>
                    {finalTotal !== orderData.total && (
                      <div className="flex justify-between">
                        <p className="ch-body font-bold">折扣後：</p>
                        <p className="en-caption-01 flex-shrink-0">
                          ${orderData?.total?.toLocaleString()}
                        </p>
                      </div>
                    )}
                    {Object.keys(orderCoupon).length > 0 && (
                      <div className="flex justify-between">
                        <p className="ch-body font-bold">優惠券：</p>
                        <p className="ch-body font-bold text-neutral-300">{orderCoupon.code}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <p className="ch-heading-4 font-bold">總計:</p>
                    <p className="en-body flex-shrink-0 text-secondary-200">${orderData.total}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:w-[33.333%]">
            <div className="flex flex-col items-center overflow-hidden bg-neutral-200 p-4 md:p-6">
              <div className="flex w-full flex-col space-y-4">
                <h3 className="ch-heading-2 font-bold">訂單明細</h3>
                <div className="flex flex-col flex-wrap items-start justify-between break-all border-neutral-300 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-opacity-30 [&:not(:last-child)]:pb-4">
                  <p className="ch-heading-4 font-bold">訂單編號：</p>
                  <p className="ch-heading-4 flex-1 break-all lg:text-right">{orderData.id}</p>
                </div>
                <div className="flex flex-col flex-wrap items-start justify-between border-neutral-300 [&:not(:last-child)]:border-b [&:not(:last-child)]:pb-4">
                  <p className="ch-heading-4 font-bold">訂單建立時間：</p>
                  <p className="ch-heading-4 flex-1 break-all lg:text-right">
                    {convertTime(orderData.create_at)}
                  </p>
                </div>
                <div className="flex flex-col flex-wrap items-start justify-between break-all border-neutral-300 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-opacity-30 [&:not(:last-child)]:pb-4">
                  <p className="ch-heading-4 font-bold">信箱：</p>
                  <p className="ch-heading-4 flex-1 break-all lg:text-right">
                    {orderData.user.email}
                  </p>
                </div>
                <div className="flex flex-col flex-wrap items-start justify-between break-all border-neutral-300 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-opacity-30 [&:not(:last-child)]:pb-4">
                  <p className="ch-heading-4 font-bold">姓名：</p>
                  <p className="ch-heading-4 flex-1 break-all lg:text-right">
                    {orderData.user.name}
                  </p>
                </div>
                <div className="flex flex-col flex-wrap items-start justify-between break-all border-neutral-300 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-opacity-30 [&:not(:last-child)]:pb-4">
                  <p className="ch-heading-4 font-bold">收件地址：</p>
                  <p className="ch-heading-4 flex-1 break-all lg:text-right">
                    {orderData.user.county}
                    {orderData.user.district}
                    {orderData.user.address}
                  </p>
                </div>
                <div className="flex flex-col flex-wrap items-start justify-between break-all border-neutral-300 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-opacity-30 [&:not(:last-child)]:pb-4">
                  <p className="ch-heading-4 font-bold">電話：</p>
                  <p className="ch-heading-4 flex-1 break-all lg:text-right">
                    {orderData.user.tel}
                  </p>
                </div>
                <div className="flex flex-col flex-wrap items-start justify-between break-all border-neutral-300 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-opacity-30 [&:not(:last-child)]:pb-4">
                  <p className="ch-heading-4 font-bold">付款方式：</p>
                  <p className="ch-heading-4 flex-1 break-all lg:text-right">
                    {orderData.user.paidMethod}
                  </p>
                </div>
                <div className="flex flex-col flex-wrap items-start justify-between break-all border-neutral-300 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-opacity-30 [&:not(:last-child)]:pb-4">
                  <p className="ch-heading-4 break-all font-bold">金額：</p>
                  <p className="en-body flex-shrink-0 pt-1 text-secondary-200">
                    ${Math.round(orderData.total)}
                  </p>
                </div>
                <div className="flex flex-col flex-wrap items-start justify-between break-all border-neutral-300 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-opacity-30 [&:not(:last-child)]:pb-4">
                  <p className="ch-heading-4 font-bold">付款狀態：</p>
                  <p className="ch-heading-4 flex-1 break-all lg:text-right">
                    {orderData?.is_paid ? (
                      <span className="text-green-700">已付款</span>
                    ) : (
                      <span className="text-red-800">尚未付款</span>
                    )}
                  </p>
                </div>
                <div className="flex flex-col flex-wrap items-start justify-between break-all border-neutral-300 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-opacity-30 [&:not(:last-child)]:pb-4">
                  <p className="ch-heading-4 font-bold">留言：</p>
                  <p className="ch-heading-4 flex-1 break-all lg:text-right">{orderData.message}</p>
                </div>

                {!orderData.is_paid && (
                  <button
                    type="button"
                    className="btn-base bg-secondary-200 text-neutral-100"
                    onClick={payOrderData}
                  >
                    付款
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
