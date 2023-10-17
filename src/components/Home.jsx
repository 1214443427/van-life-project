import React from 'react';
import { getVans } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate()
  return(
    <div className="home-div">
      <h1>You got the travel plans, we got the travel vans.</h1>
      <p>Add adventure to your life by joining the #vanlife movement. Rent the perfect van to make your perfect road trip.</p>
      <button
          className='find-van-button'
          onClick={()=>navigate('/vans')}
          >Find your van</button>
    </div>
  )
}