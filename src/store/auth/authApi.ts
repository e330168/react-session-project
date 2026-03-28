import { api } from "../../api/api";
import type { User } from "../../context/AuthType";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.query<User[], void>({
      query: () => "/users",
    }),
  }),
});

export const { useLazyLoginQuery } = authApi;