
import CategoryList from "../../components/categoryList";
import Pdp from "../../components/pdp";
import PlpFilter from "../../components/plpFilter";
import SpecialSales from "../../components/specialSales";
import Tags from "../../components/tags";
import { RiShoppingBasket2Line } from "react-icons/ri";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

const showCategoey = true

const PLP = () => {
    const [showPdp, setShowPdp] = useState(false);
    const [expandedBaskets, setExpandedBaskets] = useState<{ [key: number]: boolean }>({});
        const [productCounts, setProductCounts] = useState<{ [key: number]: number }>({});
    
    const handleIncreaseCount = (productId: number) => {
        setProductCounts(prev => ({
            ...prev,
            [productId]: (prev[productId] || 0) + 1
        }));
        // اگر تعداد از 0 به 1 رسید، expanded را true کن
        if (!productCounts[productId] || productCounts[productId] === 0) {
            setExpandedBaskets(prev => ({
                ...prev,
                [productId]: true
            }));
        }
    };

    const handleDecreaseCount = (productId: number) => {
        setProductCounts(prev => {
            const newCount = Math.max(0, (prev[productId] || 0) - 1);
            return {
                ...prev,
                [productId]: newCount
            };
        });
        // اگر تعداد به 0 رسید، expanded را false کن
        if (productCounts[productId] === 1) {
            setExpandedBaskets(prev => ({
                ...prev,
                [productId]: false
            }));
        }
    };

    const handleAddToBasket = (productId: number) => {
        handleIncreaseCount(productId);
    };
    
    const ProudctItem = ({id}: {id: number}) => (
        <>
            <div className="cursor-pointer" onClick={() => setShowPdp(true)}>
                <img src="/icons/cheese.png" />
            </div>
            <div className="flex-1 flex flex-col gap-3">
                <div className="text-[#787471] text-sm flex-1 cursor-pointer" onClick={() => setShowPdp(true)}>روغن زیتون بکر کریستال - 5 لیتر پنیر فتا دوشه هراز روغن زیتون بکر کریستال - 5 لیتر پنیر فتا دوشه هرا</div>
                <div className="flex items-center flex-1">
                <div className="flex-1">
                    {id != 1 ? <div className="flex gap-2 items-center">
                        <div className="text-[#787471] text-sm"><del>40,000تومان</del></div>
                        <div className="bg-[#C50F1F] text-white rounded-2xl p-1 text-xs">10%</div>
                    </div> : <div className="opacity-0 select-none">.</div>}
                    <div className="flex gap-1 items-center">
                        <div className="text-[#BA400B] font-bold">۳,۷۰۰,۰۰۰</div>
                        <div className="text-[#BA400B] text-xs">تومان</div>
                    </div>
                </div>
                    <div className="flex-1 flex items-center justify-end">
                        <div 
                            className="border border-[#F5F2EF] bg-[#F7F7F7] text-[#787471] text-sm py-2 px-3 hover:shadow cursor-pointer duration-200 rounded-full font-semibold flex items-center justify-center" 
                            onClick={(e) => {
                                e.stopPropagation();
                                if (!productCounts[id] || productCounts[id] === 0) {
                                    handleAddToBasket(id);
                                }
                            }}
                        >
                            {productCounts[id] && productCounts[id] > 0 ? (
                                <div className="flex gap-4 items-center">
                                    <div className="flex-1">
                                        <img 
                                            src="/icons/plus.svg" 
                                            className="w-6 cursor-pointer duration-200 hover:scale-110" 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleIncreaseCount(id);
                                            }} 
                                        />
                                    </div>
                                    <div className="flex-1 flex items-center justify-center text-lg">{productCounts[id]}</div>
                                    <div className="flex-1">
                                        <img 
                                            src="/icons/trash.svg" 
                                            className="w-6 cursor-pointer duration-200 hover:scale-110" 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDecreaseCount(id);
                                            }} 
                                        />
                                    </div>
                                </div>
                            ) : (
                                'افزودن به سبد'
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

    return(
        <div className="space-y-3 pb-20">
            {showCategoey ? (
                <>
                    <CategoryList />
                    <Tags />
                </>
            ) : (
                <SpecialSales />
            )}
            <PlpFilter />
            <div className="space-y-3">
                {["","","","","","",""].map((item,idx)=>(
                    <div key={idx} className={`flex border border-[#F5F2EF] rounded-lg ${idx == 0 || idx == 2 ? 'flex-col overflow-hidden gap-3' : 'px-2 py-2 gap-4'}`}>
                        {idx == 0 || idx == 2 ? (
                            <>
                            <div className="flex px-2 pt-2 gap-4">
                                <ProudctItem id={idx} />
                            </div>
                            <div className="bg-[#FFEDE5] flex justify-between py-2 px-4">
                                <div className="text-[#BA400B] font-bold">قیمت با حامی کارت</div>
                                <div className="flex gap-1 items-center">
                                    <div className="text-[#BA400B] font-bold">۳,۷۰۰,۰۰۰</div>
                                    <div className="text-[#BA400B] text-xs">تومان</div>
                                </div>
                            </div>
                            </>
                        ):(
                            <ProudctItem id={idx} />
                        )}
                    </div>
                ))}
            </div>
            <AnimatePresence>
                {showPdp && <Pdp onClose={() => setShowPdp(false)} />}
            </AnimatePresence>
        </div>
    ) }
export default PLP;