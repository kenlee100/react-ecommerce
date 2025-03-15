import request from '@utils/request'
export const addToCart = (data) => {
  return request({
    url: `/cart`,
    method: 'post',
    data
  })
}
export const getCart = () =>
  request({
    url: `/cart`,
    method: 'get'
  })
export const deleteCartItem = (id) => {
  return request({
    url: `/cart/${id}`,
    method: 'delete'
  })
}
export const deleteAllCart = () =>
  request({
    url: `/carts`,
    method: 'delete'
  })
export const updateCartItem = (data, id) =>
  request({
    url: `/cart/${id}`,
    method: 'put',
    data
  })
