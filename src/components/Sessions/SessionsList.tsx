import {useMemo, useState } from "react";
import SessionItem from "./SessionItem";
import { searchSessions } from "../../helpers/search";
import { months } from "../../helpers/constants";
import { sessionDateStatus } from "../../helpers/constants";
import { getDaysDistance } from "../../helpers/date";

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
const [selectedMonth, setSelectedMonth] = useState<string>("");
const [selectedStatusFilter, setStatusFiler] = useState('');


  function handleClear() {
    setQuery('');
  }

  const filteredSessions = useMemo(() => {
        let result = sessions;

        if (query.trim() !== "") {
            result = searchSessions(result, query);
        }
        
        if (selectedMonth !== "") {
            result = result.filter(
                (session) => new Date(session.date).getMonth().toString() === selectedMonth
            );
        }

        if (selectedStatusFilter === "active") {
            result = result.filter(
            (session) => getDaysDistance(session.date) >= 0
            );
        }

        if (selectedStatusFilter === "expired") {
            result = result.filter(
            (session) => getDaysDistance(session.date) < 0
            );
        }

        return result;
  }, [sessions, query, selectedMonth,selectedStatusFilter]);

return (
        <>

        <div id="search">

            <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="dropdown"
            >
                {months.map((month) => (
                <option key={month.value} value={month.value}>
                        {month.label}
                </option>
                ))}

            </select>

            <select
            value={selectedStatusFilter}
            onChange={(e) => setStatusFiler(e.target.value)}
            className="dropdown"
            >
                {sessionDateStatus.map((status) => (
                <option key={status.value} value={status.value}>
                        {status.label}
                </option>
                ))}

            </select>

            <input
            type="text"
            className="item"
            value={query}
            onChange={(e) => {
            setQuery(e.target.value);
            }}
            placeholder="Search sessions..."/>

            {query && (
                <button
                type="button"
                onClick={handleClear}
                className="clear-btn"
                >
                ✕
                </button>
            )}

        </div>

        {filteredSessions.length > 0 && (
            <ul id="sessions-list">
                {filteredSessions.map((session) => (
                <li key={session.id}>
                    <SessionItem {...session} />
                </li>
                ))}
            </ul>
        )}

        {filteredSessions.length === 0 && (
            <p className="no-sessions">
                {query.trim()
                ? "No sessions match your search."
                : "No sessions available."}
            </p>
            )}

      </>
    )
}
























// function handleSearch() {
//   const result = searchSessions(sessions, query);
//   setFilteredSessions(result);
// }

// useEffect(() => {
//     setFilteredSessions(sessions);
// }, [sessions]);

// useEffect(() => {
//   const result =
//     query.trim() === '' ? sessions : searchSessions(sessions, query);
//   setFilteredSessions(result);
// }, [query, sessions]);