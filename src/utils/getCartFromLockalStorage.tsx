export const getCartFromLockalStorage = () => {
    const cart = window.localStorage.getItem('cart')
    if (cart) {
        return JSON.parse(cart) || []
    }
}