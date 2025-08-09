export type categories = {
    id: number,
    name: string,
    image: string,
}
export type product = {
    id: number
    name: string
    image: string
    price: number
    discount: number
    isSpecial: boolean
    isWithHami: boolean
    categoryId: number
}
export type tag = {
    id: number
    name: string
    categoryId: number
    category: categories
}
export type order = {
    id: number
    orders: product[]
    date: string
    status: 'deliverd'
}
export type CartItem = product & { quantity: number };
export type typeFilterType = 'hami' | 'discount' | null