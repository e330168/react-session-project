import { useLoaderData} from "react-router-dom";
import SessionsList from "../components/Sessions/SessionsList";
import { useAuth } from "../context/useAuth";
import {images} from "../helpers/images.ts";
import type { Session } from "../store/session/SessionsType.ts";

export type ImageKey = keyof typeof images;
export default function Sessions(){

    const{user}= useAuth();

    const SESSIONS = useLoaderData() as Session[];
    
    const sessionsWithImages = SESSIONS.map((session:Session) => ({
        ...session,
        image: images[session.image],
    }));
    
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
                <SessionsList sessions={sessionsWithImages}/>
        </main>
    )
}