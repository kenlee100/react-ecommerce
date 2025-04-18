import PropTypes from 'prop-types'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

PaginationCustom.propTypes = {
  pageInfo: PropTypes.shape({
    has_next: PropTypes.bool,
    has_pre: PropTypes.bool,
    total_pages: PropTypes.number,
    current_page: PropTypes.number
  }),
  changePage: PropTypes.func
}
export default function PaginationCustom({ pageInfo, changePage }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handlePage = useCallback(
    function (e, num) {
      e.preventDefault()
      navigate(`?page=${num}`)
      dispatch(changePage({ page: num }))
    },
    [changePage, dispatch, navigate]
  )
  return (
    <nav className="py-8">
      <ul className="flex items-center justify-center space-x-2">
        <li className={`group ${!pageInfo.has_pre && 'disabled'}`}>
          <a
            href="#"
            className="ch-heading-4 flex h-12 w-12 items-center justify-center rounded bg-neutral-200 font-semibold text-neutral-400 group-[.disabled]:cursor-not-allowed group-[.disabled]:opacity-30"
            onClick={(e) => {
              if (pageInfo.has_pre) {
                handlePage(e, pageInfo.current_page - 1)
              } else {
                e.preventDefault()
              }
            }}
          >
            <span className="material-symbols-outlined"> chevron_left </span>
          </a>
        </li>
        {[...Array(pageInfo.total_pages).keys()].map((page) => {
          const pageNumber = page + 1
          return (
            <li
              className={`group ${pageInfo.current_page === pageNumber && 'active'}`}
              key={`page-${page}`}
              onClick={(e) => handlePage(e, pageNumber)}
            >
              {pageInfo.current_page === pageNumber ? (
                <span className="ch-heading-4 flex h-12 w-12 items-center justify-center rounded bg-neutral-200 font-semibold text-neutral-300 group-[.active]:bg-secondary-200 group-[.active]:text-neutral-100">
                  {pageNumber}
                </span>
              ) : (
                <a
                  className="ch-heading-4 flex h-12 w-12 items-center justify-center rounded bg-neutral-200 font-semibold text-neutral-400"
                  href="#"
                  onClick={(e) => handlePage(e, pageInfo.current_page + 1)}
                >
                  {pageNumber}
                </a>
              )}
            </li>
          )
        })}
        <li className={`group ${!pageInfo.has_next && 'disabled'}`}>
          <a
            className="ch-heading-4 flex h-12 w-12 items-center justify-center rounded bg-neutral-200 font-semibold text-neutral-400 group-[.disabled]:cursor-not-allowed group-[.disabled]:opacity-30"
            href="#"
            onClick={(e) => {
              if (pageInfo.has_next) {
                handlePage(e, pageInfo.current_page + 1)
              } else {
                e.preventDefault()
              }
            }}
          >
            <span className="material-symbols-outlined"> chevron_right </span>
          </a>
        </li>
      </ul>
    </nav>
  )
}
