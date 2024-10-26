import { cookies } from "next/headers";
import { decrypt } from "./app/lib/session";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const publicRoutes = ['/login', '/registration']
const protectedRoutes = ['/', '/control']

export default async function middleware(req: NextRequest) {
   try {
      const path = req.nextUrl.pathname; 
      const isPublicRoute = publicRoutes.includes(path)
      const isProtectedRoute = protectedRoutes.includes(path)
      const session = (await cookies()).get('session')?.value
      const decrypted = await decrypt(session)  // verify JWT is valid 

      if(!isPublicRoute) {
         if(!session || !decrypted) {
            return NextResponse.redirect(new URL('/login', req.nextUrl))
         }
      }
      if(session && decrypted) {
         const expires = new Date(Date.now() + 2 * 60 * 1000)
         const cookieStorage = await cookies()
         cookieStorage.set('session', session, {
            expires, 
            httpOnly: true
         })
         console.log('you are all good. you are registered')

         if(path.startsWith('/control') && decrypted.payload.isAdmin === false) {
            return NextResponse.redirect(new URL('/', req.nextUrl))
         }

         if(isPublicRoute && session) {
            return NextResponse.redirect(new URL('/', req.nextUrl))
         }
      }
      // return NextResponse.next()
   }
   catch(err) {
      throw new Error('Could not update session: ' + err)
   }
}

export const config = {
   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}