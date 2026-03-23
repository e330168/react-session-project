import { configureStore } from '@reduxjs/toolkit';
import sessionsReducer from './sessionsSlice';


export const store = configureStore({
  reducer: {
    sessions: sessionsReducer,
  },
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