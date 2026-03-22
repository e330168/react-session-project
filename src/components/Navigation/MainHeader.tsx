import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UpcomingSessions from "../Sessions/UpcomingSessions";
import Button from "../UI/Button";
import { useAuth } from "../../context/useAuth";

export default function MainHeader(){

    const [upcomingSessionsVisible, setUpcomingSessionsVisible]= useState(false);
    const {user,logout}= useAuth();
    const navigate= useNavigate();

    function showUpcomingSessions(){
      setUpcomingSessionsVisible(true);
    }

    function hideUpcomingSessions(){
      setUpcomingSessionsVisible(false);
    }

    const handleLogout=()=>{
      logout();
      navigate("/",{replace: true});
    };

    return(
        <>

         {
           upcomingSessionsVisible &&(
            <UpcomingSessions onClose={hideUpcomingSessions}/>
           )
         }

        <header id="main-header">

         <h1>Courses</h1>

         <nav>
            <ul>

              {user ? (
                            <>
                                <li>
                                <NavLink to="/sessions" className={({ isActive }) => isActive ? 'active' : ''}>
                                    Browse Sessions
                                </NavLink>
                                </li>

                                <Button onClick={showUpcomingSessions}>
                                Upcoming Sessions
                                </Button>

                                <Button onClick={handleLogout}>
                                Logout
                                </Button>
                            </>
                 ) : (
                            <>
                                <li>
                                <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''} end>
                                    Our Mission
                                </NavLink>
                                </li>

                                <li>
                                <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>
                                    Login
                                </NavLink>
                                </li>
                            </>
                )}
            </ul>
        </nav>
    </header>
    </>
    )
}