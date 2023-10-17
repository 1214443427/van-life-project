import React, {Suspense} from 'react'
import { Await, defer, Link, useLoaderData } from 'react-router-dom'
import { requireAuth } from '../../util'
import { getUserVans } from '../../api'
import { getVansComponents } from './HostDashboard'

function HostListedVans() {

  const loaderData = useLoaderData()

  return (
    <div className='host-listed-vans-div'>
      <h1>Your listed vans</h1>
        <Suspense fallback={<p>loading...</p>}>
            <Await resolve={loaderData.vansData}>
                {(data)=>getVansComponents(data, 0, data.length, "vans")}
            </Await>
        </Suspense>
    </div>
  )
}

export default HostListedVans