import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { LayoutProvider } from '@/components/LayoutContext'

import Loading from '@/components/Loading'
import ProcessLoader from '@/components/ProcessLoader'
import Header from '@/components/Header'
import MobileMenu from '@/components/MobileMenu'
import Footer from '@/components/Footer'
import ScrollTop from '@/components/ScrollTop'
import AutoScrollTop from '@/components/AutoScrollTop'

import { linkList } from '@/routes/linkList'

import { useDispatch, useSelector } from 'react-redux'
import { asyncCartData } from '@/redux/cartSlice'
import { selectLoading, selectProcessing } from '@/redux/commonSlice'

function Layout() {
  return (
    <LayoutProvider>
      <LayoutContent />
    </LayoutProvider>
  )
}

function LayoutContent() {
  const dispatch = useDispatch()
  const isLoading = useSelector(selectLoading)
  const isProcessing = useSelector(selectProcessing)

  useEffect(() => {
    dispatch(asyncCartData())
  }, [dispatch])

  return (
    <>
      <MobileMenu linkList={linkList} />
      <Header linkList={linkList} />
      <div className="layout-content">
        <ProcessLoader active={isProcessing} />
        <Outlet />
        <ScrollTop />
        <AutoScrollTop />
      </div>
      <Footer linkList={linkList} />
      <Loading isLoading={isLoading} />
    </>
  )
}

export default Layout
