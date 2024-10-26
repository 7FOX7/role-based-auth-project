"use client"

import { useState } from "react";
import Link from "next/link";

export default function Header() { 
   const [showMenu, setShowMenu] = useState(false)
   return (
     <header className="fixed top-0 left-0 w-full flex items-center justify-end p-2 bg-emerald-500">
       <nav className="invisible md:visible font-semibold">
         <Link 
            href="/" 
            className="hover:text-gray-500"
         >
           Home
         </Link>
       </nav>
       <nav className="visible md:invisible font-semibold flex items-center justify-center">
         <button
           onClick={() => setShowMenu(!showMenu)}
           className="font-bold text-xl hover:text-gray-500"
         >
           {showMenu ? 
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
               </svg>
               : 
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
               </svg>
            }
         </button>
         {showMenu && (
            <Link 
               href="/" 
               className="hover:text-gray-500"
            >
               Home
            </Link>
         )}
         </nav>
     </header>
   );
 }