import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import { selectCartsData } from '@/redux/cartSlice'
import { setMenuToggle, selectMenuToggle } from '@/redux/commonSlice'
Header.propTypes = {
  linkList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      path: PropTypes.string
    })
  ),
  children: PropTypes.node
}
export default function Header({ linkList, children }) {
  const dispatch = useDispatch()
  const menuToggle = useSelector(selectMenuToggle)
  const cartCount = useSelector(selectCartsData).carts.length

  return (
    <header className="sticky inset-x-0 top-0 z-50 bg-neutral-100 shadow-md lg:h-auto">
      <div className="container">
        <div className="flex h-[72px] items-center justify-between py-4 lg:py-5">
          <NavLink to={'/'} className="en-body whitespace-nowrap">
            SPACE RENTAL
          </NavLink>
          <div className="flex items-center md:space-x-6 lg:space-x-24">
            <nav className="hidden md:block">
              <div className="flex items-center space-x-10">
                {linkList.map((item) => {
                  return (
                    <NavLink
                      key={item.title}
                      className={({ isActive }) => {
                        return `group ${isActive ? 'nav-active' : ''}`
                      }}
                      to={item.path}
                    >
                      <span className="ch-body block p-3 font-bold text-neutral-400 hover:text-secondary-200 group-[.nav-active]:text-secondary-200">
                        {item.title}
                      </span>
                    </NavLink>
                  )
                })}
              </div>
            </nav>
            <div className="flex space-x-2">
              <NavLink
                to="/cart"
                className="relative flex h-12 w-12 cursor-pointer items-center justify-center"
              >
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center text-secondary-200">
                  <span className="material-symbols-outlined text-heading-2">shopping_bag</span>
                </div>
                <p className="en-caption-02 absolute right-0 top-2 h-[22px] min-w-[22px] scale-90 rounded-full bg-secondary-100 px-1 py-0.5 text-center text-primary-100">
                  {cartCount}
                </p>
              </NavLink>
              <div
                className={`group flex h-[48px] w-[48px] flex-col justify-between px-[14px] py-4 md:hidden ${menuToggle && 'active'}`}
                onClick={() => dispatch(setMenuToggle(!menuToggle))}
              >
                <span className="h-0.5 w-full rounded-sm bg-secondary-200 duration-[400ms] ease-in-out group-[.active]:origin-[0%_0%] group-[.active]:rotate-45"></span>
                <span className="h-0.5 w-full rounded-sm bg-secondary-200 duration-[200ms] ease-in-out group-[.active]:scale-y-0"></span>
                <span className="h-0.5 w-full rounded-sm bg-secondary-200 duration-[400ms] ease-in-out group-[.active]:origin-[0%_100%] group-[.active]:-rotate-45"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {children}
    </header>
  )
}
