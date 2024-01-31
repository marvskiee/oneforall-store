import { createContext, ReactNode, useContext, useState } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { CartItem } from "../interfaces/storeInterfaces"

interface CartProviderProps {
    children: ReactNode
}

interface CartContext {
    showFinishModal: () => void,
    closeFinishModal: () => void,
    showCheckOutModal: () => void,
    closeCheckOutModal: () => void,
    getItemQuantity: (id: string) => number,
    increaseCartQuantity: (id: string) => void,
    decreaseCartQuantity: (id: string) => void,
    removeItem: (id: string) => void,
    removeAll: () => void,
    cartQuantity: number,
    cartItems: CartItem[],
    totalItems: number,
    checkOutModal: boolean,
    finishModal: boolean
}

const CartContext = createContext({} as CartContext)

export const useShoppingCart = () => {
    return useContext(CartContext)
}

export const CartProvider = ({ children }: CartProviderProps) => {
    const [checkOutModal, setCheckOutModal] = useState<boolean>(false)
    const [finishModal, setFinishModal] = useState<boolean>(false)

    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
        "cart",
        []
    )
    const totalItems: number = cartItems.reduce((sum, item) => (item.quantity ? sum + item.quantity : sum), 0);

    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity,
        0
    )

    const showCheckOutModal = () => setCheckOutModal(true)
    const closeCheckOutModal = () => setCheckOutModal(false)

    const showFinishModal = () => setFinishModal(true)
    const closeFinishModal = () => setFinishModal(false)

    const getItemQuantity = (id: string) => {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }
    const increaseCartQuantity = (id: string) => {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [{ id, quantity: 1 }, ...currItems]
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }
    const decreaseCartQuantity = (id: string) => {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }
    const removeItem = (id: string) => {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }
    const removeAll = () => {
        setCartItems([])
    }

    return (
        <CartContext.Provider
            value={{
                showFinishModal,
                closeFinishModal,
                showCheckOutModal,
                closeCheckOutModal,
                getItemQuantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeItem,
                removeAll,
                cartItems,
                cartQuantity,
                totalItems,
                checkOutModal,
                finishModal

            }}
        >
            {children}
        </CartContext.Provider>
    )
}