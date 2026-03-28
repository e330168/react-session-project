import { getDaysDistance } from "../../helpers/date";
import Button from "../UI/Button";
import styles from "./UpcomingSession.module.css";

type UpcommingSessionProps={
  session:{
    id: string;
    title: string;
    summary: string;
    date: string;
    userName:string;
    userEmail:string;
  };
  onCancel:()=>void
};

export default function UpcomingSession({session,onCancel}: UpcommingSessionProps){

const diffDays = getDaysDistance(session.date);

  return(
    <article className={styles.upcomingSession}>
      
      <div>

        <h3 className={styles.title}>{session.title}</h3>
        <p className={styles.summary}>{session.summary}</p>
        
        {session.date ? (
          <time dateTime={new Date(session.date).toISOString()}>
            {new Date(session.date).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </time>
        ) : (
          <span>Date not available</span>
        )}

        <p>
          {diffDays > 0
            ? `Happening in ${diffDays} day(s)`
            : diffDays < 0
            ? `Happened ${Math.abs(diffDays)} day(s) ago`
            : 'Happening today!'}
        </p>

        <div className={styles.personalData}>
          <h6>{session.userName}</h6>
          <h6>{session.userEmail}</h6>
        </div>

        </div>

        <p className={styles.actions}>
          <Button textOnly onClick={onCancel}>
            Cancel
          </Button>
        </p>
      
    </article>
  );
}
