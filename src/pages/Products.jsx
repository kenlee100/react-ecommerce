import { useState, useEffect, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import PaginationCustom from '@/components/PaginationCustom'
import ProductItem from '@/components/ProductItem'
import PageHeader from '@/components/PageHeader'

import useCartAction from '@/hooks/useCartAction'

import { useDispatch, useSelector } from 'react-redux'
import {
  selectProducts,
  selectProductsAll,
  asyncProductsData,
  selectPageInfo,
  asyncProductsAll
} from '@/redux/productSlice'

export default function Products() {
  const dispatch = useDispatch()
  const pageInfo = useSelector(selectPageInfo)
  const productsAll = useSelector(selectProductsAll)
  const products = useSelector(selectProducts)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const categoryParams = searchParams.get('category')
  const pageParams = searchParams.get('page')

  const { handleAddToCart } = useCartAction()
  const [selectCategory, setSelectCategory] = useState('全部')

  useEffect(() => {
    const query = {
      page: pageParams || 1
    }
    if (!categoryParams || categoryParams === '全部') {
      setSelectCategory('全部')
    } else {
      setSelectCategory(categoryParams)
      query.category = categoryParams
    }

    Promise.all([dispatch(asyncProductsData(query)), dispatch(asyncProductsAll())])
  }, [categoryParams, dispatch, pageParams])

  const productsCategory = useMemo(() => {
    return ['全部', ...new Set(productsAll.map((item) => item.category))]
  }, [productsAll])

  function handleSelectCategory(text) {
    setSelectCategory(text)
    navigate(`?category=${text}`)
  }

  const filteredProducts = useMemo(() => {
    if (selectCategory === '全部') return products
    return products.filter((product) => product.category === selectCategory)
  }, [selectCategory, products])

  return (
    <>
      <PageHeader
        pageTitle="推薦空間"
        imageUrl="https://images.unsplash.com/photo-1606836576983-8b458e75221d?q=80&w=1024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <div className="container">
        <div className="flex flex-col justify-between lg:flex-row lg:space-x-8">
          <div className="top-[calc(4.5rem_+_2rem)] mb-6 flex w-full flex-col self-start rounded-md border border-neutral-300 p-4 lg:sticky lg:mb-0 lg:w-[260px] lg:p-6">
            <div className="flex flex-col">
              <h3 className="ch-heading-4 pb-4 font-bold">分類</h3>
              <ul className="flex w-full flex-row items-center overflow-x-auto lg:flex-col lg:overflow-visible">
                {productsCategory.map((item) => {
                  return (
                    <li
                      key={item}
                      className={`group lg:w-full ${selectCategory === item && 'active'}`}
                    >
                      <div
                        className="after:ch-heading-3 flex h-[48px] cursor-pointer items-center p-3 transition-all after:ml-auto after:hidden after:font-['Material_Symbols_Outlined'] after:content-['chevron\_right'] group-[.active]:bg-neutral-400 group-[.active]:text-neutral-100 group-[.active]:after:block lg:h-auto lg:border-b lg:border-gray-200 lg:after:block"
                        onClick={() => handleSelectCategory(item)}
                      >
                        <div className="flex-1 whitespace-nowrap pr-2">{item}</div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div className="w-full lg:w-[75%] lg:flex-auto">
            {pageInfo?.total_pages >= 1 ? (
              <>
                <div className="grid grid-flow-row grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
                  {filteredProducts.map((item) => {
                    return (
                      <ProductItem
                        key={item.id}
                        productData={item}
                        imageClass="!h-[200px]"
                        textContentClass="!ml-0 !mt-0"
                        handleAddToCart={handleAddToCart}
                        itemClass="mb-10 lg:mb-20"
                      />
                    )
                  })}
                </div>
                {pageInfo.total_pages > 1 && (
                  <PaginationCustom pageInfo={pageInfo} changePage={asyncProductsData} />
                )}
              </>
            ) : (
              <div className="mx-auto flex max-w-[800px] flex-col justify-center space-y-4">
                <p className="ch-heading-3 text-center">找不到符合的關鍵字，請重新搜尋</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
