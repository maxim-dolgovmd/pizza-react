import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    items: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setItem(state, action) {
            // state.items.push(action.payload)
            // state.sumCart = state.items.reduce((acum, item) => acum + item.price, 0)
            const findItem = state.items.find((obj) => obj.id === action.payload.id)
            if (findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                })
            }
            state.sumCart = state.items.reduce((acum, item) => acum + item.price * item.count, 0)
            state.sumCount = state.items.reduce((acum, item) => acum + item.count, 0)
        },

        setMinusItem(state, action) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id)

            if (findItem) {
                findItem.count--
            }
            state.sumCart = state.items.reduce((acum, item) => acum + item.price * item.count, 0)
            state.sumCount = state.items.reduce((acum, item) => acum + item.count, 0)
        },

        setRemoveItem(state, action) {
            state.items = state.items.filter((obj) => obj.id !== action.payload) 

            state.sumCart = state.items.reduce((acum, item) => acum + item.price * item.count, 0)
            state.sumCount = state.items.reduce((acum, item) => acum + item.count, 0)
        },

        setClear(state, action) {
            state.items = [] 

            state.sumCart = state.items.reduce((acum, item) => acum + item.price * item.count, 0)
            state.sumCount = state.items.reduce((acum, item) => acum + item.count, 0)
        }
    },
});

export const {setItem, setRemoveItem, setClear, setMinusItem} = cartSlice.actions

export default cartSlice.reducer