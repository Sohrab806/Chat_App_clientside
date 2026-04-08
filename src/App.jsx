import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Auth from '../pages/Auth/Login-register'
import Welcome from '../pages/Welcome'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
      
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/home' element={<Welcome/>}/>
      <Route path='/auth' element={<Auth/>}/>
      </Routes>
      
  

    </>
  )
}

export default App
