import { createHashRouter } from 'react-router-dom'
import App from '@/App'

import Layout from '@/pages/Layout'
import Home from '@/pages/Home'
import Products from '@/pages/Products'
import SingleProduct from '@/pages/SingleProduct'
import Cart from '@/pages/CartPage'
import Order from '@/pages/OrderPage'
import Checkout from '@/pages/CheckoutPage'
import About from '@/pages/About'
import NotFound from '@/pages/NotFound'

export const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: '',
            element: <Home />
          },
          {
            path: 'products',
            element: <Products />
          },
          {
            path: 'product/:productId',
            element: <SingleProduct />
          },
          {
            path: 'cart',
            element: <Cart />
          },
          {
            path: 'order',
            element: <Order />
          },
          {
            path: '/checkout/:orderId',
            element: <Checkout />
          },
          {
            path: 'about',
            element: <About />
          },
          {
            path: '*',
            element: <NotFound />
          }
        ]
      }
    ]
  }
]
const router = createHashRouter(routes, {
  scrollBehavior: 'auto'
})
export default router
