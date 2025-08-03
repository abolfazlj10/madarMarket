import { BiCart } from "react-icons/bi";
import { CiDiscount1 } from "react-icons/ci";
import { IoIosArrowUp } from "react-icons/io";
import { TbArrowsExchange2 } from "react-icons/tb";

const PlpFilter = () => {
    return(
        <div className="flex justify-between">
            <div>
                <button className="flex items-center gap-1 border border-secondary rounded-lg py-1 px-2 text-[#787471] cursor-pointer" popoverTarget="popover-1" style={{ anchorName: "--anchor-1" }}><TbArrowsExchange2 className="rotate-90" />مرتب سازی <IoIosArrowUp /></button>

                <ul className="dropdown w-32 menu rounded-box bg-base-100 shadow-sm space-y-1"
                    popover="auto" id="popover-1" style={{ positionAnchor: "--anchor-1" } /* as React.CSSProperties */ }>
                    <div className="hover:bg-[#F7F7F7] py-2 pr-2 rounded duration-200 cursor-pointer">پرفروش ترین</div>
                    <div className="hover:bg-[#F7F7F7] py-2 pr-2 rounded duration-200 cursor-pointer">بیشترین تخفیف</div>
                    <div className="hover:bg-[#F7F7F7] py-2 pr-2 rounded duration-200 cursor-pointer">جدیدترین</div>
                    <div className="hover:bg-[#F7F7F7] py-2 pr-2 rounded duration-200 cursor-pointer">ارزان ترین</div>
                    <div className="hover:bg-[#F7F7F7] py-2 pr-2 rounded duration-200 cursor-pointer">گران ترین</div>
                </ul>
            </div>
            <div className="flex gap-1">
                <div className="flex items-center gap-1 bg-[#F7F7F7] text-[#787471] text-sm rounded-lg px-3 py-2 cursor-pointer duration-300 hover:shadow-lg hover:-translate-y-1 hover:text-mainColor">
                    <BiCart className="text-lg" />
                    <div>حامی کارت</div>
                </div>
                <div className="flex items-center gap-1 bg-[#F7F7F7] text-[#787471] text-sm rounded-lg px-3 py-2 cursor-pointer duration-300 hover:shadow-lg hover:-translate-y-1 hover:text-mainColor">
                    <CiDiscount1 className="text-lg" />
                    <div>تخفیفات</div>
                </div>
            </div>
        </div>
    )
}
export default PlpFilter; 