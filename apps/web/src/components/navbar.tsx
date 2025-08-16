import { RiHome6Line } from "react-icons/ri";
import { BiBasket } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { RiFileList3Line } from "react-icons/ri";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useCart } from "../context/cartContext";

const Navbar = () => {
    const [activeItem, setActiveItem] = useState(0);
    const [indicatorPosition, setIndicatorPosition] = useState(0);
    const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const location = useLocation()
    const { cart } = useCart()

    const handleItemClick = (index: number) => {
        setActiveItem(index);
        updateIndicatorPosition(index);
    };

    const updateIndicatorPosition = (index: number) => {
        const itemElement = itemRefs.current[index];
        if (itemElement) {
            const rect = itemElement.getBoundingClientRect();
            const containerRect = itemElement.parentElement?.getBoundingClientRect();
            if (containerRect) {
                const relativeLeft = rect.left - containerRect.left + rect.width / 2;
                setIndicatorPosition(relativeLeft);
            }
        }
    };

    const getActiveIndexFromPath = (path: string) => {
        const match = navbarItems.find(item => item.path === path);
        return match ? match.index : 0;
    };

    useEffect(() => {
        const index = getActiveIndexFromPath(location.pathname);
        setActiveItem(index);
        requestAnimationFrame(() => {
            updateIndicatorPosition(index);
        });
    }, [location.pathname]);

    const navbarItems = [
        { icon: RiHome6Line, text: "خانه", index: 0, path: '/' },
        { icon: BiBasket, text: "سبد خرید", index: 1, path: '/basket' },
        { icon: RiFileList3Line, text: "سفارش ها", index: 2, path: '/orders' },
        { icon: CgProfile, text: "پروفایل", index: 3, path: '/profile' }
    ];

    return (
        <div className="max-w-[500px] w-full fixed bottom-0 flex justify-between bg-white border rounded-t-lg border-secondary py-3 px-5 z-80">
            <img 
                src="/icons/navbarItem.svg" 
                className="absolute top-0 transition-all duration-300 ease-in-out pointer-events-none" 
                style={{ 
                    left: `${indicatorPosition}px`,
                    transform: 'translateX(-50%)'
                }}
            />
            {navbarItems.map((item) => {
                const IconComponent = item.icon;
                return (
                    <Link
                        key={item.index}
                        to={item.path}
                        ref={(el) => {
                            itemRefs.current[item.index] = el;
                        }}
                        onClick={() => handleItemClick(item.index)}
                        className={`relative items-center space-y-1 cursor-pointer transition-colors duration-300 ${activeItem === item.index ? 'text-mainColor' : 'text-[#B3B2B2]'} hover:text-mainColor`}>
                            <IconComponent className="text-xl mx-auto" />
                            <div className="text-xs">{item.text}</div>
                            {(item.index == 1 && cart?.length != 0) && <div className="absolute -top-2 bg-mainColor rounded-full w-4 h-4 text-xs flex justify-center items-center text-white">{cart.length}</div>}
                    </Link>
                );
            })}
        </div>
    );
}

export default Navbar;