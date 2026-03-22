import { useLoaderData, useNavigate} from "react-router-dom";
import Button from "../components/UI/Button";
import { useState } from "react";
import BookSession from "../components/Sessions/BookSession";
import { getDaysDistance } from "../helpers/date";
import { useAuth } from "../context/useAuth.ts";
import { PERMISSIONS } from "../helpers/roles.ts";
import { deleteSessions } from "../api/index.ts";
import {images} from "../helpers/images.ts";
import type { Session } from "../store/session/SessionsType.ts";

export default function Session(){
   
  // const params= useParams<{id:string}>();
  // const sessionId= params.id;
  // const loadedSession= SESSIONS.find((session)=> session.id ===sessionId);
  
  const loadedSession = useLoaderData() as Session;
  console.log(loadedSession);

  const {hasPermission}= useAuth();
  const navigate= useNavigate();

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

      const handleDeleteSession=async()=>{
        if(!hasPermission(PERMISSIONS.DELETE_SESSION)){
           navigate("/unauthorized");
           return;
        }

        if(window.confirm("Are you sure you want to delete this product?")){
          await deleteSessions(loadedSession.id);
          navigate("/sessions");
        }
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
                 src={images[loadedSession.image]}
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

                  <h2>Price: ${loadedSession.price}</h2>

                  <p>
                    <Button onClick={handleStartBooking}
                            disabled={diffDays < 0}
                            className={`button ${diffDays < 0 ? 'button--disabled' : ''}`}
                            >Book Session
                    </Button>
                  </p>

                  <p>
                    {hasPermission(PERMISSIONS.DELETE_SESSION)&&(
                    <Button id="btn-delete"
                            onClick={handleDeleteSession} 
                            >Delete
                    </Button>
                    )}

                    <Button id="btn-edit"
                            onClick={()=>alert(`Edit: ${loadedSession.description}`)} 
                            >Edit
                    </Button>
                  
                  </p>

               </div>
          </header>
          <p id="content">{loadedSession.description}</p>
         </article>
        </main>
    )
}