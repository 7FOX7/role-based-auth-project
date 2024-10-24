const regex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.com$")

export default function isValidEmail(email: string) {
   if(regex.test(email)) {
      return true
   }

   return false 
}