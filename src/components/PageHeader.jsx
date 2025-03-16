export default function PageHeader({
  pageTitle,
  imageUrl = 'https://placehold.co/1024x768?text=No+Photo'
}) {
  return (
    <div className="mb-8 flex flex-col lg:mb-[60px]">
      <div className="relative overflow-hidden">
        <img src={imageUrl} className="h-[200px] w-full object-cover lg:h-[400px]" alt="" />
      </div>
      <div className="container">
        <div className="relative z-10 mx-auto flex w-full max-w-[400px] -translate-y-1/2 items-center justify-center bg-neutral-100">
          <h2 className="ch-heading-3 lg:ch-display relative px-6 py-2 text-center font-bold after:relative after:inset-x-0 after:-bottom-2 after:mx-auto after:block after:h-1 after:w-full after:bg-neutral-400 after:content-['']">
            {pageTitle}
          </h2>
        </div>
      </div>
    </div>
  )
}
