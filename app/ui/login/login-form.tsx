'use client'
import { useRouter } from "next/navigation"

export default function LoginForm() {
   const router = useRouter()
   return (
      <>
         <form className="flex flex-col">
            <input className="mb-5" type="text" placeholder="Email" />
            <input className="mb-5" type="text" placeholder="Password" />
            <button className="bg-red-500" type="submit">Submit</button>
         </form>
         <button onClick={() => router.replace('/registration')}>First time? Register instead</button>
      </>
   )
}