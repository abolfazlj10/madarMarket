import ProductItem from "./productItem"
import data from "../data.json"
const Products = () => {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
                <div className="text-[#BA400B] font-bold text-xl">دسته بندی‌ها</div>
                <div className="text-[#C15323] text-sm">انتخاب سریع محصولات</div>
            </div>
            <div className="grid grid-cols-4 gap-x-3 gap-y-4">
                {data.categories.map((category, index) =>(
                    <ProductItem key={index} id={index + 1} title={category.name} />
                ))}
                {data.categories.map((category, index) =>(
                    <ProductItem key={index} id={index + 1} title={category.name} />
                ))}
            </div>
        </div>
    )
}
export default Products 