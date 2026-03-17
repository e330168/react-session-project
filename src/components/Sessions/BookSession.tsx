import { useEffect, useRef, useState, type FormEvent } from "react";
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

    const [errors, setErrors] = useState<{name?: string; email?: string}>({});

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      const formData= new FormData(event.currentTarget);
      const data=Object.fromEntries(formData);

      console.log(data);

      const bookSession: BookedSession= {
        userName:data.name as string,
        userEmail:data.email as string,
        ...session
      };

      const newErrors: typeof errors = {};

      if (!bookSession.userName || bookSession.userName.length < 2) {
        newErrors.name = "Name must be at least 2 characters";
      }

      if (!bookSession.userEmail || !/^[\w.-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(bookSession.userEmail)) {
        newErrors.email = "Please enter a valid email";
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      setErrors({});
      sessionsCtx.bookSession(bookSession);
      onDone();
    }

    return(
     <Modal ref={modal} onClose={onDone}>
         <h2>Book Session</h2>
  
            <form onSubmit={handleSubmit}>
              
                <Input label="Your name" id="name" name="name" type="text"/>
                {errors.name && <p className="error">{errors.name}</p>}

                <Input label="Your email" id="email" name="email" type="email"/>
                {errors.email && <p className="error">{errors.email}</p>}

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









    // function handleSubmit(event: FormEvent<HTMLFormElement>){
    //   event.preventDefault();

    //   const formData= new FormData(event.currentTarget);
    //   const data=Object.fromEntries(formData);

    //   console.log(data);

    //   const bookSession: BookedSession= {
    //     userName:data.name as string,
    //     userEmail:data.email as string,
    //     ...session
    //   };

    //   sessionsCtx.bookSession(bookSession);

    //   console.log("Upcoming sessions after booking:", sessionsCtx.upcomingSessions);
    //   onDone();
    // }
    

          {/* <Input label="Your name"
                      id="name"
                      name="name" 
                      type="text" 
                      minLength={2} 
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" 
                      required />

              <Input label="Your email" 
                      id="email" 
                      name="email" 
                      type="email" 
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" 
                      title="Please enter a valid email" 
                      required/> */}