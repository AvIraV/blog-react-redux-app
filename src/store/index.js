import { configureStore } from '@reduxjs/toolkit'

import articles from './articlesSlice'
import authorisation from './authSlice'

const store = configureStore({
  reducer: { articles, authorisation },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
})

export default store
