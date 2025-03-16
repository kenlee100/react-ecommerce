import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { getProducts, getProductsAll, getProductItem } from '@apis/products'

import { setIsLoading } from '@/redux/commonSlice'

export const productSlice = createSlice({
  name: 'productSlice',
  initialState: {
    products: [],
    productsAll: [],
    productContent: {
      category: '',
      content: '',
      description: '',
      id: '',
      imageUrl: '',
      imagesUrl: [],
      is_enabled: 0,
      origin_price: 0,
      price: 0,
      title: '',
      unit: ''
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
    setProducts: (state, action) => {
      state.products = action.payload
    },
    setPageInfo: (state, action) => {
      state.pageInfo = action.payload
    },
    setProductsAll: (state, action) => {
      state.productsAll = action.payload
    },
    setProductContent: (state, action) => {
      state.productContent = action.payload
    }
  }
})

export const asyncProductsData = createAsyncThunk(
  'productSlice/getProductsData',
  async (content, { dispatch }) => {
    dispatch(setIsLoading(true))
    try {
      const res = await getProducts(content)

      const { products, pagination } = res
      await dispatch(setProducts(products))
      await dispatch(setPageInfo(pagination))
    } catch (error) {
      console.error(error)
    } finally {
      dispatch(setIsLoading(false))
    }
  }
)

export const asyncProductsAll = createAsyncThunk(
  'productSlice/getProductsAll',
  async (content, { dispatch }) => {
    dispatch(setIsLoading(true))
    try {
      const res = await getProductsAll()
      const { products } = res
      dispatch(setProductsAll(products))
    } catch (error) {
      console.error(error)
    } finally {
      dispatch(setIsLoading(false))
    }
  }
)
export const asyncProductsItem = createAsyncThunk(
  'productSlice/getProductItem',
  async (content, { dispatch }) => {
    dispatch(setIsLoading(true))
    try {
      const res = await getProductItem(content)
      const { product } = res
      dispatch(setProductContent(product))
    } catch (error) {
      console.error(error)
    } finally {
      dispatch(setIsLoading(false))
    }
  }
)

export const { setProducts, setPageInfo, setProductsAll, setProductContent } = productSlice.actions

export const selectProducts = (state) => state.productSlice.products
export const selectProductsAll = (state) => state.productSlice.productsAll
export const selectPageInfo = (state) => state.productSlice.pageInfo
export const selectProductContent = (state) => state.productSlice.productContent

export default productSlice.reducer
