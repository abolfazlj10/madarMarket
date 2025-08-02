import { BiCart } from "react-icons/bi";
import { CiDiscount1 } from "react-icons/ci";

const PlpFilter = () => {
    return(
        <div className="flex justify-between">
            <div>
                <button className="btn" popoverTarget="popover-1" style={{ anchorName: "--anchor-1" } /* as React.CSSProperties */}>
                    مرتب سازی
                </button>

                <ul className="dropdown menu rounded-box bg-base-100 shadow-sm space-y-2"
                popover="auto" id="popover-1" style={{ positionAnchor: "--anchor-1" } /* as React.CSSProperties */ }>
                <div>پر فروش ترین</div>
                <div>بیشترین تخفیف</div>
                <div>جدیدترین</div>
                <div>بیشترین تخفیف</div>
                <div>گران ترین</div>
                </ul>
            </div>
            <div className="flex gap-1">
                <div className="flex items-center gap-1 bg-[#F7F7F7] text-[#787471] text-sm rounded-lg px-3 py-2 cursor-pointer duration-300 hover:text-black hover:text-mainColor">
                    <BiCart className="text-lg" />
                    <div>حامی کارت</div>
                </div>
                <div className="flex items-center gap-1 bg-[#F7F7F7] text-[#787471] text-sm rounded-lg px-3 py-2 cursor-pointer duration-300 hover:text-black hover:text-mainColor">
                    <CiDiscount1 className="text-lg" />
                    <div>تخفیفات</div>
                </div>
            </div>
        </div>
    )
}
export default PlpFilter; 