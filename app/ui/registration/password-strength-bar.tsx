

export default function PasswordStrengthBar({
   barColor, 
   barWidth, 
   passwordMessage
   }: {
      barColor: string, 
      barWidth: string, 
      passwordMessage: string 
   }) {
         
   return (
      <>
         <div>
            <p>{passwordMessage}</p>
         </div>
         <div className="bg-gray-500 w-full h-4">
            <div className={`${barColor} ${barWidth} h-full`} />
         </div>
      </>
   )
} 