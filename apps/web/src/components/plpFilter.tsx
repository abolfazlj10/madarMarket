import { BiCart } from "react-icons/bi";
import { CiDiscount1 } from "react-icons/ci";
import { IoIosArrowUp } from "react-icons/io";
import { TbArrowsExchange2 } from "react-icons/tb";
import { useState } from "react";
import type { typeFilterType } from "../types/type";
interface INPtyeps {
    filterType: typeFilterType
    setFilterType: (val: typeFilterType) => void
}
const PlpFilter = ({filterType, setFilterType} : INPtyeps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return(
        <div className="flex justify-between">
            <div>
                <button className="flex items-center gap-1 border border-secondary rounded-lg py-1 px-2 text-[#787471] cursor-pointer" popoverTarget="popover-1" 
                    style={{ anchorName: "--anchor-1" } as any}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <TbArrowsExchange2 className="rotate-90" />
                    مرتب سازی 
                    <IoIosArrowUp className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                <ul className="dropdown w-32 menu rounded-box bg-base-100 space-y-1 shadow-xl"
                    popover="auto" 
                    id="popover-1" 
                    style={{ positionAnchor: "--anchor-1" } as any}
                >
                    <li className="hover:bg-[#F7F7F7] py-2 pr-2 rounded duration-200 cursor-pointer">پرفروش ترین</li>
                    <li className="hover:bg-[#F7F7F7] py-2 pr-2 rounded duration-200 cursor-pointer">بیشترین تخفیف</li>
                    <li className="hover:bg-[#F7F7F7] py-2 pr-2 rounded duration-200 cursor-pointer">جدیدترین</li>
                    <li className="hover:bg-[#F7F7F7] py-2 pr-2 rounded duration-200 cursor-pointer">ارزان ترین</li>
                    <li className="hover:bg-[#F7F7F7] py-2 pr-2 rounded duration-200 cursor-pointer">گران ترین</li>
                </ul>
            </div>
            <div className="flex gap-1">
                <div onClick={() => {
                    filterType == 'hami' ? setFilterType(null) : setFilterType('hami') 
                }} className={`flex items-center gap-1 bg-[#F7F7F7] text-[#787471] text-sm rounded-lg px-3 py-2 cursor-pointer duration-300 hover:shadow-lg hover:-translate-y-1 hover:text-mainColor border border-mainColor/0 ${filterType == 'hami' && '!border-mainColor text-mainColor'}`}>
                    <BiCart className="text-lg" />
                    <div>حامی کارت</div>
                </div>
                <div onClick={() => {
                    filterType == 'discount' ? setFilterType(null) : setFilterType('discount') 
                }} className={`flex items-center gap-1 bg-[#F7F7F7] text-[#787471] text-sm rounded-lg px-3 py-2 cursor-pointer duration-300 hover:shadow-lg hover:-translate-y-1 hover:text-mainColor border border-mainColor/0 ${filterType == 'discount' && '!border-mainColor text-mainColor'}`}>
                    <CiDiscount1 className="text-lg" />
                    <div>تخفیفات</div>
                </div>
            </div>
        </div>
    )
}
export default PlpFilter; 