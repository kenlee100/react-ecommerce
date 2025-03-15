import PropTypes from 'prop-types'
CartStep.propTypes = {
  currentStep: PropTypes.number
}
export default function CartStep({ currentStep }) {
  return (
    <div className="steps [&:not(:last-child)]:mb-10">
      <div className="steps-list">
        <div
          className={`steps-list__item -active ${currentStep === 2 && '-checked'} ${currentStep === 3 && '-active -checked'}`}
        >
          <div className="steps-list__group">
            <div className="steps-list__point">
              <div className="steps-list__badge">
                <p className={`steps-list__text ${currentStep >= 2 && '!hidden'}`}>1</p>
                {currentStep > 1 && (
                  <div className="flex items-center justify-center">
                    <span className="material-symbols-outlined ch-heading-1 text-neutral-100">
                      done
                    </span>
                  </div>
                )}
              </div>
              <p className="steps-list__title">購物車</p>
            </div>
            <div className="steps-list__line"></div>
          </div>
        </div>
        <div
          className={`steps-list__item ${currentStep === 3 && '-active -checked'} ${currentStep === 2 && '-active'}`}
        >
          <div className="steps-list__group">
            <div className="steps-list__content">
              <div className="steps-list__badge">
                <p className={`steps-list__text ${currentStep === 3 && '!hidden'}`}>2</p>
                {currentStep > 2 && (
                  <div className="flex items-center justify-center">
                    <span className="material-symbols-outlined ch-heading-1 text-neutral-100">
                      done
                    </span>
                  </div>
                )}
              </div>
              <p className="steps-list__title">確認訂單</p>
            </div>
            <div className="steps-list__line"></div>
          </div>
        </div>
        <div className={`steps-list__item ${currentStep === 3 && '-active'}`}>
          <div className="steps-list__group">
            <div className="steps-list__content">
              <div className="steps-list__badge">
                <p className={`steps-list__text ${currentStep === 3 && '!hidden'}`}>3</p>
                {currentStep === 3 && (
                  <div className="flex items-center justify-center">
                    <span className="material-symbols-outlined ch-heading-1 text-neutral-100">
                      done
                    </span>
                  </div>
                )}
              </div>
              <p className="steps-list__title">訂單完成</p>
            </div>
            <div className="steps-list__line"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
