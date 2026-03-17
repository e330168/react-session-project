import { NavLink } from "react-router-dom";

export default function MainHeader(){
    return(
        <>
        <header id="main-header">

         <h1>React Mentoring</h1>

         <nav>
            <ul>
                <li>
                    <NavLink to="/" className={({isActive})=>isActive ? 'active' : ''} end>Our Mission</NavLink>
                </li>
                <li>
                    <NavLink to="/sessions" className={({isActive})=>isActive ? 'active' : ''}>Browse Sessions</NavLink>
                </li>
            </ul>
         </nav>

        </header>
        </>
    )
}