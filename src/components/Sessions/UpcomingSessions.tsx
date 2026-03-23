import { useEffect, useRef } from "react";
import type { ModalHandle } from "../UI/Modal";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import UpcommingSession from "./UpcomingSession";

import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store/redux-session/store";
import { cancelSession } from "../../store/redux-session/sessionsSlice";

type UpcomingSessionsProps= {
    onClose:()=> void;
}

export default function UpcomingSessions({onClose}:UpcomingSessionsProps){
  
  const modal= useRef<ModalHandle>(null);
  const dispatch = useDispatch<AppDispatch>();

  const sessions = useSelector((state: RootState) => state.sessions.upcomingSessions);

    useEffect(()=>{
        if(modal.current){
            modal.current.open();
        }
    },[]);

  const hasSessions = sessions.length > 0;

  function handleCancelSession(sessionId: string) {
    dispatch(cancelSession(sessionId));
  }

  return(
    <Modal ref={modal} onClose={onClose}>
      <h2>Upcoming Sessions</h2>

      {hasSessions && (
        <ul>
          {sessions.map((session) => (
             <li key={`${session.id}-${session.userEmail}`}>
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