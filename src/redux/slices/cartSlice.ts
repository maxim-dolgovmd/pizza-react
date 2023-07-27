import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import { RootState } from '../store';
import { getCartFromLockalStorage } from '../../utils/getCartFromLockalStorage';
import { sumCartFromLS } from '../../utils/sumCartFromLS';
import { countCartFromLS } from '../../utils/countCartFromLS';

export type CartItem = {
    id: string,
    title: string,
    price: number,
    imageUrl: string,
    type: string,
    sizes: number,
    count: number
}

interface cartSliceState {
    sumCart: number,
    sumCount: number,
    items: CartItem[]
}

const cartLockalStorage = getCartFromLockalStorage()

const initialState: cartSliceState = {
    sumCart: sumCartFromLS(cartLockalStorage),
    sumCount: countCartFromLS(cartLockalStorage),
    items: cartLockalStorage,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setItem(state, action: PayloadAction<CartItem>) {
            // state.items.push(action.payload)
            const countCart = state.items.reduce((acum, item) => acum + item.count, 1)
            console.log(countCart)
            const findItem = state.items.find((obj) => obj.id === action.payload.id && obj.type === action.payload.type && obj.sizes === action.payload.sizes)
            
            if (findItem ) {
                findItem.count++
            }
            
            if (!findItem ) {
                state.items.push({
                    ...action.payload,
                    type: action.payload.type,
                    count: 1,
                })
            }
            state.sumCart = sumCartFromLS(state.items)
            state.sumCount = countCartFromLS(state.items)
        },

        setMinusItem(state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id && obj.type === action.payload.type && obj.sizes === action.payload.sizes)

            if (findItem) {
                findItem.count--
            }
            state.sumCart = sumCartFromLS(state.items)
            state.sumCount = countCartFromLS(state.items)
        },

        setRemoveItem(state, action: PayloadAction<number>) {

            state.items = state.items.filter((obj, index) => {
                    return index !== action.payload
                }) 

            state.sumCart = sumCartFromLS(state.items)
            state.sumCount = countCartFromLS(state.items)
        },

        setClear(state) {
            state.items = [] 

            state.sumCart = sumCartFromLS(state.items)
            state.sumCount = countCartFromLS(state.items)
        }
    },
});

export const selectCart = (state: RootState) => state.cartReducer

export const selectCartItemById = (item: any) => (state: RootState) => state.cartReducer.items.find((obj) => 
    obj.id === item.id && obj.sizes === item.sizes && obj.type === item.type
)

export const {setItem, setRemoveItem, setClear, setMinusItem} = cartSlice.actions

export default cartSlice.reducer