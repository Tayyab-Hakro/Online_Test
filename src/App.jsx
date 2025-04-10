import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TestOne from './Alltest/TestOne'
import Hero from './Hero'
import Home from './Home'
import Test2 from './Alltest/Test2'
import TestT from './Alltest/TestT'

function App() {
  return (
    <BrowserRouter basename="/Online_Test">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hero" element={<Hero />} />
        <Route path="/general-test" element={<TestOne />} />
        <Route path="/english-test" element={<Test2 />} />
        <Route path="/coding-test" element={<TestT />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
