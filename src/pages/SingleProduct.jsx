import { useParams } from 'react-router-dom'
import { useEffect, useState, useMemo } from 'react'

import ProductItem from '@/components/ProductItem'

import useCartAction from '@/hooks/useCartAction'

import { useDispatch, useSelector } from 'react-redux'
import {
  selectProductsAll,
  selectProductContent,
  asyncProductsItem,
  asyncProductsAll
} from '@/redux/productSlice'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'

import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import 'swiper/scss/autoplay'
import 'swiper/scss/effect-fade'

const modules = [Autoplay, Navigation, Pagination]
export default function SingleProduct() {
  const dispatch = useDispatch()
  const productsAll = useSelector(selectProductsAll)

  const productContent = useSelector(selectProductContent)
  const { productId } = useParams()

  const [qtySelect, setQtySelect] = useState(1)

  const { handleAddToCart, isProductLoading } = useCartAction()

  useEffect(() => {
    dispatch(asyncProductsAll())
  }, [dispatch])

  useEffect(() => {
    dispatch(asyncProductsItem(productId))
  }, [productId, dispatch])

  // 開啟後購買數量變成預設
  useEffect(() => {
    setQtySelect(1)
  }, [productContent])

  const filterOtherItem = useMemo(() => {
    return productsAll.filter((item) => item.id !== productId)
  }, [productsAll, productId])

  function swiperMainRender(productContent) {
    if (Object.prototype.hasOwnProperty.call(productContent, 'imagesUrl')) {
      if (productContent.imagesUrl && productContent.imagesUrl.length >= 3) {
        return (
          <div className="product-slider">
            <Swiper
              pagination={{
                clickable: true
              }}
              loop={productContent.imagesUrl.length >= 3}
              // autoplay={{
              //   delay: 3000,
              //   disableOnInteraction: false
              // }}
              modules={modules}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 0
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 24
                }
              }}
            >
              {productContent.imagesUrl.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <img
                      className="h-[400px] w-full flex-shrink-0 object-cover"
                      src={item}
                      alt={`${productContent.title}${index + 1}`}
                    />
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>
        )
      } else if (productContent.imagesUrl.length < 3 || productContent.imageUrl) {
        return (
          <div className="common-slider">
            <Swiper
              slidesPerView={1}
              spaceBetween={0}
              pagination={{
                clickable: true
              }}
              loop={productContent.imagesUrl.length >= 3}
              // autoplay={{
              //   delay: 3000,
              //   disableOnInteraction: false
              // }}
              modules={modules}
            >
              {productContent.imagesUrl.map((item, index) => {
                return (
                  <SwiperSlide key={item}>
                    <img
                      className="h-[400px] w-full flex-shrink-0 object-cover"
                      src={item}
                      alt={`${productContent.title}-${index + 1}`}
                    />
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>
        )
      }
    } else if (Object.prototype.hasOwnProperty.call(productContent, 'imageUrl')) {
      return (
        <div>
          <img
            className="h-[400px] w-full flex-shrink-0 object-cover"
            src={productContent.imageUrl}
            alt={productContent.title}
          />
        </div>
      )
    } else {
      return (
        <div>
          <img
            className="h-[400px] w-full flex-shrink-0 object-cover"
            src="https://placehold.co/1024x768?text=No+Photo"
            alt="預設圖"
          />
        </div>
      )
    }
  }
  return (
    <>
      {swiperMainRender(productContent)}
      <div className="container">
        <div className="flex flex-col-reverse justify-between pb-16 pt-10 lg:flex-row lg:space-x-8">
          <div className="space-y-6 border-b border-neutral-500 pb-6 lg:w-[66.666%]">
            <h1 className="ch-heading-1 font-bold">{productContent.title}</h1>
            <div className="!mt-3 flex border-b border-neutral-300 pb-4 [&:not(:last-child)]:mb-4">
              <div className="ch-heading-4 mt-0.5 flex h-4 w-4 flex-shrink-0 items-center font-semibold text-neutral-300 lg:mt-1 [&:not(:last-child)]:mr-3">
                <span className="material-symbols-outlined">chair</span>
              </div>
              <div className="ch-caption-2 lg:ch-body text-neutral-300 lg:font-bold">
                {productContent.category}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="editor-content">{productContent.description}</div>
            </div>
            <div className="flex flex-col">
              <div className="editor-content pb-4 pt-5">
                <div>{productContent.content}</div>
              </div>
            </div>
          </div>
          <div className="mb-8 flex flex-col lg:mb-0 lg:w-[33.333%]">
            <div className="sticky inset-x-0 top-[72px] space-y-6 bg-neutral-200 p-6">
              <div className="space-y-2">
                <div>
                  <span className="en-title">{productContent.price}</span>元
                </div>
                <div className="h6 space-x-1">
                  <span>原價</span>
                  <span className="en-caption-01 line-through">{productContent.origin_price}</span>
                  <span>元</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex w-full items-center space-x-2">
                  <div className="form-select w-full">
                    <select
                      value={qtySelect}
                      onChange={(e) => setQtySelect(Number(e.target.value))}
                      id="qtySelect"
                      className="form-select"
                    >
                      {Array.from({ length: 20 }).map((_, index) => (
                        <option key={index} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <span className="flex-shrink-0">{productContent.unit}</span>
                </div>
              </div>

              <div className="w-full">
                <button
                  type="button"
                  className="btn-base w-full bg-secondary-200 text-neutral-100"
                  onClick={() => {
                    handleAddToCart({
                      product_id: productContent.id,
                      qty: Number(qtySelect)
                    })
                  }}
                  disabled={isProductLoading(productContent.id)}
                >
                  {isProductLoading(productContent.id) && (
                    <div className="spinner-border spinner-border-sm me-2" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )}
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-6">
          <h2 className="ch-heading-2 font-bold text-neutral-400">其他空間推薦</h2>
          <div className="common-slider">
            <Swiper
              pagination={{
                clickable: true
              }}
              modules={modules}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  width: 260,
                  spaceBetween: 24
                },
                640: {
                  slidesPerView: 2,
                  width: null,
                  spaceBetween: 24
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 24
                },
                1296: {
                  slidesPerView: 4,
                  spaceBetween: 24
                }
              }}
            >
              {filterOtherItem.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <ProductItem
                      productData={item}
                      imageClass="!h-[200px]"
                      textContentClass="!ml-0 !mt-0"
                      handleAddToCart={handleAddToCart}
                      itemClass="h-full"
                    />
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  )
}
