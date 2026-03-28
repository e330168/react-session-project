import type { ComponentPropsWithoutRef, ReactNode} from "react";
import { Link, type LinkProps } from 'react-router-dom';
import styles from "./Button.module.css";

type BaseProps={
  children:ReactNode;
  textOnly?:boolean;
};

type ButtonProps= ComponentPropsWithoutRef<'button'> &
                  BaseProps &
                  {to?: never};


type ButtonLinkProps= LinkProps &
                      BaseProps &
                      {to:string};

function isRouterLink(props: ButtonProps | ButtonLinkProps): props is ButtonLinkProps{
    return 'to' in props;
}

export default function Button(props: ButtonProps | ButtonLinkProps){


   if(isRouterLink(props)){
     const {children, textOnly, ...otherProps}= props;

    return(
       <Link 
       className={`button ${textOnly? "buttonTextOnly" : ""}`}
       {...otherProps}
       >
        {children}
       </Link>
    );
   }

    const {children, textOnly, ...otherProps}= props;
    const btnClass = textOnly ? `${styles.button} ${styles["buttonTextOnly"]}`: styles.button;
    
    return(
        <button className={btnClass} {...otherProps}>
        {children}
       </button>
    );
}