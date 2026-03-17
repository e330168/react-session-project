import { useEffect, useRef } from "react";
import type { ModalHandle } from "../UI/Modal";
import { useSessionsContext } from "../../store/useSessionsContext";
import Modal from "../UI/Modal";
import Button from "../UI/Button";

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
    
    return(
   <Modal ref={modal} onClose={onClose}>
    
     <h2>Upcoming Sessions</h2>

     {!hasSessions && <p>No upcoming sessions.</p>}

     <p className="actions">
      <Button onClick={onClose}>Close</Button>
     </p>

   </Modal>
    )
}