import { CartItem } from "../redux/slices/cartSlice"

export const sumCartFromLS = (items: CartItem[]) => {
    return items.reduce(
        (acum, item) => acum + item.price * item.count, 0
    )
}