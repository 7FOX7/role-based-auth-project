"use server"

import { z } from "zod";
import { emailRegex } from "../utils/regex/email-regex";
import { State } from "../lib/definitions";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { strongPasswordRegex } from "../utils/regex/password-regex";
import * as argon2 from "argon2"; 
import {createSession} from "../lib/session";
import { SessionPayload } from "../lib/definitions";

const prisma = new PrismaClient(); 


const FormSchema = z.object({
   firstName: z.string().min(1, "First name is required").trim().transform((val) => {
      const firstLetter = val.charAt(0).toUpperCase(); 
      const rest = val.substring(1, val.length)
      const full = firstLetter + rest
      return full
   }),
   lastName: z.string().min(1, "Last name is required").trim().transform((val) => {
      const firstLetter = val.charAt(0).toUpperCase(); 
      const rest = val.substring(1, val.length)
      const full = firstLetter + rest
      return full
   }), 
   email: z.string().regex(emailRegex, "Email address is invalid").trim(),
   password: z.string().regex(strongPasswordRegex, "Password should include at least: 1 Uppercase letter, 1 Number, 1 Special character").trim(), 
})

export default async function register(prevState: State, formData: FormData) {
   let sessionPayload: SessionPayload 
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
            password: hashedPassword,
         }
      })
      sessionPayload = {
         id: user.id.toString(), 
         isAdmin: user.isAdmin
      }
   }
   catch(err) {
      throw new Error('Server Error. Failed to create a new user: ' + err)
   }

   await createSession(sessionPayload)   
   redirect('/')
}