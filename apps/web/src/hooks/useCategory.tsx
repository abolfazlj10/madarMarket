import { useQuery } from "@tanstack/react-query";
import type { categories } from "../types/type";

export function useGetCategories () {
    return useQuery<categories[]>({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await fetch('http://localhost:3000/categories',)
            const data = await res.json()
            if(!res.ok){
                throw new Error('somethings wen wrong')
            }
            return data.data
        }
    })
}