import type { ComponentPropsWithoutRef } from "react";
import styles from './Input.module.css';

type InputProps={
 label:string;
 id:string;
}& ComponentPropsWithoutRef<'input'>;

export default function Input({label, id, ...props}:InputProps){
    return(
       <div className={styles.control}>
          <label htmlFor={id}>{label}</label>
          <input id={id} {...props}/>
       </div>
    );
}
