import React, { useContext } from 'react'
import { Outlet, NavLink, useNavigate} from 'react-router-dom'
import { UserContext } from '../App'
import { logout } from '../api'

export default function Layout({outlet}) {
    const style={
        color:"black",
        textDecoration: "underline",
    }

    const {user, setUser} = useContext(UserContext)
    const navigate = useNavigate()

    function logOut(){
        if(logout()){
            navigate("/login")
        }
    }

  return (
    <div className='layout'>
        <nav>
            <NavLink to="/" className={"logo"}><h1>#VANLIFE</h1></NavLink>
            <div className="links-div">
                <NavLink to="host"  
                    style={({isActive})=>isActive?style:null} 
                    className={"link"}
                > Host </NavLink>
                <NavLink to="about" 
                    style={({isActive})=>isActive?style:null} 
                    className={"link"}
                >About</NavLink>
                <NavLink to="vans"  
                    style={({isActive})=>isActive?style:null} 
                    className={"link"}
                > Vans </NavLink>
                {!user? 
                <NavLink to="login"  
                    style={({isActive})=>isActive?style:null} 
                    className={"link"}
                > Login </NavLink>
                :
                <p className="link" onClick={logOut}>Logout</p>
            }
            </div>
        </nav>
        
        {outlet? outlet: <Outlet />}

        <footer>
            <p>Ⓒ 2022 #VANLIFE</p>
        </footer>
    </div>
  )
}
