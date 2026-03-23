import type { Todo } from "../../store/todo/TodoType";
import styles from './TodosList.module.css';

type TodosListProps = {
  todos: Todo[];
};

export default function TodosList({ todos }: TodosListProps) {
  return (
    <div className={styles.todosGrid}>
      {todos.map((todo) => (
        <div
          key={todo.id}
          className={`${styles.todoItem} ${todo.completed ? styles.completed : ''}`}
        >
          <div className={styles.todoHeader}>
            <input type="checkbox" checked={todo.completed} readOnly />
            <h3 className={`${styles.todoTitle} ${todo.completed ? styles.completed : ''}`}>
              {todo.title}
            </h3>
          </div>
          <p className={styles.todoStatus}>
            Status: {todo.completed ? "Done" : "To Do"}
          </p>
        </div>
      ))}
    </div>
  );
}