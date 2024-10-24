"use server"

import { z } from "zod";
import { emailRegex } from "../utils/regex/email-regex";
import { State } from "../lib/definitions";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { strongPasswordRegex } from "../utils/regex/password-regex";
import * as argon2 from "argon2"; 

const prisma = new PrismaClient(); 

const FormSchema = z.object({
   firstName: z.string().min(1, "First name is required").trim(),
   lastName: z.string().min(1, "Last name is required").trim(), 
   email: z.string().regex(emailRegex, "Email address is invalid").trim(),
   password: z.string().regex(strongPasswordRegex, "Password should include at least: 1 Uppercase letter, 1 Number, 1 Special character").trim(), 
})

export default async function createUser(prevState: State, formData: FormData) {
   const validatedEntries = FormSchema.safeParse({
      firstName: formData.get('firstName'), 
      lastName: formData.get('lastName'), 
      email: formData.get('email'), 
      password: formData.get('password')
   })

   if(!validatedEntries.success) {
      return {
         errors: validatedEntries.error.flatten().fieldErrors,  
         message: 'Missing fields. Failed to create a new user.'
      }
   }

   const {firstName, lastName, email, password} = validatedEntries.data
   
   try {
      const existingUser = await prisma.user.findFirst({
         where: {
            email: {
               startsWith: email
            }
         }
      })
      if(existingUser) {
         return {
            message: 'User with the given email already exists.'
         }
      }
      
      const hashedPassword = await argon2.hash(password, {hashLength: 12})
      const user = await prisma.user.create({
         data: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword
         }
      })
      console.log(user)
   }
   catch(err) {
      throw new Error('Server Error. Failed to create a new user: ' + err)
   }

   redirect('/')
}