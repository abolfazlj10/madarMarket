
import CategoryList from "../../components/categoryList";
import Pdp from "../../components/pdp";
import PlpFilter from "../../components/plpFilter";
import SpecialSales from "../../components/specialSales";
import Tags from "../../components/tags";
import { useGetpProductsFromCategory } from "../../hooks/useProduct";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import type { categories, product } from "../../types/type";
import { useCart } from "../../context/cartContext";

const showCategoey = true

const PLP = () => {
    const [showPdp, setShowPdp] = useState(false);
    const {id : categoryId} = useParams()
    const { data } = useGetpProductsFromCategory(categoryId)
    const [expandedBaskets, setExpandedBaskets] = useState<{ [key: number]: boolean }>({});
    const [productCounts, setProductCounts] = useState<{ [key: number]: number }>({});
    const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCart()
    
    const ProudctItem = ({ productDetail} : {productDetail : product}) => {
        const finalPrice = productDetail?.discount ? Math.round(productDetail?.price * (1 - productDetail?.discount / 100)) : productDetail?.price;
        const itemInCart = cart.find((item) => item.id === productDetail.id);

        const quantity = itemInCart ? itemInCart.quantity : 0;
        return (
            <>
                <div className="cursor-pointer" onClick={() => setShowPdp(true)}>
                    <img src={`http://localhost:3000/products/${productDetail?.image}`} className="w-20" />
                </div>
                <div className="flex-1 flex flex-col gap-3">
                    <div className="text-[#787471] text-sm flex-1 cursor-pointer" onClick={() => setShowPdp(true)}>{productDetail?.name}</div>
                    <div className="flex items-center flex-1">
                        <div className="flex-1">
                            {productDetail?.discount ? (
                                <div className="flex gap-2 items-center">
                                    <div className="text-[#787471] text-sm"><del>{productDetail?.price.toLocaleString('fa-IR')}</del></div>
                                    <div className="bg-[#C50F1F] text-white rounded-2xl p-1 text-xs">{productDetail?.discount}%</div>
                                </div>
                            ) : (
                                <div className="opacity-0 select-none">.</div>
                            )}
                            <div className="flex gap-1 items-center">
                                <div className="text-[#BA400B] font-bold">{finalPrice?.toLocaleString('fa-IR')}</div>
                                <div className="text-[#BA400B] text-xs">تومان</div>
                            </div>
                        </div>
                        <div className="flex-1 flex items-center justify-end">
                            <div 
                                className="border border-[#F5F2EF] bg-[#F7F7F7] text-[#787471] text-sm py-2 px-3 hover:shadow cursor-pointer duration-200 rounded-full font-semibold flex items-center justify-center" 
                                onClick={() => {
                                    if (quantity === 0) 
                                        addToCart(productDetail)
                                }}
                            >
                                {quantity > 0 ? (
                                    <div className="flex gap-4 items-center">
                                        <div className="flex-1">
                                            <img src="/icons/plus.svg" className="w-6 cursor-pointer duration-200 hover:scale-110" 
                                                onClick={() => increaseQuantity(productDetail.id)} 
                                            />
                                        </div>
                                        <div className="flex-1 flex items-center justify-center text-lg">{quantity}</div>
                                        <div className="flex-1">
                                            <img src="/icons/trash.svg" className="w-6 cursor-pointer duration-200 hover:scale-110" 
                                                onClick={() => decreaseQuantity(productDetail.id) } 
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
        );
    };
    

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
                {data ? (
                    data?.map((item: product,idx:number)=>(
                        <div key={idx} className={`flex border border-[#F5F2EF] rounded-lg ${idx == 0 || idx == 2 ? 'flex-col overflow-hidden gap-3' : 'px-2 py-2 gap-4'}`}>
                            {idx == 0 || idx == 2 ? (
                                <>
                                <div className="flex px-2 pt-2 gap-4">
                                    <ProudctItem productDetail={item}/>
                                </div>
                                <div className="bg-[#FFEDE5] flex justify-between py-2 px-4">
                                    <div className="text-[#BA400B] font-bold">قیمت با حامی کارت</div>
                                    <div className="flex gap-1 items-center">
                                        <div className="text-[#BA400B] font-bold">
                                            {(item.price * 0.9).toLocaleString('fa-IR')}
                                        </div>
                                        <div className="text-[#BA400B] text-xs">تومان</div>
                                    </div>
                                </div>
                                </>
                            ):(
                                <ProudctItem productDetail={item}/>
                            )}
                        </div>
                    ))
                ):(
                    <>
                    {["","",""].map((_,idx)=>(
                        <div key={idx} className="border border-[#F5F2EF] rounded-lg h-32 flex p-2 gap-2">
                            <div className="skeleton w-4/12"></div>
                            <div className="flex-1 flex flex-col justify-between">
                                <div className="h-5 w-32 skeleton"></div>
                                <div className="flex justify-between items-end">
                                    <div className="skeleton w-20 h-5"></div>
                                    <div className="skeleton w-28 h-8 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                    </>
                )}
            </div>
            <AnimatePresence>
                {showPdp && <Pdp onClose={() => setShowPdp(false)} />}
            </AnimatePresence>
        </div>
    ) }
export default PLP;