import React, { useContext, useEffect, useRef, useState } from 'react'
import { Form, redirect, useLocation, useNavigate, useNavigation, useSearchParams } from 'react-router-dom'
import { loginEmailPassword, signUpEmailPassword } from '../api'
import { UserContext } from '../App'

function Login() {
  
  const [error, setError] = useState(null)
  const [signUpError, setSignUpError] = useState(null)
  const navigate = useNavigate()
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const modalRef = useRef(null)
  const emailSignUpRef = useRef(null)
  const passRepeatSignUpRef = useRef(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const {user, setUser} = useContext(UserContext)
  const navigation = useNavigation()


  async function signUp(event){
    const email = event.target[0].value
    const password = event.target[1].value
    const rePassword = event.target[2].value
    if (password!=rePassword){
      setSignUpError("Passwords do not patch")
      return null;
    }
    try {
      await signUpEmailPassword(email, password)
    }
    catch(error){
      console.log(error.message)
      setSignUpError(error.message)
    }
  }
  
  async function login(event){
    event.preventDefault()
    const email = emailRef.current.value
    const password = event.target[1].value
    try{
     await loginEmailPassword(email, password)
    }catch(error){
      console.log(error.message)
      setError(error.message)
    }
  }
  
  function toggleModal(){
    modalRef.current.classList.toggle("visible")
    setSignUpError("")
  }

  useEffect(()=>
    {if(user) 
      navigate(searchParams.get("redirectTo")? searchParams.get("redirectTo"):"/host") }
  ,[user])
  //redirect to "/host" or where the user is routed to login from when "user" state changes. This indicates a successful login 

  useEffect(() => {
    emailRef?.current.focus()
  }, [])

  const message = searchParams.get("message")

  console.log(navigation.state)

  return (
    <div className='login-div'>
      <h1>Sign in to your account</h1>
        <Form onSubmit={login} className='login-form' replace>
        {message && <p className='login-error-text' style={{marginBottom: "10px"}}>{message}</p>}
          <input 
            type='email' 
            placeholder='Email address' 
            className='login-input' 
            ref={emailRef}
            onChange={()=>setError("")}
          />
          <input 
            type='password' 
            placeholder='Password' 
            className='login-input' 
            ref={passwordRef}
            onChange={()=>setError("")}
          />
          {error && <p className='login-error-text'>Error: {error}</p>}
          <button 
            className='login-btn'             
            disabled={navigation.state !== "idle"} >
              {navigation.state !== "idle"? "Loading...":"Log in"}
            </button>
        </Form>
      <p>Don't have an account? 
        <span className='create-account-btn' onClick={toggleModal}>
          Create one now
        </span>
      </p>
      <div className='modal-container' ref={modalRef} onClick={toggleModal}>
        <div className="register-modal" onClick={(event)=>{event.stopPropagation()}}>
          <h2>Account Register</h2>
          <Form onSubmit={signUp} className='sign-up-form'>  
            <p className="register-label">Email</p>
            <input 
              type='email' 
              placeholder='Email address' 
              className='login-input' ref={emailSignUpRef}
              onChange={()=>setSignUpError("")}
            />
            <p className="register-label">Password</p>
            <input 
              type='password' 
              placeholder='Password' 
              className='login-input'
              onChange={()=>setSignUpError("")}
            />
            <p className="register-label">Repeat password</p>
            <input 
              type='password' 
              placeholder='Re-enter Password' 
              className='login-input'
              onChange={()=>setSignUpError("")}
            />
            {signUpError && <p className='login-error-text'>Error: {signUpError}</p>}
            <button 
            className='login-btn' 
            disabled={navigation.state !== "idle"} >
                {navigation.state !== "idle"? "Loading":"Sign up"}
               </button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login