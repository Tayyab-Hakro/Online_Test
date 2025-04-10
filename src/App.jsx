import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TestOne from './Alltest/TestOne'
import Hero from './Hero'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/TestOne" element={<TestOne />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
