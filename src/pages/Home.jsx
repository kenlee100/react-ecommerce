import { NavLink } from 'react-router-dom'
import { useEffect, useMemo } from 'react'

import useCartAction from '@/hooks/useCartAction'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectProducts,
  selectProductsAll,
  asyncProductsData,
  asyncProductsAll
} from '@/redux/productSlice'
import ProductItem from '@/components/ProductItem'

import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Autoplay, Navigation, Pagination } from 'swiper/modules'

import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import 'swiper/scss/autoplay'
import 'swiper/scss/effect-fade'

const modules = [FreeMode, Autoplay, Navigation, Pagination]
export default function Home() {
  const dispatch = useDispatch()
  const products = useSelector(selectProducts)
  const productsAll = useSelector(selectProductsAll)

  const { handleAddToCart } = useCartAction()
  const slideImages = [
    {
      id: 1,
      imageUrl:
        'https://images.unsplash.com/photo-1643267514395-b36b3f7e8281?q=80&w=1024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: '知識殿堂— 高效研討會議室'
    },
    {
      id: 2,
      imageUrl:
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: '知識殿堂— 高效研討會議室'
    }
  ]

  useEffect(() => {
    dispatch(asyncProductsAll())
  }, [dispatch])

  const productsCategory = useMemo(() => {
    return [...new Set(productsAll.map((item) => item.category))]
  }, [productsAll])

  const mapCategoryItems = useMemo(() => {
    return productsCategory
      .map((item) => {
        const findCategory = productsAll.find((product) => product.category === item)
        return findCategory
      })
      .filter((product) => product !== undefined)
  }, [productsCategory, productsAll])

  useEffect(() => {
    dispatch(
      asyncProductsData({
        page: 1
      })
    )
  }, [dispatch])

  return (
    <>
      <div className="main-slider relative flex h-[375px] overflow-hidden lg:h-[720px]">
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          modules={modules}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false
          }}
          pagination={{ clickable: true }}
        >
          {slideImages.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="container flex h-full flex-col">
                  <div className="relative z-10 flex h-full flex-col items-center justify-center">
                    <div className="mx-auto flex flex-col items-center text-center text-neutral-100 [&:not(:last-child)]:mb-5 lg:[&:not(:last-child)]:mb-10">
                      <h2 className="en-body lg:en-display drop-shadow-lg [&:not(:last-child)]:mb-5 lg:[&:not(:last-child)]:mb-10">
                        SPACE RENTAL
                      </h2>
                    </div>

                    <NavLink
                      to={'/products'}
                      className="btn-base group flex items-center bg-neutral-100 text-neutral-400"
                    >
                      <p>立即前往</p>
                      <div className="icon-arrow -ml-4 flex h-6 w-6 justify-center opacity-0 transition-all duration-100 ease-in-out after:flex after:items-center after:text-2xl group-hover:ml-2 group-hover:text-neutral-400 group-hover:opacity-100"></div>
                    </NavLink>
                  </div>
                  <div
                    className="before:inset absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat before:absolute before:z-[2] before:flex before:h-full before:w-full before:bg-black/25"
                    style={{ backgroundImage: `url('${item.imageUrl}')` }}
                  ></div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
      <section className="bg-neutral-100 pb-10 pt-6 lg:pb-[160px] lg:pt-20">
        <div className="container">
          <div className="border-l border-neutral-400 px-4 lg:px-8 lg:py-2 [&:not(:last-child)]:mb-10 lg:[&:not(:last-child)]:mb-20">
            <h2 className="en-body lg:en-title [&:not(:last-child)]:mb-2 lg:[&:not(:last-child)]:mb-3">
              RECOMMENDED SPACES
            </h2>
            <p className="ch-body lg:ch-heading-3 font-bold">推薦空間</p>
          </div>
          <div className="hidden lg:grid lg:grid-flow-col lg:grid-rows-3 lg:gap-6">
            {products.slice(0, 6).map((item) => {
              return (
                <ProductItem
                  key={item.id}
                  productData={item}
                  itemClass="mb-10 lg:mb-20"
                  handleAddToCart={handleAddToCart}
                />
              )
            })}
          </div>
          <div className="main-common-slider lg:!hidden">
            <Swiper
              slidesPerView={1}
              spaceBetween={24}
              pagination={{
                clickable: true
              }}
              width={260}
              loop={products.length > 1}
              modules={modules}
            >
              {products.slice(0, 6).map((item) => {
                return (
                  <SwiperSlide key={item.id}>
                    <ProductItem
                      key={item.id}
                      productData={item}
                      handleAddToCart={handleAddToCart}
                    />
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>
          <div className="flex justify-end">
            <NavLink
              to={'/products'}
              className="group flex w-full max-w-[160px] cursor-pointer items-center border-b-4 border-neutral-400 px-5 py-3 transition-all duration-500 ease-in-out hover:bg-neutral-400 lg:w-60 lg:max-w-none lg:px-8 lg:py-4"
            >
              <p className="ch-body lg:en-body text-neutral-400 transition-all duration-500 ease-in-out group-hover:text-neutral-100">
                查看更多
              </p>
              <div className="icon-arrow flex h-8 w-8 justify-center opacity-0 transition-all duration-500 ease-in-out after:text-2xl group-hover:ml-4 group-hover:text-neutral-100 group-hover:opacity-100 lg:h-9 lg:w-9 lg:after:text-4xl"></div>
            </NavLink>
          </div>
        </div>
      </section>
      <section className="bg-neutral-200 pb-10 pt-10 lg:pb-[160px] lg:pt-20">
        <div className="container [&:not(:last-child)]:mb-10 lg:[&:not(:last-child)]:mb-20">
          <div className="border-l border-neutral-400 px-4 lg:px-8 lg:py-2">
            <h2 className="en-body lg:en-title [&:not(:last-child)]:mb-2 lg:[&:not(:last-child)]:mb-3">
              SPACE CATEGORIES
            </h2>
            <p className="ch-body lg:ch-heading-3 font-bold">空間分類</p>
          </div>
        </div>
        <div className="grid grid-cols-2 overflow-x-auto md:grid-cols-4 md:gap-1">
          {productsCategory.map((item) => {
            return (
              <NavLink
                to={`/products?category=${item}`}
                key={item}
                className="relative aspect-square cursor-pointer bg-neutral-400"
              >
                {mapCategoryItems.map((categoryItem) => {
                  return (
                    categoryItem?.category === item && (
                      <div
                        key={categoryItem.id}
                        className="color-overlay absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url('${categoryItem.imageUrl}.jpg')` }}
                      ></div>
                    )
                  )
                })}
                <div className="relative z-10 flex h-full flex-col items-center justify-center p-3">
                  <h3 className="[&:not(:last-child)]:lg-2 ch-caption-1 lg:ch-heading-2 font-bold text-neutral-100">
                    {item}
                  </h3>
                </div>
              </NavLink>
            )
          })}
        </div>
      </section>
      <section className="-mb-10 bg-primary-100 pb-0 pt-10 lg:pb-[200px] lg:pt-20">
        <div className="container [&:not(:last-child)]:mb-10 lg:[&:not(:last-child)]:mb-20">
          <div className="border-l border-neutral-400 px-8 py-2">
            <h2 className="en-body lg:en-title [&:not(:last-child)]:mb-2 lg:[&:not(:last-child)]:mb-3">
              EVENT TYPES
            </h2>
            <p className="ch-body lg:ch-heading-3 font-bold">這些空間可做什麼活動？</p>
          </div>
        </div>
        <div className="grid grid-flow-row grid-cols-2 grid-rows-3 gap-6 px-3 lg:grid-flow-col lg:grid-cols-9 lg:grid-rows-4">
          <div className="col-span-1 aspect-square lg:col-span-3 lg:row-span-3 lg:aspect-auto lg:w-full">
            <div className="relative flex h-full overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1505409859467-3a796fd5798e?q=80&w=1024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="研討會"
              />
              <div className="absolute bottom-0 left-0 flex h-[80px] w-[80px] flex-col items-center justify-center bg-primary-200 transition-all ease-in-out hover:bg-secondary-100 md:h-[196px] md:w-[196px]">
                <h3 className="ch-caption-1 md:ch-heading-3 overflow-hidden font-bold text-neutral-100">
                  研討會
                </h3>
              </div>
            </div>
          </div>
          <div className="col-start-2 row-span-2 row-start-1 mb-[10%] h-[calc(100%-47%)] w-full place-self-center lg:col-span-3 lg:row-span-2 lg:mb-0 lg:aspect-auto">
            <div className="relative flex h-full overflow-hidden lg:h-[420px]">
              <img
                className="h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="節慶活動"
              />
              <div className="absolute bottom-0 left-0 flex h-[80px] w-[80px] flex-col items-center justify-center bg-primary-100 transition-all ease-in-out hover:bg-secondary-100 md:h-[196px] md:w-[196px]">
                <h3 className="ch-caption-1 md:ch-heading-3 overflow-hidden font-bold text-secondary-200">
                  節慶活動
                </h3>
              </div>
            </div>
          </div>
          <div className="col-start-2 row-span-2 row-start-2 mt-[10%] h-[calc(100%-47%)] w-full place-self-center lg:col-span-3 lg:row-span-2 lg:mt-0 lg:aspect-auto">
            <div className="relative flex h-full overflow-hidden lg:h-[420px]">
              <img
                className="h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1731530752967-718851083d1d?q=80&w=1024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="表演"
              />
              <div className="absolute bottom-0 left-0 flex h-[80px] w-[80px] flex-col items-center justify-center bg-primary-200 transition-all ease-in-out hover:bg-secondary-100 md:h-[196px] md:w-[196px]">
                <h3 className="ch-caption-1 md:ch-heading-3 overflow-hidden font-bold text-neutral-100">
                  表演
                </h3>
              </div>
            </div>
          </div>
          <div className="aspect-square lg:col-span-4 lg:row-span-2 lg:row-start-2 lg:aspect-auto lg:h-[416px]">
            <div className="relative flex h-full w-full overflow-hidden">
              <img
                className="h-full w-full object-cover object-top"
                src="https://images.unsplash.com/photo-1533749871411-5e21e14bcc7d?q=80&w=1024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="技術交流"
              />
              <div className="absolute bottom-0 left-0 flex h-[80px] w-[80px] flex-col items-center justify-center bg-secondary-200 transition-all ease-in-out hover:bg-secondary-100 md:h-[196px] md:w-[196px]">
                <h3 className="ch-caption-1 md:ch-heading-3 overflow-hidden font-bold text-neutral-100">
                  技術交流
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <div className="container -mb-16">
        <div className="relative -mt-[1px] border-b border-neutral-500"></div>
      </div> */}
    </>
  )
}
