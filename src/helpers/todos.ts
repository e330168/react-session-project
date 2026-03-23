import { getTodos } from "../api";
import type { User } from "../context/AuthType";
import type { Todo } from "../store/todo/TodoType";

export function getTodosForUser(todos: Todo[], userId: number) {
  return todos.filter((todo) => todo.userId === userId);
}

export function createUsersFromTodos(todos: Todo[]): User[] {
  const uniqueUserIds = [...new Set(todos.map((t) => t.userId))];

  return uniqueUserIds.map((id) => ({
    id,
    username: `user${id}`,
    password: "123456",
    role: id === 1 ? "admin" : "user",
    permissions:
      id === 1
        ? ["view_todos", "edit_todos", "delete_todos"]
        : ["view_todos"],
  }));
}

export const getUsers = (todos: Todo[]): User[] => {
  try {
    const response = createUsersFromTodos(todos);
    return response;
  } catch (error) {
    console.log("Failed to create users: ", error);
    return [];
  }
};

export async function loginTodo(username: string,password: string): Promise<User | null> {
  if (!username.toLowerCase().startsWith("user")) return null;

  const todos = (await getTodos())!;
  const users = getUsers(todos);

  const user = users.find(
    (u) =>
      u.username.toLowerCase() === username.toLowerCase() &&
      u.password === password
  ) || null;

  return user;
}