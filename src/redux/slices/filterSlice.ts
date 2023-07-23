import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import { RootState } from '../store'

export type Sort = {
    name: string,
    sortProperty: 'rating' | '-rating' | 'price' | '-price' | 'title' | '-title'
}

export interface FilterState {
    searchValue: string,
    categoryId: number,
    currentPage: number,
    sortType: Sort
}

const initialState: FilterState = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sortType: {
        name: 'популярности',
        sortProperty: 'rating',
    },
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            console.log(action.payload)
            state.categoryId = action.payload
        },

        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload
        },

        setSortType(state, action: PayloadAction<Sort>) {
            state.sortType = action.payload
        },

        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        },

        setFilters(state, action: PayloadAction<FilterState>) {
            if (Object.keys(action.payload).length) {
                state.categoryId = Number(action.payload.categoryId)
                state.currentPage = Number(action.payload.currentPage)
                state.sortType = action.payload.sortType
            } 
        }
    },
})

export const selectFilter = (state: RootState) => state.filterReducer

export const selectSortType = (state: RootState) => state.filterReducer.sortType

export const {setCategoryId, setSortType, setCurrentPage, setFilters, setSearchValue} = filterSlice.actions

export default filterSlice.reducer