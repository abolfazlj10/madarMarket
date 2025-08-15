
import { RiShoppingBasket2Line } from "react-icons/ri";
import { GoChevronRight } from "react-icons/go";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from '../context/cartContext'
import { CgProfile } from "react-icons/cg";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    // const shouldHideSearch = location.pathname === '/' || location.pathname === '/login';
    const shouldHideBasket = location.pathname === '/login';
    const shouldHideLogo = location.pathname === '/login';
    const { cart } = useCart()

    const handleGoBack = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        navigate('/');
    };

    return (
        <div className="border-b border-secondary px-3 py-3 flex">
            <div className="flex-1 flex items-center gap-2">
                <GoChevronRight 
                    className="text-iconColor text-2xl hover:text-black duration-300 cursor-pointer" 
                    onClick={handleGoBack}
                />
                {!shouldHideLogo && (
                    <Link to="/"><img src="/logo/madaMarketLogoText.svg" alt="logo text" /></Link>
                )}
            </div>
            <div className="flex-1 flex justify-end items-center gap-2">
                {!shouldHideBasket && (
                    <Link to='/basket' className="bg-white rounded-xl hover:bg-redBg cursor-pointer duration-300 text-white p-[1px] flex group/basket">
                        <div className="hidden flex-col px-3 group-hover/basket:flex duration-300">
                            <span className="text-sm truncate">مشاهده سبد</span>
                            <span className="text-xs">{cart?.length} محصول</span>
                        </div>
                        <div className="border border-secondary rounded-xl flex items-center p-3 bg-white flex-1">
                            <RiShoppingBasket2Line className="text-iconColor text-lg group-hover/basket:text-black" />
                        </div>
                    </Link>
                )}
                {!shouldHideLogo && (
                    <Link to='/login' className="border border-secondary p-3 rounded-xl cursor-pointer group/search hover:bg-secondary duration-300">
                        <CgProfile className="text-iconColor text-lg group-hover/search:text-black duration-300"/>
                    </Link>
                )}
            </div>
        </div>
    );
}
export default Header;