import React from 'react'

function Hero() {
  return (
    <section className="bg-white lg:grid lg:h-screen dark:bg-gray-900">
  <div className="w-screen max-w-screen-xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:px-8 lg:py-32">
    <div className="mx-auto text-center max-w-prose">
      <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white">
        All your Digital Products
        <strong className="text-indigo-600"> Is One Click Away </strong>
        
      </h1>

      <p className="mt-4 text-base text-gray-700 text-pretty sm:text-lg/relaxed dark:text-gray-200">
        Start Exploring State Of the Art Assets Now!
      </p>

      <div className="flex justify-center gap-4 mt-4 sm:mt-6">
        <a
          className="inline-block px-5 py-3 font-medium text-white transition-colors bg-indigo-600 border border-indigo-600 rounded shadow-sm hover:bg-indigo-700"
          href="#"
        >
          Get Started
        </a>

        <a
          className="inline-block px-5 py-3 font-medium text-gray-700 transition-colors border border-gray-200 rounded shadow-sm hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
          href="#"
        >
          Learn More
        </a>
      </div>
    </div>
  </div>
</section>

  )
}

export default Hero