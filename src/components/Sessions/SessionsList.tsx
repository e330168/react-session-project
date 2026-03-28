import { useMemo, useState } from "react";
import SessionItem from "./SessionItem";
import { searchSessions } from "../../helpers/search";
import { months, sessionDateStatus } from "../../helpers/constants";
import { getDaysDistance } from "../../helpers/date";
import styles from "./SessionsList.module.css";

export type SessionListProps = {
  sessions: {
    id: string;
    title: string;
    summary: string;
    description: string;
    duration: number;
    date: string;
    image: string;
  }[];
};

export default function SessionList({ sessions }: SessionListProps) {
  const [query, setQuery] = useState("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedStatusFilter, setStatusFiler] = useState("");

  function handleClear() {
    setQuery("");
  }

  const filteredSessions = useMemo(() => {
    let result = sessions;

    if (query.trim() !== "") {
      result = searchSessions(result, query);
    }

    if (selectedMonth !== "") {
      result = result.filter(
        (session) =>
          new Date(session.date).getMonth().toString() === selectedMonth
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
  }, [sessions, query, selectedMonth, selectedStatusFilter]);

  return (
    <>
      <div className={styles.search}>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className={styles.dropdown}
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
          className={styles.dropdown}
        >
          {sessionDateStatus.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>

        <input
          type="text"
          className={styles.item}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search sessions..."
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className={styles.clearBtn}
          >
            ✕
          </button>
        )}
      </div>

      {filteredSessions.length > 0 && (
        <ul className={styles.sessionsList}>
          {filteredSessions.map((session) => (
            <li key={session.id}>
              <SessionItem {...session} />
            </li>
          ))}
        </ul>
      )}

      {filteredSessions.length === 0 && (
        <p className={styles.noSessions}>
          {query.trim()
            ? "No sessions match your search."
            : "No sessions available."}
        </p>
      )}
    </>
  );
}