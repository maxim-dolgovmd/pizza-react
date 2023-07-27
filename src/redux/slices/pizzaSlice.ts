import {createSlice, createAsyncThunk, isFulfilled} from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store'
import { CartItem } from './cartSlice'
import { Sort } from './filterSlice'

// type FetchPizzazArgs = Record<string, string>

export type FetchPizzazArgs = {
    sortBy: string,
    order: string,
    category: string,
    search: string,
    currentPage: number,
}

type Pizza = {
    id: string,
    title: string,
    price: number,
    imageUrl: string,
    type: string,
    sizes: number,
    count: number
}

export enum Status {
    LOADING = "loading",
    SUCCES = 'succes',
    ERROR = 'error',
}

interface PizzaSliceState {
    status: Status
    item: Pizza[],
}

export const fetchPizzaz = createAsyncThunk<Pizza[], FetchPizzazArgs>(
    'pizza/fetchPizzazStatus',
    async (params) => {
        const {sortBy, order, category, search, currentPage} = params
        const {data} = await axios.get<Pizza[]>(
            `https://6435d8c48205915d34e74909.mockapi.io/items?&page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        )
        return data
    }
  )

const initialState: PizzaSliceState = {
    status: Status.LOADING,
    item: [],
}

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            // state.items = action.payload
            console.log(state.item)
        },
    },
    extraReducers: (builder) => {

        builder.addCase(fetchPizzaz.pending, (state) => {
            state.status = Status.LOADING
            state.item = []
        });

        builder.addCase(fetchPizzaz.fulfilled, (state, action) => {
            state.item = action.payload
            state.status = Status.SUCCES
        });

        builder.addCase(fetchPizzaz.rejected, (state) => {
            state.status = Status.ERROR
            state.item = []
        });
    }
})

export const selectPizza = (state: RootState) => state.pizza

export const {setItems} = pizzaSlice.actions

export default pizzaSlice.reducer