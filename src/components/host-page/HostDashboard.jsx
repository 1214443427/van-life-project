import React, { Suspense } from 'react'
import { Await, defer, Link, useLoaderData } from 'react-router-dom'
import { requireAuth } from '../../util'
import { getUserOverviewStats, getUserVans } from '../../api'

export function loader(userInfo, request){
    requireAuth(userInfo, request)
    return defer({vansData: getUserVans(userInfo), userData:getUserOverviewStats(userInfo)})
}


export function getVansComponents(vansData, sliceStart, sliceEnd, goto){
    if(vansData.length == 0)
        return (<p className='list-van-error-text'>We couldn't find any van hosted by you</p>)
    const VansComponent = vansData.slice(sliceStart, sliceEnd).map((van)=> (
        <div 
            className='listed-van-card'
            key={van.id}>
            <Link 
                to={`/host/vans/${van.id}`} 
                className='listed-van-card-link'
                state={{goto: goto}}>
                <img src={van.imageUrl} className='listed-van-img'/>
                <div className='listed-van-name-price-div'>
                    <p>{van.name}</p>
                    <p className='listed-van-price'>${van.price}/day</p>
                </div>
            </Link>
            <Link 
                to={`/host/vans/${van.id}`} 
                className='listed-van-card-edit'
                state={{goto: goto, edit: true}}>
                <p className='link right-align'>Edit</p>
            </Link>
        </div> 
        )
    )
    return VansComponent
}

function HostDashboard() {

    const loaderData = useLoaderData()

    function renderWelcomeElement(userData){
        return(
            <div>
                <div className='dashboard-welcome-div'>
                    <h2 className='dashboard-welcome-text'>Welcome!</h2>
                    <div className="dashboard-welcome-income-span">
                        <p>Income last <u>30 days</u></p>
                        <Link to="income" className='host-link'>Details</Link>
                    </div>
                    <h1 className='dashboard-income-text'>${userData.overviewIncome}</h1>
                </div>
                <div className="dashboard-review-div">
                    <b className='dashboard-review-text'>Review score</b>
                    <p>⭐<b>{userData.overallRating}</b>/5</p>
                    <Link to="reviews" className='host-link right-align'>Details</Link>
                </div>
            </div>
        )
    }

    return (
    <div className='dashboard-div'>
        <Suspense fallback={<p></p>}>
            <Await resolve={loaderData.userData}>
                {renderWelcomeElement}
            </Await>
        </Suspense>
        <Suspense fallback={<p>loading...</p>}>
        <div className="dashboard-listed-vans-div">
            <span className='listed-vans-span'>
                <h4>Your listed vans</h4>
                <Link to="vans" className='host-link'>View all</Link>
            </span>
            <Await resolve={loaderData.vansData}>
                {(data)=>getVansComponents(data, 0, 3, "dashboard")}
            </Await>
        </div>
        </Suspense>
    </div>
  )
}

export default HostDashboard