import SessionItem from "./SessionItem";

export type SessionListProps={
    sessions: {
        id: string;
        title: string;
        summary: string;
        description: string;
        duration: number;
        date: string;
        image: string;
    }[]
};

export default function SessionList({sessions}:SessionListProps){
return (
       <ul id="sessions-list">
          {sessions.map((session)=>(
            <li key={session.id}>
                   <SessionItem {...session} />
            </li>
          ))}
       </ul>
    )
}