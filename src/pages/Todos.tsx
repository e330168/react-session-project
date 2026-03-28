import { useLoaderData} from "react-router-dom";
import type { Todo } from "../store/todo/TodoType";
import TodosList from "../components/Todos/TodosList";
import { useAuth } from "../context/useAuth";
import { getTodosForUser, getUsers } from "../helpers/todos";
import styles from "./Todos.module.css";

export default function Todos(){

    const {user} = useAuth();
    const todosData = useLoaderData() as Todo[];

    if (!user) return null;

    const users = getUsers(todosData);
    console.log(users, 'users');

    const userTodos =
    user.id === 1
        ? todosData
        : getTodosForUser(todosData, user.id);

    console.log(userTodos, 'userTodos');
    // console.log(Number(user?.id), 'user.id');

    const totalTodos = userTodos.length;
    const firstId = userTodos[0]?.id;
    const lastId = userTodos[userTodos.length - 1]?.id;

    
    return(
       <main className={styles.todosPage}>
            <header>
                <h4 className={styles.title}> Welcome back, {user?.username.toUpperCase()} !</h4>
                <h4>Role: {user?.role}</h4>
                    <p>
                    You can view {totalTodos} todos (IDs:  {firstId} - {lastId})
                    </p>
                <br/>
            </header>
            <TodosList todos={userTodos}/>
        </main>
    )
}