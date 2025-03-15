import request from '@utils/request'

export const sendOrder = (data) =>
  request({
    url: `/order`,
    method: 'post',
    data
  })

export const getOrder = (orderId) =>
  request({
    url: `/order/${orderId}`,
    method: 'get'
  })

export const payOrder = (id) =>
  request({
    url: `/pay/${id}`,
    method: 'post'
  })

export const addCoupon = (data) =>
  request({
    url: `/coupon`,
    method: 'post',
    data
  })
