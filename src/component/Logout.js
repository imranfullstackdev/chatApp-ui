import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {BiPowerOff} from 'react-icons/bi'
const Logout = () => {
    const navigate=useNavigate()
    const Logout=()=>{
        localStorage.clear()
        navigate('/Login')
    }
  
  return (
    <div className='logoutContainer'>
    <button onClick={Logout} ><BiPowerOff/></button >
    </div>
  )
}

export default Logout