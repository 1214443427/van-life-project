import React, { createContext, memo, useEffect, useState } from 'react';
import {
  createBrowserRouter, 
  Route, 
  createRoutesFromElements, 
  RouterProvider
} from 'react-router-dom' 
import About from './components/About'
import Home from './components/Home'
import "./App.css"
import Layout from './components/Layout';
import Vans, {loader as vansLoader} from './components/vans-page/Vans';
import VanDetails, {loader as vanDetailsLoader} from './components/vans-page/VanDetails';
import HostLayout from './components/host-page/HostLayout';
import HostDashboard, {loader as hostDashboardLoader} from './components/host-page/HostDashboard';
import HostIncome, {loader as hostIncomeLoader} from './components/host-page/HostIncome';
import HostReviews, {loader as hostReviewsLoader} from './components/host-page/HostReviews';
import Login from './components/Login';
import ErrorPage from './components/ErrorPage';
import { monitorAuthState } from './api';
import HostListedVans from './components/host-page/HostListedVans';
import HostVansLayout, {loader as HostVansLayoutLoader, action as HostVansLayoutAction} from './components/host-page/host-vans-page/HostVansLayout';
import HostVansDetails from './components/host-page/host-vans-page/HostVansDetails';
import HostVansPricing from './components/host-page/host-vans-page/HostVansPricing';
import HostVansPhotos from './components/host-page/host-vans-page/HostVansPhotos';

export const UserContext = createContext()

function App() {

  const [user, setUser] = useState(null)

  useEffect(()=> {
    const unsubscribe = monitorAuthState(setUser)
    return unsubscribe
    }, []
  )


  console.log(user)

  const router = createBrowserRouter(createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<Layout outlet = {<ErrorPage />}/>}>
        <Route index element={<Home />}/>
        <Route path="about" element={<About />}/>
        <Route path="vans" element={<Vans />} loader={vansLoader}/>
        <Route path="vans/:id" element={<VanDetails />} loader={vanDetailsLoader}/>
        <Route path='host' element={<HostLayout />}>
          <Route index 
            element={<HostDashboard />} 
            loader={(request)=>hostDashboardLoader(user?.uid,request)}
          />
          <Route path='income' element={<HostIncome />} loader={(request)=>hostIncomeLoader(user?.uid, request)}/>
          <Route path='vans' 
            element={<HostListedVans />} 
            loader={(request)=>hostDashboardLoader(user?.uid,request)}
          />  
          <Route 
            path='vans/:id' 
            element={<HostVansLayout/>}
            loader={({params, request})=>HostVansLayoutLoader(user?.uid, params, request)}
            action={HostVansLayoutAction}
          >
            <Route index element={<HostVansDetails/>}/>
            <Route path='pricing' element={<HostVansPricing/>}/>
            <Route path='photos' element={<HostVansPhotos/>}/>
          </Route>
          <Route path='reviews' element={<HostReviews />} loader={(request)=>hostReviewsLoader(user?.uid, request)}/>
        </Route>
        <Route path="login" element={<Login />}/>
      </Route>
  ))

  return (
    <UserContext.Provider value={{user, setUser}}>
      <RouterProvider router={router}/>
    </UserContext.Provider>
  )
}

export default App