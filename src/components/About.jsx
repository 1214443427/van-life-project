import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function About(){
  const navigate = useNavigate()
  return(
    <div className="about-div">
      <img src="https://images.unsplash.com/photo-1516939884455-1445c8652f83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80" alt="van pic" className="about-pic"/>
      <h1>Don't squeeze in a sedan when you could relax in a van.</h1>
      <p>Our mission is to enliven your road trip with the perfect travel van rental. Our vans are recertified before each trip to ensure your travel plans can go off without a hitch.
(Hitch costs extra 😉)<br/><br/>

Our team is full of vanlife enthusiasts who know firsthand the magic of touring the world on 4 wheels.</p>
      <div className="about-lower-div">
        <h3>Your destination is waiting. Your van is ready.</h3>
        <button 
          className="explore-btn"
          onClick={()=>navigate('/vans')}>
          Explore our vans
        </button>
      </div>
    </div>
  )
}