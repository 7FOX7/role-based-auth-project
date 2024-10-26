"use client"

import { deleteSession } from "../lib/session"
import { redirect } from "next/navigation"

export default function Logout() {
   async function handleLogout() {
      deleteSession()
      redirect('/login')
   }

   return (
      <div className="absolute left-4 bottom-8">
         <button 
            type="button" 
            className="text-white bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:focus:ring-emerald-800 shadow-lg shadow-emerald-500/50 dark:shadow-lg dark:shadow-emerald-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={handleLogout}
         >
            Logout
         </button>
      </div>
   )
}