import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Componenets/Home/Home'
import Login from './Authentication/Login'
import Signup from './Authentication/Signup'
import EmailVerification from './Authentication/EmailVerification'
import VerifyCode from './Authentication/VerifyCode'
import ResetPassword from './Authentication/ResetPassword'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/verify' element={<EmailVerification />} />
          <Route path='/codeverification' element={<VerifyCode />} />
          <Route path='/resetpassword' element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App