'use client'

import { useState } from "react"
import { useActionState } from "react"
import { useRouter } from "next/navigation"
import { State } from "@/app/lib/definitions"
import login from "@/app/actions/login-form-action"

const initialState: State = {
   errors: {}, 
   message: ''
}

export default function LoginForm() {
   const [emailValue, setEmailValue] = useState('')
   const [state, formAction] = useActionState(login, initialState)
   const router = useRouter()

   function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
      const {value} = e.target;
      setEmailValue(value)
   }

   return (
      <>
         <form action={formAction} className="flex flex-col">
            <input 
               name="email"
               className="mb-5" 
               aria-labelledby="email-error"
               type="text" 
               placeholder="Email"
               value={emailValue}
               onChange={handleInput} 
            />
            <div 
               id="email-error" 
               aria-live="polite" 
               aria-atomic="true"
            >
               {state?.errors?.email?.map((error) => {
                  return <p key={error} className="mt-2 text-sm text-red-500">{error}</p>
               })}
            </div>
            <input 
               name="password"
               className="mb-5" 
               aria-labelledby="password-error"
               type="text" 
               placeholder="Password" 
            />
            <div 
               id="password-error" 
               aria-live="polite" 
               aria-atomic="true"
            >
               {state?.errors?.password?.map((error) => {
                  return <p key={error} className="mt-2 text-sm text-red-500">{error}</p>
               })}
            </div>
            <button 
               className="bg-red-500" 
               type="submit"
            >
               Submit
            </button>
            {state?.message && 
               <div>
                  <p className="mt-2 text-sm text-red-500">{state.message}</p>
               </div>
            }
         </form>
         <button onClick={() => router.replace('/registration')}>First time? Register instead</button>
      </>
   )
}