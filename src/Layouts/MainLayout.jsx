import { Outlet } from "react-router-dom"

export const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Outlet/>
      </main>
    </div>
  )}