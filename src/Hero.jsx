import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Hero() {
    const naviagete = useNavigate()
  return (
    <div className='' >
        <img src='' alt='Geneal Knowledge' />
        <p>General Knowledge Mcqs Test</p>
         <button onClick={() => naviagete("/frontend/online_test_app/src/Alltest/TestOne.jsx")} >Start Test</button>
    </div>
  )
}

export default Hero