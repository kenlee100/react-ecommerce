import PropTypes from 'prop-types'

ProcessLoader.propTypes = {
  active: PropTypes.bool
}
export default function ProcessLoader({ active }) {
  return (
    <>
      {active && (
        <div className="fixed inset-0 z-30 flex items-center justify-center">
          <div className="relative z-30 h-12 w-12 animate-animation-rotate rounded-full before:absolute before:inset-0 before:animate-animation-prixClipFix before:rounded-full before:border-4 before:border-neutral-400 before:content-['']"></div>
          <div className="absolute h-full w-full bg-neutral-100 opacity-80"></div>
        </div>
      )}
    </>
  )
}
