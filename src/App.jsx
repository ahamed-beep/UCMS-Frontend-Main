import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Componenets/Home/Home'
import Login from './Authentication/Login'
import Signup from './Authentication/Signup'

const App = () => {
  return (
    <div>
      <BrowserRouter>
         <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
         </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App