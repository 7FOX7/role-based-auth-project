import Link from "next/link"

export default function Table() {
   return (
      <article className="w-3/4 md:w-2/4 h-3/4 rounded-md relative">
         <div className="w-full h-full absolute left-0 right-0 bg-emerald-500 rounded-md opacity-30 z-10" />
         <div className="relative z-30 p-5 text-lg">
            <div className="text-emerald-500 mb-10">
               <Link
                  href="/common"
                  className="underline"
               >
                  Go to All-User page <small>(Everyone can access that page)</small>
               </Link>
            </div>
            <div className="text-orange-500">
               <Link
                  href="/control"
                  className="underline"
               >
                  Go to Admin page <small>(Only admins can access that page)</small>
               </Link>
            </div>
         </div>
      </article>
   )
}