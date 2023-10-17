import React, { useRef } from 'react'

function DropDownMenu({dateOffset, setDateOffset}) {

    const menuRef = useRef(null)

    function toggleMenu(operation){
    operation == "on"? 
        menuRef.current?.classList.add("show"): 
        menuRef.current?.classList.remove("show")
    }
  return (
    <div className='host-reviews-day-selector-div' onMouseLeave={()=>toggleMenu("off")}>
        {dateOffset<3650? 
        <p>last {"  "}
        <b onMouseOver={()=>toggleMenu("on")} className='link'>
            <u>{dateOffset} days</u>
        </b>
        </p>: <b onMouseOver={()=>toggleMenu("on")} className='link'><u>viewing all</u></b>} 
        <div className='host-reviews-day-selector-buttons-div' ref={menuRef} onClick={()=>toggleMenu("off")}>
        <button 
            className='days-selector-btn' 
            onClick={()=>setDateOffset(30)}
            >30 days</button>
        <button 
            className='days-selector-btn' 
            onClick={()=>setDateOffset(90)}
            >90 days</button>
        <button 
            className='days-selector-btn' 
            onClick={()=>setDateOffset(180)}
            >180 days</button>
        <button 
            className='days-selector-btn' 
            onClick={()=>setDateOffset(365)}
            >365 days</button>
        <button 
            className='days-selector-btn' 
            onClick={()=>setDateOffset(3650)}
            >View all</button>
        </div>
    </div>
  )
}

export default DropDownMenu