import { TiTick } from "react-icons/ti";

const CategoryList = () => {
    return(
        <div className="flex gap-3 mt-5">
            {["","","",""].map((item, index) => (
                <div key={index} className="space-y-2 relative">
                    <div className={`bg-gradient-to-b from-[#FFF7F5] to-[#FFEBE5] w-18 py-2 px-2 rounded-lg ${index == 1 && 'border border-mainColor'}`}>
                    {index == 1 && 
                    <div className="w-full z-40 absolute right-0 -top-2 flex items-center">
                        <div className=" bg-[#FFCAB2] mx-auto text-mainColor rounded-full text-sm p-[1px]"><TiTick/></div>
                    </div>
                    }
                        <img src="/icons/milk.svg" className="w-full" />
                    </div>
                    <div className={`text-[#787471] text-center ${index == 1 && 'font-bold'}`}>لبنیات</div>
                </div>
            ))}
        </div>
    )
}
export default CategoryList;