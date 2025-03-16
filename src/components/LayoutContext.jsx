import { useState } from 'react'
import PropTypes from 'prop-types'
import { LayoutContext } from '@/contexts/LayoutContext'

LayoutProvider.propTypes = {
  children: PropTypes.node
}
export function LayoutProvider({ children }) {
  const [cartList, setCartList] = useState({})

  const [isLoading, setIsLoading] = useState(false)

  const contextValue = {
    cartList,
    setCartList,
    isLoading,
    setIsLoading
  }
  return <LayoutContext.Provider value={contextValue}>{children}</LayoutContext.Provider>
}
