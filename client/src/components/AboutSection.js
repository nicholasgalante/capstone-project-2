import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'

export default function AboutSection() {
  return (
    <div className="relative bg-white">
      <div className="mx-auto max-w-7xl lg:flex lg:justify-between lg:px-8 xl:justify-end">
        <div className="lg:flex lg:w-1/2 lg:shrink lg:grow-0 xl:absolute xl:inset-y-0 xl:right-1/2 xl:w-1/2">
          <div className="relative h-80 lg:-ml-8 lg:h-auto lg:w-full lg:grow xl:ml-0">
            <img
              className="absolute inset-0 h-full w-full bg-gray-50 object-cover"
              src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-x=.4&w=2560&h=3413&&q=80"
              alt=""
            />
          </div>
        </div>
        <div className="px-6 lg:contents">
          <div className="mx-auto max-w-2xl pb-24 pt-16 sm:pb-32 sm:pt-20 lg:ml-8 lg:mr-0 lg:w-full lg:max-w-lg lg:flex-none lg:pt-32 xl:w-1/2">
            <p className="text-base font-semibold leading-7 text-indigo-600">Personalized Mentorship</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet your mentor</h1>
            <p className="mt-6 text-xl leading-8 text-gray-700">
            At TechBridge, we know that the path to IT success isn't paved with algorithms alone. It's built on authentic relationships with industry experts who ignite your passion, refine your skills, and become your trusted guides.
            </p>
            <div className="mt-10 max-w-xl text-base leading-7 text-gray-700 lg:max-w-none">
              <p>
              Our mentors aren't just technical wizards, they're passionate champions dedicated to unlocking your potential. With personalized one-to-one mentorship, you'll gain more than just code – you'll build a supportive network that boosts your confidence, expands your opportunities, and propels you towards your dream career.
              </p>
              {/* <p className="mt-12 text-base font-semibold leading-7 text-indigo-600">Mentorship Dashboard</p> */}
              <h2 className="mt-12 text-2xl font-bold tracking-tight text-gray-900">Access the Mentorship Dashboard</h2>

              <p className="mt-6">
              Once matched, students and mentors gain access to our intuitive dashboard, enabling them to:
              </p>
              <ul role="list" className="mt-8 space-y-8 text-gray-600">
              <li className="flex gap-x-3">
                  <CloudArrowUpIcon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  <span>
                    <strong className="font-semibold text-gray-900">Schedule meetings</strong> Easily plan and organize one-to-one sessions with your mentor through our intuitive scheduling feature. Take control of your mentorship journey by setting up meetings at your convenience.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <CloudArrowUpIcon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  <span>
                    <strong className="font-semibold text-gray-900">Discussion tracker</strong> Keep tabs on your mentorship journey with our discussion tracking tool. Record key points, insights, and action items discussed during meetings, ensuring that you have a clear record of your progress and goals.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <LockClosedIcon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  <span>
                    <strong className="font-semibold text-gray-900">Goal setting</strong> Take charge of your professional development by setting and tracking goals within our dashboard. Collaborate with your mentor to establish milestones and objectives, ensuring a focused and purposeful mentorship experience.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <ServerIcon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  <span>
                    <strong className="font-semibold text-gray-900">Resource sharing</strong> Enhance your learning through seamless resource sharing with your mentor on our platform. Easily exchange documents, articles, and more for collaborative knowledge and skill development.
                  </span>
                </li>
              </ul>
              {/* <p className="mt-8">
                Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio id et. Id blandit molestie auctor
                fermentum dignissim. Lacus diam tincidunt ac cursus in vel. Mauris varius vulputate et ultrices hac
                adipiscing egestas. Iaculis convallis ac tempor et ut. Ac lorem vel integer orci.
              </p>
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">No server? No problem.</h2>
              <p className="mt-6">
                Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam consequat in. Convallis arcu ipsum urna nibh.
                Pharetra, euismod vitae interdum mauris enim, consequat vulputate nibh. Maecenas pellentesque id sed
                tellus mauris, ultrices mauris. Tincidunt enim cursus ridiculus mi. Pellentesque nam sed nullam sed diam
                turpis ipsum eu a sed convallis diam.
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
