import { TiTick } from "react-icons/ti";

const CategoryList = () => {
    return(
        <div className="flex gap-3 mt-5">
            {["","","",""].map((item, index) => (
                <div key={index} className="space-y-2 relative">
                    <div className={`bg-gradient-to-b from-[#FFF7F5] to-[#FFEBE5] w-18 py-2 px-2 rounded-lg ${index == 1 && 'border border-mainColor'}`}>
                    {index == 1 && <div className="absolute z-40 right-2/4 -top-2 bg-[#FFCAB2] text-mainColor rounded-full text-sm p-[1px]"><TiTick/></div>}
                        <img src="/icons/milk.svg" className="w-full" />
                    </div>
                    <div className={`text-[#787471] text-center ${index == 1 && 'font-bold'}`}>لبنیات</div>
                </div>
            ))}
        </div>
    )
}
export default CategoryList;