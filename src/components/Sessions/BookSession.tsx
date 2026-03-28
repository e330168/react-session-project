import { useEffect, useRef, useState, type FormEvent } from "react";
import type { ModalHandle } from "../UI/Modal";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import Input from "../UI/Input";
import styles from './BookSession.module.css';

import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/redux-session/store";
import { bookSession } from "../../store/redux-session/sessionsSlice";
import type {Session } from "../../store/redux-session/SessionsType";


type BookSessionProps={
  session: Session;
  onDone: ()=> void;
};

export default function BookSession({session,onDone}: BookSessionProps){
 
 
  const modal = useRef<ModalHandle>(null);
  const dispatch = useDispatch<AppDispatch>();

  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});


    useEffect(()=>{
        if(modal.current){
            modal.current.open();
        }
    },[]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

      const formData= new FormData(event.currentTarget);
      const data=Object.fromEntries(formData);

      console.log(data);

    const name = data.name as string;
    const email = data.email as string;

    const newErrors: typeof errors = {};

    if (!name || name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!email || !/^[\w.-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});


    dispatch(
      bookSession({
        session,
        userName: name,
        userEmail: email,
      })
    );

    onDone();
  }

     return(
     <Modal ref={modal} onClose={onDone}>
         <h2>Book Session</h2>
  
            <form onSubmit={handleSubmit}>
              
                <Input label="Your name" id="name" name="name" type="text"/>
                {errors.name && <p className={styles.error}>{errors.name}</p>}

                <Input label="Your email" id="email" name="email" type="email"/>
                {errors.email && <p className={styles.error}>{errors.email}</p>}

                 <p className={styles.actions}>
                      <Button type="button" textOnly onClick={onDone}>
                        Cancel
                      </Button>
                      <Button>Book Session</Button>
                 </p>

            </form>

     </Modal>
    )
}