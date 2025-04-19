import React from 'react'
import { loginEndPoint } from '../../spotify'
import './login.css'

export default function Login() {
  return (
    <div className="login-page">
<img src="../../images/bLogo.png" 
alt="logo-spotify" 
className="logo" />
<a href={loginEndPoint}>
    <div className="login-btn">LOG IN</div>
    </a>
</div>
  );                                                                                                                                                                                                                                                                                                                                                   
}                                                                                                                              
 