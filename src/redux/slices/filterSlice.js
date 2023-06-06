import {createSlice} from '@reduxjs/toolkit'

const initialState = {
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
        setCategoryId(state, action) {
            console.log(action)
            state.categoryId = action.payload
        },

        setSortType(state, action) {
            state.sortType = action.payload
        },

        setCurrentPage(state, action) {
            state.currentPage = action.payload
        },

        setFilters(state, action) {
            state.categoryId = action.payload.categoryId
            state.currentPage = action.payload.currentPage
            state.sortType.sortProperty = action.payload.sortProperty
            // console.log('categoryId', state.categoryId)
            // console.log('currentPage', state.currentPage)
            // console.log('sortProperty', state.sortType.sortProperty)
        }
    },
})

export const {setCategoryId, setSortType, setCurrentPage, setFilters} = filterSlice.actions

export default filterSlice.reducer