export type State = {
   errors?: {
      firstName?: string[], 
      lastName?: string[], 
      email?: string[], 
      password?: string[]
   }
   message?: string
}

export type SessionPayload = {
   id: string, 
   isAdmin: boolean
}