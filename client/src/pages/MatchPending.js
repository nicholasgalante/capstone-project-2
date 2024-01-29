 import React from 'react'
 
 function MatchPending() {
   return (
     <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
       <div className="mx-auto max-w-2xl text-center">
         <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl">We're still searching for your perfect match! </h2>
         <p className="mt-6 text-lg leading-8 text-gray-600">
           Your application has been submitted! <br/>You will be notified when you have been matched. 
         </p>
       </div>
     </div>
   )
 }

 export { MatchPending };