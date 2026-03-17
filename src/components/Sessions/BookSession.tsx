import { useEffect, useRef } from "react";
import type { ModalHandle } from "../UI/Modal";
import Modal from "../UI/Modal";
import Button from "../UI/Button";

export type Session = {
  id: string;
  title: string;
  summary: string;
  description: string;
  date: string;
  image: string;
  duration: number;
};

type BookSessionProps={
  session: Session;
  onDone: ()=> void;
};

export default function BookSession({session,onDone}: BookSessionProps){

    const modal= useRef<ModalHandle>(null);

    useEffect(()=>{
        if(modal.current){
            modal.current.open();
        }
    },[]);

    return(
     <Modal ref={modal} onClose={onDone}>
         
         <h2>Book Session</h2>
          
            <form>
              
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