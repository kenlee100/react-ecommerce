import request from '@utils/request'

export const getProducts = (query) => {
  const searchParams = new URLSearchParams(query)
  return request({
    url: `/products?${searchParams.toString()}`,
    method: 'get'
  })
}

export const getProductsAll = () => {
  return request({
    url: `/products/all`,
    method: 'get'
  })
}

export const getProductItem = (id) =>
  request({
    url: `/product/${id}`,
    method: 'get'
  })
