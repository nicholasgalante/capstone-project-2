export default function TestimonialSection() {
   return (
     <section className="bg-white py-24 sm:py-32">
       <div className="mx-auto max-w-7xl px-6 lg:px-8">
         <div className="mx-auto grid max-w-2xl grid-cols-1 lg:mx-0 lg:max-w-none lg:grid-cols-2">
           <div className="flex flex-col pb-10 sm:pb-16 lg:pb-0 lg:pr-8 xl:pr-20">
             {/* <img className="h-12 self-start" src="https://tailwindui.com/img/logos/tuple-logo-gray-900.svg" alt="" /> */}
             <figure className="mt-10 flex flex-auto flex-col justify-between">
               <blockquote className="text-lg leading-8 text-gray-900">
                 <p>
                   "Before connecting with my mentor, I felt lost and unsure about my job search. Their personalized advice and encouragement helped me build my confidence and refine my technical skills. Their mock interviews were like boot camp – they pushed me to think critically and articulate my knowledge effectively. It's thanks to their mentorship that I not only landed a great job, but also walked into the interview feeling prepared and confident."
                 </p>
               </blockquote>
               <figcaption className="mt-10 flex items-center gap-x-6">
                 <img
                   className="h-14 w-14 rounded-full bg-gray-50"
                   src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                   alt=""
                 />
                 <div className="text-base">
                   <div className="font-semibold text-gray-900">Maria P.</div>
                   <div className="mt-1 text-gray-500">Computer Science Student</div>
                   <div className="mt-1 text-gray-500">Quantum Leap University </div>

                 </div>
               </figcaption>
             </figure>
           </div>
           <div className="flex flex-col border-t border-gray-900/10 pt-10 sm:pt-16 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 xl:pl-20">
             {/* <img className="h-12 self-start" src="https://tailwindui.com/img/logos/reform-logo-gray-900.svg" alt="" /> */}
             <figure className="mt-10 flex flex-auto flex-col justify-between">
               <blockquote className="text-lg leading-8 text-gray-900">
                 <p>
                 "Mentoring through TechBridge was a joyride! My match grew from unsure to unstoppable, tackling complex concepts with impressive grit. Watching their confidence bloom with each cracked problem and aced interview was the true reward. TechBridge's platform made it seamless, but my student's dedication was the fuel. They're a shining example of IT's bright future, and I'm thrilled to see them soar. Mentoring isn't just guiding, it's growing together, and TechBridge made it magical.""
                 </p>
               </blockquote>
               <figcaption className="mt-10 flex items-center gap-x-6">
                 <img
                   className="h-14 w-14 rounded-full bg-gray-50"
                   src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                   alt=""
                 />
                 <div className="text-base">
                   <div className="font-semibold text-gray-900">Joseph Rodriguez</div>
                   <div className="mt-1 text-gray-500">Senior Developer</div>
                   <div className="mt-1 text-gray-500">SparkLoop</div>
                 </div>
               </figcaption>
             </figure>
           </div>
         </div>
       </div>
     </section>
   )
 }
 