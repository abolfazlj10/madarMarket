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
    categoryId: number
    category: categories[]
}