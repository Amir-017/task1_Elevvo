import { Outlet } from "react-router-dom"
import { Navbar } from "../Components/Navbar"

export const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Outlet/>
      </main>
    </div>
  )}