import { useParams } from "react-router-dom";
import {SESSIONS} from "../dummy-sessions";

export default function Session(){
   
    const params= useParams<{id:string}>();
   
    const sessionId= params.id;
    const loadedSession= SESSIONS.find((session)=> session.id ===sessionId);

    if(!loadedSession){
        return (
            <main>
                <p>No session found!</p>
            </main>
        )
    }
   
    return (
        <main id="session-page">
         <article>
          <header>
              <img  
                 src={loadedSession.image}
                 alt={loadedSession.description}
               />

               <div>
                  <h2>{loadedSession.title}</h2>
                  <time dateTime={new Date(loadedSession.date).toISOString()}>
                          {new Date(loadedSession.date).toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                        })}
                  </time>
               </div>
             {/* Book Session button*/}
          </header>
          <p id="content">{loadedSession.description}</p>
         </article>
        </main>
    )
}