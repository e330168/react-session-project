import SessionsList from "../components/Sessions/SessionsList";
import { useAuth } from "../context/useAuth";
import {SESSIONS} from "../dummy-sessions";

export default function Sessions(){

    const{user}= useAuth();
    console.log(user);


    return(
        <main id="sessions-page">
            <header>
                <h1> Welcome back, {user?.username.toUpperCase()} !</h1>
                <h2>Role: {user?.role}</h2>
                <h2>Available mentoring sessions</h2>
                     <p>
                        From an one-on-one introduction to React's basics all the way up to a
                        deep dive into state mechanics - we got just the right session for
                        you!
                     </p>
            </header>
                <SessionsList sessions={SESSIONS}/>
        </main>
    )
}