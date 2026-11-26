import { Outlet } from "react-router-dom"
import { Navbar } from "../Components/Navbar"
import { Footer } from "../Components/Footer"

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-slate-900 dark:text-slate-100">
      <Navbar />
      <main>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  )}