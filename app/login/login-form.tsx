export default function LoginForm() {
   return (
      <form className="flex flex-col">
         <input className="mb-5" type="text" placeholder="Email" />
         <input className="mb-5" type="text" placeholder="Password" />
         <button className="bg-red-500" type="submit">Submit</button>
      </form>
   )
}