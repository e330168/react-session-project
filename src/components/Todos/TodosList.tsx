import type { Todo } from "../../store/todo/TodoType";

type TodosListProps = {
  todos: Todo[];
};

export default function TodosList({todos}:TodosListProps){
    return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "16px",
      }}
    >
      {todos.map((todo) => (
        <div
          key={todo.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "16px",
            backgroundColor: todo.completed ? "#e6ffed" : "#fff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <input type="checkbox" checked={todo.completed} readOnly />

            <h3
              style={{
                margin: 0,
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.title}
            </h3>
          </div>

          <p style={{ marginTop: "10px", color: "#555" }}>
            Status: {todo.completed ? "Done" : "To Do"}
          </p>
        </div>
      ))}
    </div>
  );
}