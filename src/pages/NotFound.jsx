import { Link } from 'react-router-dom'
import PageHeader from '@/components/PageHeader'
export default function NotFound() {
  return (
    <>
      <PageHeader
        pageTitle="404"
        imageUrl="https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <div className="container">
        <div className="mx-auto flex max-w-[800px] flex-col justify-center space-y-4">
          <p className="ch-heading-3 text-center">
            喔不！這裡什麼都沒有。
            <br />
            請確認您的網址是否正確
          </p>
          <div className="py-4 text-center">
            <Link className="btn-base bg-secondary-100 text-neutral-100" to="/">
              返回首頁
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
