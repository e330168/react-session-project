import { useEffect, useRef, type FormEvent } from "react";
import type { ModalHandle } from "../UI/Modal";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import type { BookedSession, Session } from "../../store/SessionsType";
import { useSessionsContext } from "../../store/useSessionsContext";
import Input from "../UI/Input";

type BookSessionProps={
  session: Session;
  onDone: ()=> void;
};

export default function BookSession({session,onDone}: BookSessionProps){

    const modal= useRef<ModalHandle>(null);
    const sessionsCtx= useSessionsContext();

    useEffect(()=>{
        if(modal.current){
            modal.current.open();
        }
    },[]);


    function handleSubmit(event: FormEvent<HTMLFormElement>){
      event.preventDefault();

      const formData= new FormData(event.currentTarget);
      const data=Object.fromEntries(formData);

      console.log(data);

      const bookSession: BookedSession= {
        userName:data.name as string,
        userEmail:data.email as string,
        ...session
      };

      sessionsCtx.bookSession(bookSession);

      console.log("Upcoming sessions after booking:", sessionsCtx.upcomingSessions);
      onDone();
    }

    return(
     <Modal ref={modal} onClose={onDone}>
         <h2>Book Session</h2>
  
            <form onSubmit={handleSubmit}>
              
                  <Input label="Your name" id="name" name="name" type="text" />
                  <Input label="Your email" id="email" name="email" type="email" />

                 <p className="actions">
                      <Button type="button" textOnly onClick={onDone}>
                        Cancel
                      </Button>
                      <Button>Book Session</Button>
                 </p>
            </form>

     </Modal>
    )
}