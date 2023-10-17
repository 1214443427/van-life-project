import React, { Suspense, useState } from 'react'
import { Await, 
  Link, 
  Outlet, 
  useLoaderData, 
  useLocation, 
  useParams, 
  defer, 
  NavLink, 
  Form,
  redirect
} from 'react-router-dom'
import { getVan, writeVanData } from '../../../api';
import { requireAuth, capitalizeFirstChar} from '../../../util';
import TypeButtonComponent from '../../TypeButtonComponent';

export async function loader(user, params, request){
  requireAuth(user, {request: request})
  return defer({vanData: getVan(params.id)})
}

export async function action({params, request}){
  const formData = await request.formData()
  const name = formData.get("name")
  const type = formData.get("type")
  const description = formData.get("description")
  const visibility = formData.get("visibility")
  writeVanData(params.id, name, type, description, visibility)
  return redirect("./")
}

function HostVansLayout() {
  const location = useLocation();
  const goto = location.state?.goto
  console.log(goto)

  const loaderData = useLoaderData()
  const [vanDataState, setVanDataState] = useState() //used to store new states, and later update to storage.

  const style = {
    textDecoration: "underline",
    fontWeight: "700px",
    color: "black"
  }

  function renderVanLayout(loadedData){
    //console.log("loaded data", loadedData)
    const data = {
      ...loadedData,
      ...vanDataState
    }
    return(
      <div>
        <div className='host-vans-layout-title-div'>
          <img src={data.imageUrl} className='host-vans-layout-image'/>
          <div>
          <TypeButtonComponent type={data.type}/>
            <h2>{data.name}</h2>
            <p><b>${data.price}</b>/day</p>
          </div>
          {/*<button onClick={()=>setVanDataState({price: 120})}>click</button> 
          temporary  button to test editing.*/}
        </div>
        <div className='host-vans-layout-links-span'>
        <NavLink to={"."} style={({isActive})=>( isActive? style:null)} end> Details </NavLink>
        <NavLink to={"Pricing"} style={({isActive})=> (isActive? style:null)}> Pricing </NavLink>
        <NavLink to={"photos"} style={(({isActive})=> isActive? style:null)}> Photos </NavLink>
        </div>
        <Form method='post' action={action}/>
        <Outlet context={[data, setVanDataState]}/>
      </div>
    )
  }

  return (
    <div className='host-van-layout-div'>
      <p>← <Link to={goto=="dashboard"?`..`:"../vans"}><u>Back to all vans</u></Link></p>
      <div className="host-van-layout-card">
        <Suspense fallback={<p>Loading...</p>}>
          <Await resolve={loaderData.vanData}>
            {renderVanLayout}
          </Await>
        </Suspense>
      </div>
    </div>
  )
}

export default HostVansLayout