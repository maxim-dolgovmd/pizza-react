import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './slices/filterSlice'
import cartReducer from './slices/cartSlice'
import pizza from './slices/pizzaSlice'
import { useDispatch } from 'react-redux'


export const store = configureStore({
  reducer: {
    filterReducer,
    cartReducer,
    pizza,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
