import { configureStore } from '@reduxjs/toolkit'
import homereducer from './homeslice'
export const store = configureStore({
  reducer: {
    homeval:homereducer
  },
})