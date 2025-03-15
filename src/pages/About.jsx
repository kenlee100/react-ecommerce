import PageHeader from '@/components/PageHeader'
import AboutItem from '@/components/AboutItem'
const aboutData = [
  {
    title: '多元空間選擇',
    description: '提供各種大小的場地，適用於研討會、技術交流、節慶活動和表演等多種用途。',
    imageUrl:
      'https://images.unsplash.com/photo-1461782296610-c552d61b149a?q=80&w=1024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    title: '完善設備',
    description: '場地配備現代化設施，確保活動順利進行。',

    imageUrl:
      'https://images.unsplash.com/photo-1516315720917-231ef9acce48?q=80&w=1024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    title: '彈性租賃',
    description: '以小時計費，讓您靈活安排活動時間，提升資源利用效率。',
    imageUrl:
      'https://images.unsplash.com/photo-1638202947561-e372255007b3?q=80&w=1024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    title: '便捷預訂',
    description: '透過我們的線上平台，您可以輕鬆瀏覽、比較並預訂理想的場地。',

    imageUrl:
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
]
export default function About() {
  return (
    <>
      <PageHeader
        pageTitle="關於我們"
        imageUrl="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <div className="container">
        <div className="grid grid-flow-row gap-10 md:gap-0">
          {aboutData.map((item, index) => {
            return (
              <AboutItem
                key={item.title}
                itemIndex={index}
                title={item.title}
                description={item.description}
                imageUrl={item.imageUrl}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}
