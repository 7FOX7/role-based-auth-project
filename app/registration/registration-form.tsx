export default function RegistrationForm() {
   return (
      <form className="flex flex-col">
         <input className="mb-5" type="text" placeholder="First Name" />
         <input className="mb-5" type="text" placeholder="Last Name" />
         <input className="mb-5" type="text" placeholder="Email" />
         <input className="mb-5" type="text" placeholder="Password" />
         <button className="bg-red-500" type="submit">Submit</button>
      </form>
   )
}