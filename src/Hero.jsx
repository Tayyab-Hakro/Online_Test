import React from 'react'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Choose a Test</h1>
      <h1 className='flex justify-center font-bold text-3xl p-4' >Made by Tayyab</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* General Test */}
        <Link to="/general-test" className="bg-gray-100 p-6 rounded-lg shadow hover:bg-gray-200 text-center">
          <h2 className="text-lg font-semibold mb-2">General Test</h2>
          <button className="bg-black text-white px-4 py-2 rounded">Start</button>
        </Link>

        {/* English Test */}
        <Link to="/english-test" className="bg-gray-100 p-6 rounded-lg shadow hover:bg-gray-200 text-center">
          <h2 className="text-lg font-semibold mb-2">English Test</h2>
          <button className="bg-black text-white px-4 py-2 rounded">Start</button>
        </Link>

        {/* Coding Test */}
        <Link to="/coding-test" className="bg-gray-100 p-6 rounded-lg shadow hover:bg-gray-200 text-center">
          <h2 className="text-lg font-semibold mb-2">Coding Test</h2>
          <button className="bg-black text-white px-4 py-2 rounded">Start</button>
        </Link>

       
      </div>
    </div>
  )
}

export default Hero
