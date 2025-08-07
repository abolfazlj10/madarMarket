import { useCart } from "../../context/cartContext"; // مطمئن شوید مسیر context درست است
import { FaHeart, FaBookmark } from "react-icons/fa";
import type { product } from "../../types/type"; 
import ProudctItem from "../../components/productItem";
import { useState } from "react";


const Basket = () => {
  const { cart, increaseQuantity, decreaseQuantity } = useCart();
  return(
    <div className="flex-1 py-4">
      <div className="text-center text-3xl text-mainColor font-bold pb-3">سبد خرید</div>
      <div className="space-y-3">
        {cart?.map((item: product,idx: number)=>(
          <div key={idx} className={`flex border border-[#F5F2EF] rounded-lg ${idx == 0 ? 'flex-col overflow-hidden gap-3' : 'px-2 py-2 gap-4'} group/productItem`}>
              <ProudctItem productDetail={item} index={idx} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Basket;