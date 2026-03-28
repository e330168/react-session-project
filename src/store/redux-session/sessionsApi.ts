import { api } from "../../api/api";
import type { Session } from "./SessionsType";
import { store } from '../../store/redux-session/store';
import type { LoaderFunctionArgs } from "react-router-dom";

export const sessionsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSessions: builder.query<Session[], void>({
      query: () => "/sessions",
      providesTags: ["Sessions"],
    }),

    getSessionById: builder.query<Session, string>({
      query: (id) => ({
        url: `/sessions/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Sessions", id }],
    }),

    deleteSessionById: builder.mutation<void, string>({
      query: (id) => ({
        url: `/sessions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Sessions"],
    }),
  }),
});

export const {
  useGetSessionsQuery,
  useGetSessionByIdQuery,
  useLazyGetSessionByIdQuery,
  useDeleteSessionByIdMutation
} = sessionsApi;


export const sessionsLoader = async () => {
  const result = await store.dispatch(
    sessionsApi.endpoints.getSessions.initiate()
  );

  return result.data ?? [];
};

export const getSessionById = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id;

  if (!id) throw new Error("Session ID is required");

  const result = await store.dispatch(
    sessionsApi.endpoints.getSessionById.initiate(id)
  );

  return result.data;
};

export const deleteSessionById = async (params : string) => {
  const id = params;

  if (!id) throw new Error("Session ID is required");

  const result = await store.dispatch(
    sessionsApi.endpoints.deleteSessionById.initiate(id)
  );

  return result.data;
};