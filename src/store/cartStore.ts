import { create } from 'zustand';
import { createJSONStorage, persist, PersistOptions } from 'zustand/middleware';

export type CartItem = {
    id: string;
    productId: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
    color: string;
    size?: string;
};

type CartState = {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    increaseQuantity: (item: CartItem) => void
    decreaseQuantity: (item: CartItem) => void
};

const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            items: [],
            totalItems: 0,
            totalPrice: 0,
            addItem: (item) =>
                set((state) => {
                    const existingItem = state.items.find((i) => {

                        if (i.productId === item.productId) {
                            return i.color === item.color
                        }
                    });
                    if (existingItem) {
                        existingItem.quantity += item.quantity;
                    } else {
                        state.items.push(item);
                    }
                    return {
                        items: state.items,
                        totalItems: state.totalItems + item.quantity,
                        totalPrice: state.totalPrice + item.price * item.quantity,
                    };
                }),
            removeItem: (id) =>
                set((state) => {
                    const itemToRemove = state.items.find((i) => i.id === id);
                    if (itemToRemove) {
                        const newItems = state.items.filter((i) => i.id !== id);
                        return {
                            items: newItems,
                            totalItems: state.totalItems - itemToRemove.quantity,
                            totalPrice: state.totalPrice - itemToRemove.price * itemToRemove.quantity,
                        };
                    }
                    return state;
                }),
            clearCart: () =>
                set(() => ({
                    items: [],
                    totalItems: 0,
                    totalPrice: 0,
                })),
            increaseQuantity: (item) =>
                set((state) => {
                    const itemToIncreaseQty = state.items.find((i) => i.id === item.id);
                    if (itemToIncreaseQty) {
                        itemToIncreaseQty.quantity += 1;
                        const newItems = state.items.map((i) => {
                            if (i.id === itemToIncreaseQty.id) {
                                return itemToIncreaseQty
                            } else {
                                return i
                            }
                        })
                        return {
                            items: newItems,
                            totalItems: state.totalItems + 1,
                            totalPrice: state.totalPrice + itemToIncreaseQty.price
                        }
                    }
                    return state
                }
                ),
            decreaseQuantity: (item) =>
                set((state) => {
                    const itemToDecreaseQty = state.items.find((i) => i.id === item.id);

                    if (itemToDecreaseQty) {
                        if (itemToDecreaseQty.quantity === 1) {
                            const newItems = state.items.filter((i) => i.id !== itemToDecreaseQty.id)
                            return { items: newItems, totalItems: state.totalItems - 1, totalPrice: state.totalPrice - itemToDecreaseQty.price }
                        }
                        itemToDecreaseQty.quantity -= 1
                        const newItems = state.items.map((i) => {
                            if (i.id === itemToDecreaseQty.id) {
                                return itemToDecreaseQty
                            } else {
                                return i
                            }
                        })
                        return { items: newItems, totalItems: state.totalItems - 1, totalPrice: state.totalPrice - itemToDecreaseQty.price }
                    }
                    return state
                })
        }),
        {
            name: 'cart-storage', // unique name for storage key
            storage: createJSONStorage(() => localStorage), // use local storage to persist state
        }
    )
);

export default useCartStore;
