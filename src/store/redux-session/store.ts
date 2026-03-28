import { configureStore } from '@reduxjs/toolkit';
import sessionsReducer from './sessionsSlice';
import { api } from "../../api/api";


export const store = configureStore({
  reducer: {
    sessions: sessionsReducer,
    [api.reducerPath]: api.reducer,
  },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

















// function loadState() {
//   try {
//     const serializedState = localStorage.getItem('sessions');
//     if (serializedState === null) return undefined;
//     return { sessions: JSON.parse(serializedState) };
//   } catch (e) {
//     console.log(e);
//     return undefined;
//   }
// }

// export const store = configureStore({
//   reducer: {
//     sessions: sessionsReducer,
//   },
//   preloadedState: loadState(),
// });


// store.subscribe(() => {
//   localStorage.setItem(
//     'sessions',
//     JSON.stringify(store.getState().sessions)
//   );
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export default store;