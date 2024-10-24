export type State = {
   errors?: {
      firstName?: string[], 
      lastName?: string[], 
      email?: string[], 
      password?: string[]
   }
   message?: string
}