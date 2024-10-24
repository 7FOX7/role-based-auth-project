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

   const [barColor, setBarColor] = useState('none'); 
   const [barWidth, setBarWidth] = useState('w-0');  
   const [passwordMessage, setPasswordMessage] = useState(''); 

   const router = useRouter(); 
   const [state, formAction] = useActionState(register, initialState)
      
   function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
      if(strongPasswordRegex.test(e.target.value)) {
         setBarColor('bg-green-500')
         setBarWidth('w-6/6')
         setPasswordMessage('Password is strong!')
      }
      else if(mediumPasswordRegex.test(e.target.value)) {
         setBarColor('bg-orange-500')
         setBarWidth('w-4/6')
         setPasswordMessage('Password should include at least: 1 Uppercase letter, 1 Number, 1 Special character')
      }
      else {
         setBarColor('bg-red-500')
         setBarWidth('w-2/6')
         setPasswordMessage('Password should include at least: 1 Uppercase letter, 1 Number, 1 Special character')
      }
   }

   function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
      const {name, value} = e.target
      setInputValues((prev) => ({...prev, [name]: value}))
   }

   return (
      <>
      <form action={formAction} className="flex flex-col">
         <input 
            name="firstName" 
            aria-describedby="firstName-error" 
            className="mb-5" 
            type="text" 
            placeholder="First Name" 
            value={inputValues.firstName}
            onChange={handleInputChange}
         />
         <div 
            id="firstName-error" 
            aria-live="polite" 
            aria-atomic="true"
         >
            {state?.errors?.firstName?.map((error) => {
               return <p key={error} className="mt-2 text-sm text-red-500">{error}</p>
            })}
         </div>
         <input 
            name="lastName" 
            aria-describedby="lastName-error" 
            className="mb-5" 
            type="text" 
            placeholder="Last Name" 
            value={inputValues.lastName}
            onChange={handleInputChange}
         />
         <div 
            id="lastName-error" 
            aria-live="polite" 
            aria-atomic="true"
         >
            {state?.errors?.lastName?.map((error) => {
               return <p key={error} className="mt-2 text-sm text-red-500">{error}</p>
            })}
         </div>
         <input 
            name="email" 
            aria-describedby="email-error" 
            className="mb-5" 
            type="text" 
            placeholder="Email"
            value={inputValues.email}
            onChange={handleInputChange}
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
            aria-describedby="password-error" 
            className="mb-5" 
            type="text" 
            placeholder="Password" 
            onChange={handlePasswordChange}
         />
         {passwordMessage ? 
         <PasswordStrengthBar barColor={barColor} barWidth={barWidth} passwordMessage={passwordMessage} />
         : 
         <div 
            id="password-error" 
            aria-live="polite" 
            aria-atomic="true"
         >
            {state?.errors?.password?.map((error) => {
               return <p key={error} className="mt-2 text-sm text-red-500">{error}</p>
            })}
         </div>
         }
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
      <button onClick={() => router.replace('/login')}>Already registered? Sign in instead</button>
      </>
   )
}