'use client'

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginForm() {
   const [emailValue, setEmailValue] = useState('')
   const router = useRouter()

   function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
      const {value} = e.target;

      setEmailValue(value)
   }

   function handleSubmit(e: FormEvent) {
      e.preventDefault()
   }
   return (
      <>
         <form onSubmit={handleSubmit} className="flex flex-col">
            <input 
               name="email"
               className="mb-5" 
               type="text" 
               placeholder="Email"
               value={emailValue}
               onChange={handleInput} 
            />
            <input 
               name="password"
               className="mb-5" 
               type="text" 
               placeholder="Password" 
            />
            <button 
               className="bg-red-500" 
               type="submit"
            >
               Submit
            </button>
         </form>
         <button onClick={() => router.replace('/registration')}>First time? Register instead</button>
      </>
   )
}