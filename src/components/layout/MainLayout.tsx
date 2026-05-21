import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import './MainLayout.css'

export function MainLayout() {
  return (
    <div className="site-layout">
      <Header />
      <main className="site-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
