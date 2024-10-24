"use server"

import { z } from "zod";
import isValidEmail from "../utils/regex/email-validity";
import { isStrongPassword } from "../utils/regex/password-strength";
import { State } from "../lib/definitions";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); 

const FormSchema = z.object({
   firstName: z.string().min(1, "First name is required"),
   lastName: z.string().min(1, "Last name is required"), 
   email: z.string().refine((val) => isValidEmail(val), "Email is not valid"),
   password: z.string().refine((val) => isStrongPassword(val), "Password should include at least: 1 Uppercase letter, 1 Number, 1 Special character"), 
})

export async function createUser(prevState: State, formData: FormData) {
   const validatedEntries = FormSchema.safeParse({
      firstName: formData.get('firstName'), 
      lastName: formData.get('lastName'), 
      email: formData.get('email'), 
      password: formData.get('password')
   })

   if(!validatedEntries.success) {
      console.log('the error is about to be thrown')
      return {
         errors: validatedEntries.error.flatten().fieldErrors,  
         message: 'Missing fields. Failed to create a new user.'
      }

   }

   const {firstName, lastName, email, password} = validatedEntries.data
   try {
      const user = await prisma.user.create({
         data: {
            firstName: firstName.trim(), 
            lastName: lastName.trim(), 
            email: email.trim(), 
            password: password.trim()
         }
      })
      console.log(user)
   }
   catch(err) {
      throw new Error('Server Error. Failed to create a new user: ' + err)
   }

   redirect('/')
}