import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
Footer.propTypes = {
  linkList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      path: PropTypes.string
    })
  ),
  children: PropTypes.node
}
export default function Footer({ linkList }) {
  return (
    <footer className="bg-neutral-400">
      <div className="container">
        <div className="flex flex-col py-20 md:flex-row md:items-center md:justify-between md:py-[54px]">
          <p className="en-body md:en-title whitespace-nowrap pb-[26px] md:pb-0">
            <NavLink to={'/'} className="en-body whitespace-nowrap text-neutral-100">
              SPACE RENTAL
            </NavLink>
          </p>
          <nav>
            <div className="flex items-center space-x-6 lg:space-x-12">
              {linkList.map((item) => {
                return (
                  <NavLink key={item.title} to={item.path}>
                    <span className="ch-body block px-1 py-[12px] font-bold text-neutral-100 hover:text-secondary-100 md:p-3">
                      {item.title}
                    </span>
                  </NavLink>
                )
              })}
            </div>
          </nav>
        </div>
      </div>

      <div className="bg-neutral-400">
        <div className="container">
          <p className="ch-caption-2 md:ch-body py-3 text-center text-neutral-100/60 md:px-3">
            本網站僅供個人作品使用，不提供商業用途
          </p>
        </div>
      </div>
    </footer>
  )
}
