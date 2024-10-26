"use server"

import { JWTPayload, SignJWT } from "jose"
import { jwtVerify } from "jose"
import { cookies } from "next/headers"

const encodedKey = new TextEncoder().encode(process.env.SECRET_KEY)

async function encrypt(payload: JWTPayload) {
   return new SignJWT(payload)
   .setProtectedHeader({alg: 'HS256'})
   .setIssuedAt()
   .setExpirationTime('7 days')
   .sign(encodedKey)
}

export async function decrypt(session: string | undefined) {
   try {
      if(session) {
         const decrypted = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256']
         })
         
         return decrypted
      }
   }
   catch(err) {
      throw new Error('Could not decrypt session token: ' + err)
   }
}

export async function createSession(sessionPayload: JWTPayload) {
   try {   
      const expires = new Date(Date.now() + 2 * 60 * 1000)     // 2 minutes
      const session = await encrypt(sessionPayload)
      const cookieStorage = await cookies()
      cookieStorage.set('session', session, {
         expires, 
         httpOnly: true
      })
   }
   catch(err) {
      throw new Error('Could not create a session: ' + err)
   }
} 

export async function deleteSession() {
   const cookieStorage = await cookies(); 
   cookieStorage.delete('session')
}