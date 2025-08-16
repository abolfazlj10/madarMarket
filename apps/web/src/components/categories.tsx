import CategoryItem from "./categoryItem"
import type { categories } from "../types/type"
import { useGetCategories } from "../hooks/useCategory"
const Products = () => {
    const { data } = useGetCategories();
    return (
        <div className="flex flex-col gap-5 mt-5">
            <div className="flex justify-between items-center">
                <div className="text-[#BA400B] font-bold text-xl">دسته بندی‌ها</div>
                <div className="text-[#C15323] text-sm">انتخاب سریع محصولات</div>
            </div>
            <div className="grid grid-cols-4 gap-x-3 gap-y-4">
                {data ? (
                    data?.map((category : categories, index: number) =>(
                        <CategoryItem key={index} id={category.id} title={category.name} image={category.image} />
                    ))
                ) : (
                    ["","","","","","","","","","","","","","","",""].map((_,idx:number) => (
                        <div key={idx} className="space-y-2">
                            <div className="skeleton h-25"></div>
                            <div className="skeleton h-6"></div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
export default Products 