import { CartItem } from "../redux/slices/cartSlice";

export const countCartFromLS = (items: CartItem[]) => {
    return items.reduce((acum, item) => item.count + acum, 0)
}