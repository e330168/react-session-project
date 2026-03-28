import { api } from "../../api/api";
import type { Todo } from "./TodoType";
import { store } from '../../store/redux-session/store';

export const todoApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => "https://jsonplaceholder.typicode.com/todos",
      providesTags: ["Todos"],
    }),
  }),
});

export const { useGetTodosQuery } = todoApi;

export const getTodos = async () => {
  const result = await store.dispatch(
    todoApi.endpoints.getTodos.initiate()
  );

  return result.data ?? [];
};