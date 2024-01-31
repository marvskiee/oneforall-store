export interface Item {
    id: string,
    productName: string,
    description: string,
    unitPrice: number,
    category: string,
    imageUrl: string
}
export interface CartItem {
    id: string
    quantity: number
}