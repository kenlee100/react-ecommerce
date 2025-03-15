import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
ProductItem.propTypes = {
  productData: PropTypes.shape({
    id: PropTypes.string,
    category: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    imagesUrl: PropTypes.arrayOf(PropTypes.string),
    is_enabled: PropTypes.number,
    origin_price: PropTypes.number,
    price: PropTypes.number,
    title: PropTypes.string,
    unit: PropTypes.string
  }),
  textContentClass: PropTypes.string,
  imageClass: PropTypes.string,
  itemClass: PropTypes.string,
  handleAddToCart: PropTypes.func
}
export default function ProductItem({
  imageClass,
  productData,
  textContentClass,
  handleAddToCart,
  itemClass
}) {
  function handleButtonClick(e) {
    e.stopPropagation()
    e.preventDefault()
    handleAddToCart({
      product_id: productData.id,
      qty: 1
    })
  }
  return (
    <Link
      to={`/product/${productData.id}`}
      className={`group flex w-full flex-shrink-0 flex-col ${itemClass}`}
    >
      <div className="relative flex w-full flex-shrink-0 overflow-hidden">
        <img
          src={productData.imageUrl}
          className={`h-[200px] w-full object-cover transition-all ease-in-out group-hover:scale-[1.1] lg:h-[480px] ${imageClass}`}
          alt={'productData.title'}
        />
      </div>
      <div
        className={`relative z-10 flex flex-1 flex-col bg-secondary-100 px-5 py-6 lg:-mt-[84px] lg:ml-[110px] lg:px-9 ${textContentClass}`}
      >
        <div className="[&:not(:last-child)]:mb-3 lg:[&:not(:last-child)]:mb-8">
          <div className="flex items-start [&:not(:last-child)]:mb-2">
            <div className="ch-heading-4 mt-0.5 flex h-4 w-4 flex-shrink-0 items-center font-semibold text-neutral-100 lg:mt-1 [&:not(:last-child)]:mr-3">
              <span className="material-symbols-outlined">chair</span>
            </div>
            <p className="ch-caption-2 lg:ch-body text-neutral-100 lg:font-bold">
              {productData.category}
            </p>
          </div>
          <h3>
            <p className="ch-body lg:ch-heading-3 line-clamp-2 font-bold text-neutral-100">
              {productData.title}
            </p>
          </h3>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <p className="en-caption-01 lg:en-body text-neutral-100 [&:not(:last-child)]:mr-4">
            ${productData.price}
          </p>

          <button
            className="btn-base flex-shrink-0 bg-secondary-200 text-neutral-100"
            type="button"
            onClick={handleButtonClick}
          >
            加入購物車
          </button>
        </div>
      </div>
    </Link>
  )
}
