import axios from "axios";
import type { User } from "../context/AuthType";
import type { Todo } from "../store/todo/TodoType";
import type { Session } from "../store/session/SessionsType";

const API_URL="http://localhost:3001";

const API_TODO="https://jsonplaceholder.typicode.com/todos";

//Login User
export const login= async(
    username:string,
    password:string
): Promise<User| null> =>{
  try {
    const response= await axios.get<User[]>
                         (`${API_URL}/users`
    );

    console.log("ALL USERS:", response.data);

    const user = response.data.find(
      (u) =>
        u.username === username &&
        u.password === password
    );

    console.log("FOUND USER:", user);

    return user || null;
  } catch (error) {
    console.log("Login failes: ",error);
    return null;
  }
};

//Fetch Todos
const getTodos = async (): Promise<Todo[]> => {
  const res = await axios.get<Todo[]>(`${API_TODO}`);
  return res.data;
};


//Fetch Sessions
export const getSessions= async(): Promise<Session[]| null> =>{
  try {
    const response= await axios.get<Session[]>
                         (`${API_URL}/sessions`);
    return response.data;
  } catch (error) {
    console.log("Failed to fetch session: ",error);
    return null;
  }
};

//Fetch Session
export const getSessionById = async (
  id: string
): Promise<Session | null> => {
  try {
    const response = await axios.get<Session>(`${API_URL}/sessions/${id}`);
    return response.data;
  } catch (error) {
    console.log("Failed to fetch session: ", error);
    return null;
  }
};


//Delete Session
export const deleteSessions= async(
  id:string
): Promise<void> =>{
  try {
    await axios.delete(`${API_URL}/sessions/${id}`);

  } catch (error) {
    console.log("Failed to delete session: ",error);
  }
};