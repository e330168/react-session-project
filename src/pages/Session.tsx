import { useLoaderData, useNavigate} from "react-router-dom";
import Button from "../components/UI/Button";
import { useState } from "react";
import BookSession from "../components/Sessions/BookSession";
import { getDaysDistance } from "../helpers/date";
import { useAuth } from "../context/useAuth.ts";
import { PERMISSIONS } from "../helpers/roles.ts";
import { deleteSessions } from "../api/index.ts";
import {images} from "../helpers/images.ts";
import type { Session } from "../store/redux-session/SessionsType";
import styles from "./Session.module.css";


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
      
    const diffDays = loadedSession?.date ? getDaysDistance(loadedSession.date) : 0;
    console.log(diffDays)

    // const btnClass = diffDays < 0 ? styles.buttonDisabled: styles.button;

    return (
    <main className={styles.sessionPage}>
      {isBooking && 
           <BookSession session={loadedSession} onDone={handleStopBooking}/>
        }

       <article className={styles.article}>
         <header className={styles.header}>
           <img
             className={styles.image}
             src={images[loadedSession.image]}
             alt={loadedSession.description}/>

           <div className={styles.details}>
              <div>
                  <h2>{loadedSession.title}</h2>
                  <time dateTime={new Date(loadedSession.date).toISOString()}>
                          {new Date(loadedSession.date).toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                        })}
                  </time>

             <p className={styles.status}>
               {diffDays > 0
                 ? `Happening in ${diffDays} day(s)`
                 : diffDays < 0
                 ? `Happened ${Math.abs(diffDays)} day(s) ago`
                 : "Happening today!"}
             </p>
             {diffDays < 0 && (
               <p className={styles.error}>This session has already passed.</p>
             )}

                <h2>Price: ${loadedSession.price}</h2>


                <p>
                {diffDays>0 && 
                  (
                    <Button
                      onClick={handleStartBooking}
                      disabled={diffDays < 0}
                    >
                      {/* className={btnClass} */}
                      Book Session
                    </Button>
                  )
                }
                </p>

                <div className={styles.actions}>
                  <p>
                    {hasPermission(PERMISSIONS.DELETE_SESSION)&&(
                    <Button className={styles.btnDelete}
                            onClick={handleDeleteSession} 
                            >Delete
                    </Button>
                    )}

                    <Button className={styles.btnEdit}
                            onClick={()=>alert(`Edit: ${loadedSession.description}`)} 
                            >Edit
                    </Button>
                  
                  </p>
                </div>

                </div>
                </div>

                <p className={styles.content}>{loadedSession.description}</p>

           </header>
         </article>
     </main>
    )
}