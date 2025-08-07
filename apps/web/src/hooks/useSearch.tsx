import { useQuery } from "@tanstack/react-query";

export function useSearch (product : string) {
    return useQuery({
        queryKey:['search', product],
        queryFn: async () => {
            const req = await fetch(`http://localhost:3000/searchProducts/${product}`)
            const res = await req.json()
            return res.data
        },
        enabled: !!product
    })
}