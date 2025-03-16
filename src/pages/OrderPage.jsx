import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useForm } from 'react-hook-form'
import twzipcode from '@utils/twzipcode'

import PageHeader from '@/components/PageHeader'
import CartStep from '@/components/CartStep'

import { useDispatch, useSelector } from 'react-redux'
import { setIsLoading } from '@/redux/commonSlice'
import { asyncSendOrder } from '@/redux/orderSlice'
import { asyncCartData, selectCartsData, selectCartCoupon } from '@/redux/cartSlice'

import toast from '@utils/toast'
export default function OrderPage() {
  const dispatch = useDispatch()
  const cartsData = useSelector(selectCartsData)
  const cartCoupon = useSelector(selectCartCoupon)

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      name: '',
      tel: '',
      county: '',
      district: '',
      address: '',
      message: '',
      paidMethod: '線上刷卡'
    },
    mode: 'onTouched'
  })

  const [selectCounty, setSelectCounty] = useState({})

  // 選擇 county 時，自動選擇第一個 district
  useEffect(() => {
    dispatch(setIsLoading(true))
    setValue('district', Object.keys(selectCounty)[0])
    dispatch(setIsLoading(false))
  }, [selectCounty, setValue, dispatch])

  async function sendOrderData(data) {
    dispatch(setIsLoading(true))
    try {
      const res = await dispatch(asyncSendOrder(data))
      const { message, orderId } = res?.payload || {}
      await toast.fire({
        icon: 'success',
        title: message
      })
      reset()
      await dispatch(asyncCartData())
      navigate(`/checkout/${orderId}`, {
        state: {
          orderId
        }
      })
    } catch (error) {
      console.error(error)
    } finally {
      dispatch(setIsLoading(false))
    }
  }
  function formSubmit(data) {
    const { address, county, district, email, name, tel, message, paidMethod } = data
    const form = {
      user: {
        name,
        email,
        tel,
        county,
        district,
        address,
        paidMethod
      },
      message
    }

    sendOrderData(form)
  }

  useEffect(() => {
    dispatch(asyncCartData())
  }, [dispatch])
  return (
    <>
      <PageHeader
        pageTitle="確認訂單"
        imageUrl="https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <div className="container">
        <CartStep currentStep={2} />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-8 lg:space-y-0">
          <div className="space-y-6 lg:w-1/2">
            <div className="flex flex-col space-y-4">
              {cartsData?.carts &&
                cartsData?.carts.length > 0 &&
                cartsData?.carts.map(({ product, qty, id, product_id }) => {
                  return (
                    <div key={id} className="flex items-center bg-neutral-200 p-4">
                      <div className="flex w-full flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                        <div className="w-full md:w-auto md:flex-1 md:pr-4">
                          <h3 className="ch-heading-3 line-clamp-2 font-bold">
                            <Link to={`/product/${product_id}`}>{product?.title}</Link>
                          </h3>
                        </div>
                        <div className="flex flex-1 items-center md:flex-shrink-0 md:justify-end">
                          <div className="en-caption-01 whitespace-nowrap">
                            x {qty} {product.unit}
                          </div>
                          <div className="ml-auto flex min-w-[120px] flex-shrink-0 items-center justify-end space-x-4">
                            <div className="flex min-w-[50px] flex-col items-end space-y-1">
                              {cartsData.final_total !== cartsData.total && (
                                <div
                                  className={`en-caption-02 text-right ${cartCoupon.code && 'line-through'}`}
                                >
                                  ${cartsData.total?.toLocaleString()}
                                </div>
                              )}
                              <div className="en-body text-right text-secondary-200">
                                ${cartsData.final_total?.toLocaleString()}
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
                  <p className="en-body text-secondary-200">{cartsData.carts?.length}</p>
                  <span>件商品</span>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="flex flex-col space-y-4 bg-neutral-200 p-4 md:p-6">
                <div className="flex flex-col space-y-2 pb-3">
                  <div className="flex justify-between">
                    <p className="ch-body font-bold">小計：</p>
                    <p
                      className={`en-caption-01 flex-shrink-0 ${cartCoupon.code && 'line-through'}`}
                    >
                      ${cartsData.total?.toLocaleString()}
                    </p>
                  </div>
                  {cartsData.final_total !== cartsData.total && (
                    <div className="flex justify-between">
                      <p className="ch-body font-bold">折扣後：</p>
                      <p className="en-caption-01 flex-shrink-0">
                        ${cartsData.final_total?.toLocaleString()}
                      </p>
                    </div>
                  )}

                  {cartCoupon.code && (
                    <div className="flex justify-between">
                      <p className="ch-body font-bold">優惠券：</p>
                      <p className="ch-body font-bold text-neutral-300">{cartCoupon.code}</p>
                    </div>
                  )}
                </div>
                <div className="flex justify-between">
                  <p className="ch-heading-4 font-bold">總計:</p>
                  <p className="en-body flex-shrink-0 text-secondary-200">
                    ${cartsData.final_total?.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            {cartsData?.carts && cartsData?.carts.length > 0 && (
              <div className="flex items-center justify-between">
                <div>
                  <Link className="btn-outline flex" to={'/cart'}>
                    返回上一步
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col lg:w-1/2">
            <form
              className="flex flex-col space-y-6 bg-neutral-200 p-4 md:p-6"
              onSubmit={handleSubmit(formSubmit)}
            >
              <div className="space-y-2">
                <label htmlFor="email" className="flex items-center text-heading-4 font-bold">
                  <span className="mr-1 mt-2 text-red-700">*</span>Email
                </label>
                <input
                  id="email"
                  name="Email"
                  type="email"
                  className={`form-input ${errors?.email && 'border-2 border-red-700'}`}
                  placeholder="請輸入 Email"
                  {...register('email', {
                    required: 'Email 為必填',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Email 格式不正確'
                    }
                  })}
                />
                {errors?.email && (
                  <div className="ch-body block font-bold text-red-700">
                    {errors?.email?.message}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="name" className="flex items-center text-heading-4 font-bold">
                  <span className="mr-1 mt-2 text-red-700">*</span>收件人姓名
                </label>
                <input
                  id="name"
                  name="name"
                  label="姓名"
                  type="text"
                  className={`form-input ${errors?.name && 'border-2 border-red-700'}`}
                  placeholder="請輸入姓名"
                  {...register('name', {
                    required: '姓名為必填',
                    maxLength: {
                      value: 6,
                      message: '長度不可超過 6 個字元'
                    }
                  })}
                />

                {errors?.name && (
                  <div className="ch-body block font-bold text-red-700">
                    {errors?.name?.message}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="flex items-center text-heading-4 font-bold">
                  <span className="mr-1 mt-2 text-red-700">*</span>收件人手機
                </label>
                <input
                  id="tel"
                  name="tel"
                  label="手機"
                  type="tel"
                  className={`form-input ${errors?.tel && 'border-2 border-red-700'}`}
                  placeholder="請輸入手機號碼"
                  {...register('tel', {
                    required: '手機為必填',
                    pattern: {
                      value: /^09[0-9]{8}$/,
                      message: '手機格式不正確'
                    }
                  })}
                />
                {errors?.tel && (
                  <div className="ch-body block font-bold text-red-700">{errors?.tel?.message}</div>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="county" className="flex items-center text-heading-4 font-bold">
                  <span className="mr-1 mt-2 text-red-700">*</span>縣市
                </label>
                <div className="form-select">
                  <select
                    className={`form-input ${errors?.county && 'border-2 border-red-700'}`}
                    name="county"
                    id="county"
                    {...register('county', {
                      onChange: (e) => {
                        setSelectCounty(twzipcode[e.target.value])
                      },
                      required: '請選擇縣市'
                    })}
                  >
                    <option value="" disabled>
                      請選擇縣市
                    </option>
                    ;
                    {Object.keys(twzipcode).map((county) => {
                      return <option key={county}>{county}</option>
                    })}
                  </select>
                </div>
                {errors?.county && (
                  <div className="ch-body block font-bold text-red-700">
                    {errors?.county?.message}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="district" className="flex items-center text-heading-4 font-bold">
                  <span className="mr-1 mt-2 text-red-700">*</span>地區
                </label>
                <div className="form-select">
                  <select
                    name="district"
                    className={`form-input ${errors?.district && 'border-2 border-red-700'}`}
                    id="district"
                    {...register('district', {
                      required: '請選擇地區'
                    })}
                  >
                    <option value="" disabled>
                      請選擇地區
                    </option>
                    {Object.keys(selectCounty).map((district) => {
                      return (
                        <option key={district} value={district}>
                          {district}
                        </option>
                      )
                    })}
                  </select>
                </div>
                {errors?.district && (
                  <div className="ch-body block font-bold text-red-700">
                    {errors?.district?.message}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="address" className="flex items-center text-heading-4 font-bold">
                  <span className="mr-1 mt-2 text-red-700">*</span>地址
                </label>
                <input
                  id="address"
                  name="address"
                  label="地址"
                  type="text"
                  className={`form-input ${errors?.address && 'border-2 border-red-700'}`}
                  placeholder="請輸入地址"
                  {...register('address', {
                    required: '地址必填'
                  })}
                />
                {errors?.address && (
                  <div className="ch-body block font-bold text-red-700">
                    {errors?.address?.message}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="paid" className="text-heading-4 font-bold">
                  付款方式
                </label>
                <div className="form-select">
                  <select className="form-control" name="paidMethod" id="paid">
                    <option value="線上刷卡">線上刷卡</option>
                    <option value="ATM轉帳">ATM轉帳</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-heading-4 font-bold">
                  留言
                </label>
                <textarea
                  id="message"
                  className="form-input"
                  cols="30"
                  rows="6"
                  {...register('message')}
                ></textarea>
              </div>
              <button type="submit" className="btn-base w-full bg-secondary-200 text-neutral-100">
                確認付款
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
