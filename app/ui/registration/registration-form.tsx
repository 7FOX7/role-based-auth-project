'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"
import { useActionState } from "react"
import { State } from "../../lib/definitions"
import register from "../../actions/registration-form-action"
import { mediumPasswordRegex } from "@/app/utils/regex/password-regex"
import { strongPasswordRegex } from "@/app/utils/regex/password-regex"
import PasswordStrengthBar from "./password-strength-bar"

const initialState: State = {
   errors: {}, 
   message: ''
}

export default function RegistrationForm() {
   const [inputValues, setInputValues] = useState({
      firstName: '', 
      lastName: '', 
      email: '', 
   })

   const [passwordIsVisible, setPasswordIsVisible] = useState(false); 
   const [barColor, setBarColor] = useState('none'); 
   const [barWidth, setBarWidth] = useState('w-0');  

   const router = useRouter(); 
   const [state, formAction] = useActionState(register, initialState)
   
   function handleRedirect() {
      router.replace('/login')
   }

   function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
      if(strongPasswordRegex.test(e.target.value)) {
         setBarColor('bg-green-500')
         setBarWidth('w-6/6')
      }
      else if(mediumPasswordRegex.test(e.target.value)) {
         setBarColor('bg-orange-500')
         setBarWidth('w-4/6')
      }
      else {
         setBarColor('bg-red-500')
         setBarWidth('w-2/6')
      }
   }

   function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
      const {name, value} = e.target
      setInputValues((prev) => ({...prev, [name]: value}))
   }

   return (
      <>
      <div className="relative mb-8 w-3/4 md:w-2/4 bg-emerald-500 p-5 break-all">
         <p>If you want to try as an <span className="italic font-semibold">Admin</span>, you need to login instead.</p>
      </div>
      <form action={formAction}>
         <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div className="w-full">
               <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-emerald-400">First name</label>
               <input 
                  type="text" 
                  id="firstName"
                  name="firstName" 
                  aria-describedby="firstName-error" 
                  className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500 " 
                  placeholder="Evgenii" 
                  value={inputValues.firstName}
                  onChange={handleInputChange}
               />
               <div 
                  id="firstName-error" 
                  aria-live="polite" 
                  aria-atomic="true"
                  className="w-56"
               >
                  {state?.errors?.firstName?.map((error) => {
                     return <p key={error} className="mt-2 text-sm text-red-500">{error}</p>
                  })}
               </div>
            </div>
            <div className="w-full">
               <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-emerald-400">Last name</label>
               <input 
                  type="text" 
                  id="lastName"
                  name="lastName" 
                  aria-describedby="lastName-error" 
                  className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
                  placeholder="Khe" 
                  value={inputValues.lastName}
                  onChange={handleInputChange}
               />
               <div 
                  id="lastName-error" 
                  aria-live="polite" 
                  aria-atomic="true"
                  className="w-56"
               >
                  {state?.errors?.lastName?.map((error) => {
                     return <p key={error} className="mt-2 text-sm text-red-500">{error}</p>
                  })}
               </div>
            </div>
            <div className="w-full">
               <label htmlFor="email" className="block mb-2 text-sm font-medium text-emerald-400">Email</label>
               <input 
                  type="text" 
                  id="email"
                  name="email" 
                  aria-describedby="email-error" 
                  className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
                  placeholder="sample@gmail.com"
                  value={inputValues.email}
                  onChange={handleInputChange}
               />
               <div 
                  id="email-error" 
                  aria-live="polite" 
                  aria-atomic="true"
                  className="w-56"
               >
                  {state?.errors?.email?.map((error) => {
                     return <p key={error} className="mt-2 text-sm text-red-500">{error}</p>
                  })}
               </div>
            </div>
            <div className="relative w-full">
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-emerald-400">Password</label>  
                  <input 
                     type={passwordIsVisible ? "text" : "password"}
                     id="password"
                     name="password" 
                     aria-describedby="password-error" 
                     className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 block p-2.5 w-full pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" 
                     onChange={handlePasswordChange}
                  />
                  <span 
                     className="absolute right-2 top-9 cursor-pointer hover:bg-gray-300 rounded-md"
                     onClick={() => setPasswordIsVisible((prevVal) => !prevVal)}
                  >
                     {passwordIsVisible ? 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                        : 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                           <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                     }
                  </span>
                  <PasswordStrengthBar barColor={barColor} barWidth={barWidth} />
                  <div 
                     id="password-error" 
                     aria-live="polite" 
                     aria-atomic="true"
                     className="w-60 md:w-56"
                  >
                     {state?.errors?.password?.map((error) => {
                        return <p key={error} className="mt-2 text-sm text-red-500">{error}</p>
                     })}
                  </div>
               </div>
               {state?.message && 
                  <div>
                     <p className="mt-2 text-sm text-red-500">{state.message}</p>
                  </div>
               }
         </div>
         <div className="flex flex-col md:flex-row justify-center items-center">
            <button 
               type="submit"
               className="text-black bg-emerald-400 hover:bg-emerald-600 focus:ring-2 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg px-5 w-fit py-2.5 text-center mb-6 md:mr-5 md:mb-0"
            >
               Register
            </button>
            <button 
               type="reset"
               onClick={handleRedirect}
               className="text-black bg-white hover:bg-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg sm:w-auto px-5 py-2.5 w-fit text-center md:ml-5"
            >
               Already registered? Login instead
            </button>
         </div>
      </form>
      </>
   )
}