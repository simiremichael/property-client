import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { postsApi } from './services/posts';
//import { apiSlice } from './app/api/apiSlice';
//import { authReducer } from './features/authSlice';


export const store = configureStore({
  reducer: {
   // posts: addPosts,
    // Add the generated reducer as a specific top-level slice
    [postsApi.reducerPath]: postsApi.reducer,
   // auth: authReducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({immutableCheck: false,
      serializableCheck: false,}).concat(postsApi.middleware),
    //devTools: true
});


// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)