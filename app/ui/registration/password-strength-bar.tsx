

export default function PasswordStrengthBar({
   barColor, 
   barWidth, 
   }: {
      barColor: string, 
      barWidth: string, 
   }) {

   return (
      <div className="w-56">
         <div className="bg-gray-300 w-full h-2 rounded-md mt-2">
            <div className={`${barColor} ${barWidth} h-full rounded-md`} />
         </div>
      </div>
   )
} 