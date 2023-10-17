import React from 'react'
import { useNavigate, useRouteError } from 'react-router-dom'

function ErrorPage() {
    const navigate = useNavigate()
    const error = useRouteError()
    console.log(error)
  return (
    <div className='error-div'>
        <img src='https://miro.medium.com/v2/resize:fit:1200/0*ZjYSm_q36J4KChdn' width={"400px"}/>
        {error.status==404 ? 
          <h1>Sorry, the page you were looking for was not found.</h1>:
          <h1>Sorry we run into an error. 
            {error.status!==undefined && <span> {error.status } </span> }
            {error.statusText!==undefined && <span> {error.statusText } </span> }
            {error.message!==undefined && <span> {error.message } </span> }
            </h1>
        }
        <button 
          onClick={()=>navigate('/')}
          className='error-home-btn'
          >Return to home</button>
    </div>
  )
}

export default ErrorPage