import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setMenuToggle, selectMenuToggle } from '@/redux/commonSlice'
import PropTypes from 'prop-types'

MobileMenu.propTypes = {
  linkList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      path: PropTypes.string
    })
  )
}
export default function MobileMenu({ linkList }) {
  const dispatch = useDispatch()
  const menuToggle = useSelector(selectMenuToggle)
  useEffect(() => {
    dispatch(setMenuToggle(false))
  }, [dispatch])

  useEffect(() => {
    if (menuToggle) {
      document.body.classList.add('overflow-hidden', 'md:overflow-auto')
    } else {
      document.body.classList.remove('overflow-hidden', 'md:overflow-auto')
    }
  }, [menuToggle])

  // 點連結時關閉手機選單
  function clickHandler() {
    dispatch(setMenuToggle(false))
  }
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 flex h-[calc(100%-72px)] flex-col bg-neutral-400 transition-all md:hidden ${menuToggle ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <nav className="flex h-full flex-col items-center justify-center py-4">
        <ul className="flex w-full flex-col items-center space-y-2 overflow-y-auto px-4 sm:px-[88px]">
          {linkList.map((item) => {
            return (
              <li className="w-full border-b border-neutral-300 text-center" key={item.path}>
                <Link
                  className="ch-caption-1 block py-8 font-normal text-neutral-300"
                  to={item.path}
                  onClick={clickHandler}
                >
                  {item.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
