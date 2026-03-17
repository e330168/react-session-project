import { useEffect, useRef } from "react";
import type { ModalHandle } from "../UI/Modal";
import { useSessionsContext } from "../../store/useSessionsContext";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import UpcommingSession from "./UpcomingSession";

type UpcomingSessionsProps= {
    onClose:()=> void;
}

export default function UpcomingSessions({onClose}:UpcomingSessionsProps){
    
    const modal= useRef<ModalHandle>(null);
    const sessionsCtx = useSessionsContext();

    useEffect(()=>{
        if(modal.current){
            modal.current.open();
        }
    },[]);

    const hasSessions = sessionsCtx.upcomingSessions.length > 0;

    function handleCancelSession(sessionId: string) {
     sessionsCtx.cancelSession(sessionId);
    }
    
    return(
        <Modal ref={modal} onClose={onClose}>

            <h2>Upcoming Sessions</h2>

            {hasSessions && (
            <ul>
                {sessionsCtx.upcomingSessions.map((session)=>(
                    <li key={session.id}>
                       <UpcommingSession
                          session={session}
                          onCancel={()=>handleCancelSession(session.id)}
                       />
                    </li>
                ))}
            </ul>
            )}

            {!hasSessions && <p>No upcoming sessions.</p>}

            <p className="actions">
            <Button onClick={onClose}>Close</Button>
            </p>

        </Modal>
    )
}