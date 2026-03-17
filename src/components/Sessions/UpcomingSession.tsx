import Button from "../UI/Button";

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
  return(
    <article className="upcoming-session">
      
      <div>
        
        <h3>{session.title}</h3>
        <p>{session.summary}</p>
        <time dateTime={new Date(session.date).toISOString()}>
          {new Date(session.date).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </time>

      <div className="personalData">
        <h6>{session.userName}</h6>
        <h6>{session.userEmail}</h6>
      </div>

      </div>

      <p className="actions">
        <Button textOnly onClick={onCancel}>
          Cancel
        </Button>
      </p>
      
    </article>
  );
}
