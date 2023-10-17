import React from 'react'
import './vans.css'
import {
  Link,
  useSearchParams,
  useLoaderData,
  defer,
  Await,
  useNavigate
} from "react-router-dom"
import { getVans } from '../../api'
import { capitalizeFirstChar } from '../../util'
import TypeButtonComponent from '../TypeButtonComponent'

export function loader(){
   return defer({vans: getVans()})
}

function Vans() {
  const dataPromise = useLoaderData()
  const [searchParams, setSearchParams] = useSearchParams()
  const typeFilter = searchParams.get('type');
  const navigate = useNavigate()

  console.log(typeFilter)

  function typeOnClick(type){
    console.log(type)
    setSearchParams({'type': type})
  }

  function getVansComponents(vansData){
    const VansComponents = vansData.map(van=>{
      return !typeFilter || van.type==typeFilter ?(
        <div className='van-card' key={van.id}>
            <img 
              className='van-card-image' 
              src={van.imageUrl} 
              onClick={()=>navigate(van.id, {state: {type: typeFilter}})}
            />
            <span className='van-card-span'>
              <p 
                className='van-card-name'               
                onClick={()=>navigate(van.id, {state: typeFilter})}
                >{van.name}
              </p>
              <p className='van-card-price'>${van.price}</p>
            </span>
            <span className='van-card-span'>
              <TypeButtonComponent type={van.type} buttonOnClick={typeOnClick}/>
              <p className='van-card-per-day'>/day</p>
            </span>
          </div>
      ): null
    })
    return VansComponents
  }
  
  return (
    <div className='vans-div outlet-item'>
        <h1 className='vans-title'>Explore our van options</h1>
        <div className='type-div'>
            <p 
              className={`type simple-type ${typeFilter=='simple'?'selected':''} `}
              onClick={()=>typeOnClick('simple')}
              >Simple</p>
            <p 
              className={`type luxury-type ${typeFilter=='luxury'?'selected':''} `}
              onClick={()=>typeOnClick('luxury')}
              >Luxury</p>
            <p 
              className={`type rugged-type ${typeFilter=='rugged'?'selected':''} `}
              onClick={()=>typeOnClick('rugged')}
              >Rugged</p>
            <p 
              className='clear-type' 
              onClick={()=>{setSearchParams(searchParams.delete('type'))}}
            >Clear filters</p>
        </div>
        <div className='van-cards-div'>
          <React.Suspense fallback={<p>Loading...</p>}>
            <Await resolve={dataPromise.vans}>
                {getVansComponents}
            </Await>
          </React.Suspense>
        </div>
    </div>
  )
}

export default Vans