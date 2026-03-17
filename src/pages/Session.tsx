import { useParams } from "react-router-dom";
import {SESSIONS} from "../dummy-sessions";
import Button from "../components/UI/Button";
import { useState } from "react";
import BookSession from "../components/Sessions/BookSession";
import { getDaysDistance } from "../helpers/date";

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
      
    const diffDays = getDaysDistance(loadedSession.date);

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

                  <div className="text-h3">
                    {diffDays > 0
                      ? `Happening in ${diffDays} day(s)`
                      : diffDays < 0
                      ? `Happened ${Math.abs(diffDays)} day(s) ago`
                      : 'Happening today!'}
                  </div>
                  {diffDays < 0 && <p className="error">This session has already passed.</p>}

                  <p>
                    <Button onClick={handleStartBooking}
                            disabled={diffDays < 0}
                            className={`button ${diffDays < 0 ? 'button--disabled' : ''}`}
                            >Book Session
                    </Button>
                  </p>
               </div>
          </header>
          <p id="content">{loadedSession.description}</p>
         </article>
        </main>
    )
}