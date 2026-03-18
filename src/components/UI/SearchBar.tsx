import searchI from "../../assets/searchI.png"

type SearchBarProps = {
  onClick: () => void;
  query: string;
  setQuery: (value: string) => void;
};

export default function SearchBar({onClick, query,setQuery}: SearchBarProps) {
  // const disabled = query.trim().length === 0;
    return (
      <>
          <input
              type="text"
              className="item"
              value={query}
              onChange={(e) => {
              setQuery(e.target.value);
              }}
              placeholder="Search sessions..."
          />

          <button
            onClick={onClick}>
            {/*
            disabled={disabled}
            className={disabled ? "button--disabled" : ""}
            >
          */}
        
            <img id="searchI"
              src={searchI}
              alt="search"/>
          </button>
    </>
  );
}




{/* <input
  type="text"
  value={query}
  onChange={(e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value.trim()) {
      setFilteredSessions(sessions);
    } else {
      setFilteredSessions(searchSessions(sessions, value));
    }
  }}
  placeholder="Search sessions..."
/> */}






