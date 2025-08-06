import { useQuery } from "@tanstack/react-query";
import type { tag } from "../types/type";

export function useTagsByCategory (id:number) {
    return useQuery<tag[]>({
        queryKey: ['tagsbycategory',id],
        queryFn: async ()=>{
            const req = await fetch(`http://localhost:3000/tagsByCategory/${id}`)
            const res = await req.json()
            return res.data
        }
    })
}