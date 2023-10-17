import React, { Suspense } from 'react'
import { Await, NavLink, defer, useLoaderData, useLocation, useNavigate } from 'react-router-dom'
import { getVan } from '../../api'
import TypeButtonComponent from '../TypeButtonComponent'


export function loader({params}){
    return defer({van: getVan(params.id)})
}

function VanDetails() {
    const dataPromise = useLoaderData()
    const typeFilter = useLocation().state?.type
    const navigate = useNavigate()

    function VanDetailsComponent(vanData){
        console.log(vanData)
        return(
        <div className='van-details-div'>
            <img 
                className='van-details-img'
                src={vanData.imageUrl
            }></img>
            <TypeButtonComponent type={vanData.type}/>
            <p 
                className='text-left-align van-details-name'>
                {vanData.name}
            </p>
            <p  
                className='text-left-align van-details-price'>
                $<b 
                    className='text-left-align van-details-price-number'>
                    {vanData.price}
                </b>
                /day
            </p>
            <p 
                className='text-left-align van-details-description'>
            {vanData.description}</p>
            <button className='van-details-rent-btn'>Rent this van</button>
        </div>)
    }
  return (
    <div className='van-details-page'>
        <p 
            className='back-to-vans-btn'
            onClick={()=>(navigate(`/vans${typeFilter?`?type=${typeFilter}`:''}`))}
            >← <u>Back to {typeFilter? typeFilter:"all"} vans</u>
        </p>
        <Suspense fallback={<p>Loading...</p>}>
            <Await resolve={dataPromise.van}>
                {VanDetailsComponent}
            </Await>
        </Suspense>
    </div>
  )
}

export default VanDetails