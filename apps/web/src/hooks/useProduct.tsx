import { useQuery } from "@tanstack/react-query";
import type { product } from "../types/type";

export function useGetpProductsFromCategory (id:string | undefined) {
    return useQuery<product[]>({
        queryKey:[id,'product'],
        queryFn: async () => {
            const req = await fetch(`http://localhost:3000/productEachCategory/${id}`)
            const res = await req.json()
            return res.data
        }
    })
}
export function useGetSpecialProducts () {
    return useQuery<product[]>({
        queryKey: ['specialProducts'],
        queryFn: async () => {
            const req = await fetch('http://localhost:3000/specialProducts')
            const res = await req.json()
            return res.data
        }
    })
}