'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"
import { useActionState } from "react"
import { State } from "../../lib/definitions"
import { createUser } from "../../actions/registration-form-action"
import { mediumPasswordRegex } from "@/app/utils/regex/password-strength"
import { strongPasswordRegex } from "@/app/utils/regex/password-strength"
import PasswordStrengthBar from "./password-strength-bar"

const initialState: State = {
   errors: {}, 
   message: ''
}

export default function RegistrationForm() {
   const [barColor, setBarColor] = useState('none'); 
   const [barWidth, setBarWidth] = useState('w-0');  
   const [passwordMessage, setPasswordMessage] = useState(''); 
   const router = useRouter(); 
   const [state, formAction] = useActionState(createUser, initialState)
   function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
      console.log('the event value is: ' + e.target.value)
      if(strongPasswordRegex.test(e.target.value)) {
         setBarColor('bg-green-500')
         setBarWidth('w-6/6')
         setPasswordMessage('Password is strong!')
      }
      else if(mediumPasswordRegex.test(e.target.value)) {
         setBarColor('bg-orange-500')
         setBarWidth('w-4/6')
      }
      else {
         setBarColor('bg-red-500')
         setBarWidth('w-2/6')
         setPasswordMessage('Password should include at least: 1 Uppercase letter, 1 Number, 1 Special character')
      }
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
      </form>
      <button onClick={() => router.replace('/login')}>Already registered? Sign in instead</button>
      </>
   )
}

/*
   the idea: implement the dynamic password checking

   possible implementation: 

   add the 'onChange' listener to the password; 

   whenever the user is typing something in, use 'isValidPassword' function to check if the password is strong enough; 
   
*/