import React, { Suspense, useRef, useState, useEffect } from 'react'
import { requireAuth } from '../../util'
import { Await, defer, useLoaderData } from 'react-router-dom'
import { getUserReviews} from '../../api'
import DropDownMenu from './DropDownMenu'

export function loader(uid, request){
  console.log(request)
  requireAuth(uid, request)
  return defer({
    reviews: getUserReviews(uid) 
    //stats: getUserReviewsStats(uid)
  })
}

function HostReviews() {

  const loaderData = useLoaderData()
  //const [starPercent, setStarPercent] = useState([67,32,0,0,0])
  const [dateOffset, setDateOffset] = useState(30)
  const currentDate = new Date(Date.parse("Oct 11 2023"))
  const dateCutoff = new Date().setDate(currentDate.getDate() - dateOffset);


  useEffect(() => {
    new Date(dateCutoff).setDate(currentDate.getDate()-dateOffset)
  }, [dateOffset])


  function getReviewStats(reviews){
    const dataArr = []
    for (let index = 0; index < 5; index++) {
      dataArr.push(reviews.filter((x)=>x.rating==(5-index)).length)
    }
    return dataArr
  }

  function renderReviewElements([reviewsData]){
    const arr = Array.from(Array(5).keys()) //array used to create 5 bars.
    const reviews = reviewsData.filter(review=>review.time>dateCutoff)
    const stats = getReviewStats(reviews)
    const totalRating = reviews.reduce((x,y)=>x+y.rating,0)
    const totalNumOfReviews = stats.reduce((x,y)=>x+y,0)
    const starPercent = stats.map(reviewNumber=>Math.round(reviewNumber/totalNumOfReviews*100))||0
    
    return(
    <div>
      <div className='host-reviews-title-div'>
        <span className="host-reviews-title">Your reviews</span> 
        <DropDownMenu dateOffset={dateOffset} setDateOffset={setDateOffset}/>
      </div>
      <div className="review-summary-div">
        <div className='host-reviews-overall-rating-div'>
          <h1 className='host-reviews-overall-rating'>
            {Math.round(totalRating/totalNumOfReviews*10)/10||0}
          </h1> 
          <p>⭐ overall rating </p>
        </div>
        {arr.map((index)=>
        (<div className='review-bar-div' key={index}>
          <p className='reviews-bar-star-num'>{5-index} star{5-index!=1? "s":""}</p> 
          <div className="review-bar-container">
            <div 
              className="review-bar" 
              style={{width:`${starPercent[index]||0}%`}}
            >
            </div>
          </div>
          <p className='review-bar-percentage'>{starPercent[index]||0}%</p>
        </div>))}
      </div>

    {/* review div */}

    <div className="host-reviews-reviews-div">
      <p className='host-reviews-reviews-title'>Reviews ({totalNumOfReviews})</p>
      {reviews.map(review=>
        review.time >= dateCutoff?
        (
        <div className="host-reviews-review" key={review.id}>
          <p>{"⭐".repeat(review.rating)}</p>
          <span className='host-reviews-review-span'>
            <b>{review.user}</b>
            <p className='host-reviews-review-date'>
              {new Date(review.time).toLocaleString("default",{  
                year: "numeric",
                month: "long",
                day: "numeric",})
              }
            </p>
          </span>
          <p>{review.review}</p>
        </div>
      ):"")}
    </div>

    </div>
  )}

  return (
    <div className='host-reviews-div'>
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={Promise.all([loaderData.reviews/*, loaderData.stats*/]).then(value=>value)}>
          {(value)=>renderReviewElements(value)}
        </Await>
      </Suspense>
    </div>
  )
}

export default HostReviews