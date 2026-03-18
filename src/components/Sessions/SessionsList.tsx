import { useEffect, useState } from "react";
import SessionItem from "./SessionItem";
import { searchSessions } from "../../helpers/search";
import SearchBar from "../UI/SearchBar";

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

const [query, setQuery] = useState('');
const [filteredSessions, setFilteredSessions] = useState(sessions);
    
function handleSearch() {
  const result = searchSessions(sessions, query);
  setFilteredSessions(result);
}

useEffect(() => {
    setFilteredSessions(sessions);
}, [sessions]);

// useEffect(() => {
//   const result =
//     query.trim() === '' ? sessions : searchSessions(sessions, query);
//   setFilteredSessions(result);
// }, [query, sessions]);

return (
        <>
            <div id="search">
                <SearchBar
                        onClick={handleSearch}
                        query={query}
                        setQuery={setQuery}/>
            </div>

            <ul id="sessions-list">
                {filteredSessions.map((session) => (
                <li key={session.id}>
                    <SessionItem {...session} />
                </li>
                ))}
            </ul>
        </>
    )
}
