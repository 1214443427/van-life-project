import React from 'react'
import { capitalizeFirstChar } from '../util'

function TypeButtonComponent({type, buttonOnClick}) {
  return (
    <div>
        <p 
            className={`${type}-type-card van-card-type`}
            onClick={buttonOnClick?()=>buttonOnClick(type):null}
        >{capitalizeFirstChar(type)}</p>
    </div>
  )
}

export default TypeButtonComponent