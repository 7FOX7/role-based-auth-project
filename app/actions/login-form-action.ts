"use server"

import { z } from "zod";
import * as argon2 from "argon2"
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { State } from "../lib/definitions";
import {createSession} from "../lib/session";
import { SessionPayload } from "../lib/definitions";

const prisma = new PrismaClient(); 

const FormSchema = z.object({
   firstName: z.string().optional(), 
   lastName: z.string().optional(), 
   email: z.string().min(1, "Email field cannot be empty").trim(),
   password: z.string().min(1, "Password field cannot be empty").trim(), 
})

export default async function login(prevState: State, formData: FormData) {
   let sessionPayload: SessionPayload
   const validatedEntries = FormSchema.safeParse({
      email: formData.get('email'), 
      password: formData.get('password')
   })

   if(!validatedEntries.success) {
      return {
         errors: validatedEntries.error.flatten().fieldErrors, 
      }
   }

   const {email, password} = validatedEntries.data
   
   try {
      const user = await prisma.user.findFirst({
         where: {
            email: {
               startsWith: email
            }
         }
      })
      
      if(!user) {
         return {
            message: 'User with the given email is not found.'
         }
      }

      const passwordMatch = await argon2.verify(user.password, password)

      if(!passwordMatch) {
         return {
            message: 'Invalid credentials'
         }
      }
      sessionPayload = {
         id: user.id.toString(),
         isAdmin: user.isAdmin 
      }
   }
   catch(err) {
      throw new Error('Server Error. Failed to perform operation with the database: ' + err)
   }

   await createSession(sessionPayload)
   redirect('/')
}