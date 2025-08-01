
import { RiShoppingBasket2Line } from "react-icons/ri";
import { BsSearch } from "react-icons/bs";
import { GoChevronRight } from "react-icons/go";
const Header = () => {
    return (
        <div className="border-b border-secondary px-3 py-3 flex">
            <div className="flex-1 flex items-center gap-2">
                <GoChevronRight className="text-iconColor text-2xl hover:text-black duration-300 cursor-pointer" />
                <img src="/logo/madaMarketLogoText.svg" alt="logo text" />
            </div>
            <div className="flex-1 flex justify-end items-center gap-2">
                <div className="bg-white rounded-xl hover:bg-redBg cursor-pointer duration-300 text-white p-[1px] flex group/basket">
                    <div className="hidden flex-col px-3 group-hover/basket:flex duration-300">
                        <span className="text-sm">مشاهده سبد</span>
                        <span className="text-xs">1 محصول</span>
                    </div>
                    <div className="border border-secondary rounded-xl flex items-center p-3 bg-white flex-1">
                        <RiShoppingBasket2Line className="text-iconColor text-lg group-hover/basket:text-black" />
                    </div>
                </div>
                {/* <div className="border border-secondary p-3 rounded-xl cursor-pointer group/search hover:bg-secondary">
                    <BsSearch className="text-iconColor text-lg group-hover/search:text-black duration-300"/>
                </div> */}
            </div>
        </div>
    );
}

export default Header;