import { Outlet } from "react-router-dom"
import { Navbar } from "../Components/Navbar"
import { Footer } from "../Components/Footer"

export const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  )}