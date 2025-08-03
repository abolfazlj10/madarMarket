const SpecialProductsItem = ({product}: {product?: any}) => {
    return(
        <div className="border border-[#F5F2EF] rounded-b-3xl rounded-t-xl space-y-1 overflow-hidden w-[200px]">
            <img src="/icons/specialImag.png" className="mx-auto" />
            <div className="px-2">{product.name}</div>
            <div className="px-2">
                <div className="flex gap-2 items-center">
                    <div className="text-[#787471] text-sm"><del>{product.original_price}</del></div>
                    <div className="bg-[#C50F1F] text-white rounded-2xl p-1 text-xs">{product.discount}%</div>
                </div>
                <div className="flex gap-1 items-center">
                    <div className="text-[#BA400B] font-bold">{product.price}</div>
                    <div className="text-[#BA400B] text-xs">تومان</div>
                </div>
            </div>
            <div className="bg-[#F7F7F7] border border-[#F5F2EF] rounded-3xl text-center py-2 text-[#787471] cursor-pointer" onClick={() => alert('test')}>افزودن به سبد</div>
        </div>
    )
}
export default SpecialProductsItem