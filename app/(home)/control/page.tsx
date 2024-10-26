import NewsTable from "@/app/ui/control/news-table"

export default function Page() {
   return (
      <>
         <h1 className="text-white text-3xl">Hi, Admin!</h1>
         <h2 className="text-white text-xl">We got some statistics.</h2>
         <div className="mb-3"/>
         <NewsTable />
      </>
   )
}