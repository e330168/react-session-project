import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UpcomingSessions from "../Sessions/UpcomingSessions";
import Button from "../UI/Button";
import { useAuth } from "../../context/useAuth";
import { PERMISSIONS } from "../../helpers/roles";

export default function MainHeader(){

    const [upcomingSessionsVisible, setUpcomingSessionsVisible]= useState(false);
    const {user,hasPermission,logout}= useAuth();
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

              {user && user.role !== "guest" ? (
                            <>

                              {/* {user.permissions.includes("view_todos") && ( */}
                                <li>
                                <NavLink to="/todos" className={({ isActive }) => isActive ? 'active' : ''}>
                                Todos
                                </NavLink>
                                </li>
                              {/* )} */}

                                <li>
                                <NavLink to="/sessions" className={({ isActive }) => isActive ? 'active' : ''}>
                                Browse Sessions
                                </NavLink>
                                </li>
                   

                                {[PERMISSIONS.EDIT_SESSION, PERMISSIONS.DELETE_SESSION].some(p =>
                                  hasPermission(p)
                                ) && (
                                  <Button onClick={showUpcomingSessions}>
                                    Upcoming Sessions
                                  </Button>
                                )}

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