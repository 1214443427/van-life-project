import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import "./host.css"

function HostLayout() {

  const style={
    color:"black",
    textDecoration: "underline",
}

  return (
    <div className='host-layout-div'>
      <div className='host-links-div'>
        <NavLink 
          className={"link"}
          style={({isActive})=>isActive?style:null} 
          to="."
          end
        >Dashboard</NavLink>
        <NavLink 
          className={"link"}
          style={({isActive})=>isActive?style:null} 
          to={"income"}
        >Income</NavLink>
        <NavLink 
          className={"link"}
          style={({isActive})=>isActive?style:null} 
          to={"vans"}
        >Vans</NavLink>
        <NavLink 
          className={"link"}
          style={({isActive})=>isActive?style:null} 
          to={"reviews"}
        >Reviews</NavLink>
      </div>
      <Outlet />
    </div>
  )
}

export default HostLayout