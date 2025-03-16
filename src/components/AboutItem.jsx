import PropTypes from 'prop-types'

AboutItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  itemIndex: PropTypes.number,
  imageUrl: PropTypes.string
}
export default function AboutItem({ title, description, itemIndex, imageUrl }) {
  return (
    <>
      {itemIndex % 2 === 0 && (
        <div className="relative flex flex-col md:mb-20 md:mt-[60px] md:flex-row">
          <div className="flex w-full md:w-[60%]">
            <img
              src={imageUrl}
              className="h-[300px] w-full object-cover lg:h-[400px]"
              alt="title"
            />
          </div>
          <div className="relative z-10 -mt-8 ml-4 bg-neutral-200 p-4 md:absolute md:-top-[60px] md:left-[55%] md:mt-0 md:w-[35%] md:px-[32px] md:py-6">
            <div className="[&:not(:last-child)]:mb-5">
              <h3 className="flex items-start [&:not(:last-child)]:mb-2">
                <p className="ch-body lg:ch-heading-2 line-clamp-2 font-bold text-secondary-100">
                  {title}
                </p>
              </h3>
              <div>
                <p className="ch-caption-2 lg:ch-body line-clamp-5 font-normal text-neutral-300">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {itemIndex % 2 === 1 && (
        <div className="relative flex flex-col md:mb-20 md:mt-[60px] md:flex-row">
          <div className="ml-auto flex w-full md:w-[60%]">
            <img
              src={imageUrl}
              className="h-[250px] w-full object-cover lg:h-[400px]"
              alt="title"
            />
          </div>
          <div className="relative z-10 -mt-8 mr-4 bg-neutral-200 p-4 md:absolute md:-top-[60px] md:right-[55%] md:mt-0 md:w-[35%] md:px-[32px] md:py-6">
            <div className="[&:not(:last-child)]:mb-5">
              <h3 className="flex items-start [&:not(:last-child)]:mb-2">
                <p className="ch-body lg:ch-heading-2 line-clamp-2 font-bold text-secondary-100">
                  {title}
                </p>
              </h3>
              <div>
                <p className="ch-caption-2 lg:ch-body line-clamp-5 font-normal text-neutral-300">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
