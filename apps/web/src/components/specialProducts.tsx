import SpecialProductsItem from "./specialProductItem"

const SpecialProducts = () => {
    return(
        <div className="flex flex-col gap-3 pb-20">
            <div className="flex justify-between items-center">
                <div className="text-[#BA400B] font-bold text-xl">محصولات ویژه </div>
                <div className="text-[#C15323] text-sm">بهترین پیشنهادات روز</div>
            </div>
            <div className="flex gap-10">
                <SpecialProductsItem />
                <SpecialProductsItem />
            </div>
            <div className="flex gap-10">
                <SpecialProductsItem />
                <SpecialProductsItem />
            </div>
            <img className="mt-3" src="icons/bannerbottom.png" />
        </div>
    )
}
export default SpecialProducts