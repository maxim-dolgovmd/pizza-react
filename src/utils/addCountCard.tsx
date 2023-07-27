import { CartItem } from "../redux/slices/cartSlice"

export const addCountCard = (items: CartItem[]) => {
    const cart = window.localStorage.getItem('cart')
    if (cart) {
        return JSON.parse(cart) || []
    }
}