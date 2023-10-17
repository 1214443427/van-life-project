import React, { useEffect, useState } from 'react'
import { Form, useLocation, useOutletContext } from 'react-router-dom'
import { capitalizeFirstChar } from '../../../util'
import { action } from './HostVansLayout'

function HostVansDetails() {
  const [vanData, setVanData] = useOutletContext()
  const [editMode, setEditMode] = useState(false)
  const location = useLocation()

  useEffect(()=>{
    setEditMode(location.state? location.state?.edit: false)
  },[vanData])

  const edit = 
  <div className='host-vans-details-div'>
    <Form method='post' action={action}>
      <label htmlFor='name' className='host-vans-details-label'>Name: </label>
      <br/>
      <input 
        defaultValue={vanData.name} 
        id='name'
        name='name'
        className='host-vans-details-input'/>
      <label htmlFor='category' className='host-vans-details-label'>Category: </label>
      <br/>
      <select 
        defaultValue={vanData.type} 
        id='category'
        name='type'
        className='host-vans-details-select'>
        <option value={"simple"}>
          Simple
        </option>    
        <option value={"rugged"}>
          Rugged
        </option>            
        <option value={"luxury"}>
          Luxury
        </option>
    </select>
    <label htmlFor='description' className='host-vans-details-label'>Description: </label>
      <br/>
      <textarea 
        type='text' 
        defaultValue={vanData.description} 
        id='description'
        name='description'
        className='host-vans-details-textarea'/>
      <label htmlFor='visibility' className='host-vans-details-label'>Visibility: </label>
      <br/>
      <select 
        defaultValue={vanData.visibility} 
        id='visibility'
        name='visibility'
        className='host-vans-details-select'>
        <option value={"public"}>
          Public
        </option>    
        <option value={"private"}>
          Private
        </option>            
    </select>
      <div className='btn-div'>
        <button type="submit" className='save-van-btn'>Save</button>
        <button className='cancel-btn' onClick={()=>setEditMode(false)}>Cancel</button>
      </div>
    </Form>
  </div>


  const display = 
  <div className='host-vans-details-div'>
      <p><b>Name: </b>{vanData.name}</p>
      <p><b>Category: </b>{capitalizeFirstChar(vanData.type)}</p>
      <p><b>Description: </b>{vanData.description}</p>
      <p><b>Visibility: </b>{capitalizeFirstChar(vanData.visibility)}</p>
      <p onClick={()=>{setEditMode(true)}} className='host-vans-details-edit'>Edit</p>
    </div>

  return editMode? edit:display
}

export default HostVansDetails