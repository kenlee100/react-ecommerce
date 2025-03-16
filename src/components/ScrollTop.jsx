import { useState, useEffect, useCallback } from 'react'
export default function ScrollTop() {
  const [isShow, setIsShow] = useState(false)
  const scrollToTop = useCallback(function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [])
  const handleScroll = useCallback(function () {
    const rootElement = document.documentElement
    const scrollTotal = rootElement.scrollHeight - rootElement.clientHeight
    if (rootElement.scrollTop / scrollTotal > 0.1) {
      setIsShow(true)
    } else {
      setIsShow(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])
  return (
    <div
      className={`invisible fixed bottom-10 right-3 z-20 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-secondary-100 text-neutral-100 opacity-0 shadow-lg transition-all ${isShow && '!visible !opacity-100'}`}
      title="返回最上層"
      onClick={scrollToTop}
    >
      <div className="ch-heading-1 material-symbols-outlined">expand_less</div>
    </div>
  )
}
