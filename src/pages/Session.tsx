import { useParams } from "react-router-dom";
import {SESSIONS} from "../dummy-sessions";
import Button from "../components/UI/Button";
import { useState } from "react";
import BookSession from "../components/Sessions/BookSession";

export default function Session(){
   
    const params= useParams<{id:string}>();
   
    const sessionId= params.id;
    const loadedSession= SESSIONS.find((session)=> session.id ===sessionId);

    const[isBooking, setIsBooking]= useState(false);

    if(!loadedSession){
        return (
            <main>
                <p>No session found!</p>
            </main>
        )
    }

    function handleStartBooking(){
      setIsBooking(true);
    }

    function handleStopBooking(){
      setIsBooking(false);
    }


    return (
        <main id="session-page">

        {isBooking && 
           <BookSession session={loadedSession} onDone={handleStopBooking}/>
        }

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
                  <p>
                    <Button onClick={handleStartBooking}>Book Session</Button>
                  </p>
               </div>
          </header>
          <p id="content">{loadedSession.description}</p>
         </article>
        </main>
    )
}