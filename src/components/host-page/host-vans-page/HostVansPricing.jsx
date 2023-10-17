import React from 'react'
import { useOutletContext } from 'react-router-dom'

function HostVansPricing() {
  const [vanData, setVanData] = useOutletContext()
  return (
    <div>
      <p className='host-van-pricing-text'>
        <span className='host-van-pricing-span'>${vanData.price}.00</span>
        /day</p>
    </div>
  )
}

export default HostVansPricing