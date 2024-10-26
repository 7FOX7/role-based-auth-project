export default function NewsTable() {
   return (
        <div className="w-3/4 md:w-2/4 grid grid-cols-3 gap-4 text-center bg-white shadow-lg rounded-lg overflow-hidden ">
            <div className="bg-gray-200 font-bold py-2">
               Users
            </div>
            <div className="bg-gray-200 font-bold py-2">
               Posts
            </div>
            <div className="bg-gray-200 font-bold py-2">
               Comments
            </div>
            <div className="py-2 border-b">
               Alice
            </div>
            <div className="py-2 border-b">
               5
            </div>
            <div className="py-2 border-b">
               15
            </div>
            <div className="py-2 border-b">
               Bob
            </div>
            <div className="py-2 border-b">
               3
            </div>
            <div className="py-2 border-b">
               8
            </div>
            <div className="py-2 border-b">
               Charlie
            </div>
            <div className="py-2 border-b">
               7
            </div>
            <div className="py-2 border-b">
               20
            </div>
        </div>
   )
}