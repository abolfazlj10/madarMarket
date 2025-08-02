import { RiHome6Line } from "react-icons/ri";
import { BiBasket } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { RiFileList3Line } from "react-icons/ri";
import { useState, useRef, useEffect } from "react";

const Navbar = () => {
    const [activeItem, setActiveItem] = useState(0);
    const [indicatorPosition, setIndicatorPosition] = useState(0);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    useEffect(() => {
        updateIndicatorPosition(activeItem);
    }, []);

    const navbarItems = [
        { icon: RiHome6Line, text: "خانه", index: 0 },
        { icon: BiBasket, text: "سبد خرید", index: 1 },
        { icon: RiFileList3Line, text: "سفارش ها", index: 2 },
        { icon: CgProfile, text: "خرید", index: 3 }
    ];

    return (
        <div className="max-w-[400px] w-full fixed bottom-0 flex justify-between bg-white border rounded-lg border-secondary py-3 px-5 z-80">
            <img 
                src="icons/navbarItem.svg" 
                className="absolute top-0 transition-all duration-300 ease-in-out pointer-events-none" 
                style={{ 
                    left: `${indicatorPosition}px`,
                    transform: 'translateX(-50%)'
                }}
            />
            {navbarItems.map((item) => {
                const IconComponent = item.icon;
                return (
                    <div 
                        key={item.index}
                        ref={(el) => {
                            itemRefs.current[item.index] = el;
                        }}
                        className={`items-center space-y-1 cursor-pointer transition-colors duration-300 ${
                            activeItem === item.index ? 'text-mainColor' : 'text-[#B3B2B2]'
                        } hover:text-mainColor`}
                        onClick={() => handleItemClick(item.index)}
                    >
                        <IconComponent className="text-xl mx-auto" />
                        <div className="text-xs">{item.text}</div>
                    </div>
                );
            })}
        </div>
    );
}

export default Navbar;