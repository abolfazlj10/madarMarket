import { useCart } from "../context/cartContext";
import type { product } from "../types/type";
import { usePdp } from "../context/pdpContext";

interface INPproductItem {
    productDetail : product,
    index: number
}

const ProudctItem = ({ productDetail} : INPproductItem) => {
    const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCart()
    const {openPdp} = usePdp()

    const finalPrice = productDetail?.discount ? Math.round(productDetail?.price * (1 - productDetail?.discount / 100)) : productDetail?.price;
    const itemInCart = cart.find((item) => item.id === productDetail.id);

    const quantity = itemInCart ? itemInCart.quantity : 0;
    
    const NormalProduct = () => (
        <>
            <div className="cursor-pointer" onClick={() => openPdp(productDetail)}>
                <img src={`http://localhost:3000/products/${productDetail?.image}`} className="w-20 group-hover/productItem:scale-110 duration-300" />
            </div>
            <div className="flex-1 flex flex-col gap-3">
                <div className="text-[#787471] text-sm flex-1 cursor-pointer" onClick={() => openPdp(productDetail)}>{productDetail?.name}</div>
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
    )
    return(
        productDetail.isWithHami ? (
            <>
                <div className="flex px-2 pt-2 gap-4 group/productItem">
                    <NormalProduct />
                </div>
                <div className="bg-[#FFEDE5] flex justify-between py-2 px-4">
                    <div className="text-[#BA400B] font-bold">قیمت با حامی کارت</div>
                    <div className="flex gap-1 items-center">
                        <div className="text-[#BA400B] font-bold">
                            {(productDetail.price * 0.9).toLocaleString('fa-IR')}
                        </div>
                        <div className="text-[#BA400B] text-xs">تومان</div>
                    </div>
                </div>
            </> 
        ):(
            <NormalProduct />
        )
    )
};
export default ProudctItem;