import { create } from 'zustand'

export const useProducts = create((set) => ({
  products: [
    { id: 1, name: "E-commerce Website",   client: "Nile Store",      status: "In Progress", deadline: "2026-12-10", budget: 2500, progress: 60,  type: "Development" },
    { id: 2, name: "Brand Logo Design",    client: "Cairo Coffee",    status: "Completed",   deadline: "2026-11-01", budget: 400,  progress: 100, type: "Design" },
    { id: 3, name: "Mobile App UI",        client: "FitLife",         status: "Completed", deadline: "2026-12-20", budget: 1800, progress: 35,  type: "Design" },
    { id: 4, name: "Landing Page",         client: "Delta Travel",    status: "Overdue",     deadline: "2026-11-15", budget: 600,  progress: 80,  type: "Development" },
    { id: 5, name: "Admin Panel",          client: "Alex Logistics",  status: "Pending",     deadline: "2027-01-05", budget: 3200, progress: 0,   type: "Development" },
    { id: 6, name: "SEO & Bug Fixes",      client: "Giza Clinic",     status: "Completed",   deadline: "2026-10-25", budget: 350,  progress: 100, type: "Testing" },
    { id: 7, name: "Portfolio Website",    client: "Sara Ahmed",      status: "In Progress", deadline: "2026-12-01", budget: 700,  progress: 50,  type: "Development" },
  ],
 
}))