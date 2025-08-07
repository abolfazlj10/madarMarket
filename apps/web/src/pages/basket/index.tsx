import { useCart } from "../../context/cartContext"; // مطمئن شوید مسیر context درست است
import { FaHeart, FaBookmark } from "react-icons/fa";
import type { product } from "../../types/type"; 
import ProudctItem from "../../components/productItem";
import { useState } from "react";

// const Basket = () => {
//   // دریافت داده‌ها و توابع مورد نیاز از context
//   const { cart, increaseQuantity, decreaseQuantity } = useCart();

//   // محاسبه جمع کل قیمت سبد خرید با استفاده از reduce
//   const totalAmount = cart.reduce((total, item) => {
//     const priceWithDiscount = item.price * (1 - item.discount / 100);
//     return total + priceWithDiscount * item.quantity;
//   }, 0);

//   // اگر سبد خرید خالی باشد، این پیام نمایش داده می‌شود
//   if (cart.length === 0) {
//     return (
//       <p className="text-center mt-20 text-gray-500">سبد خرید شما خالی است.</p>
//     );
//   }

//   // در غیر این صورت، لیست آیتم‌ها و جمع کل نمایش داده می‌شود
//   return (
//     <div className="max-w-3xl mx-auto mt-8 px-4">
//       {/* بخش لیست آیتم‌های سبد خرید */}
//       <div className="space-y-6">
//         {cart.map((item: Product & { quantity: number }) => {
//           const priceWithDiscount = item.price * (1 - item.discount / 100);

//           return (
//             // این JSX مستقیماً از کامپوننت BasketItem به اینجا منتقل شده است
//             <div
//               key={item.id}
//               className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-md"
//             >
//               {/* عکس محصول */}
//               <div className="w-24 h-24 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
//                 <img
//                   src={`http://localhost:3000/products/${item.image}`}
//                   alt={item.name}
//                   className="w-full h-full object-cover"
//                 />
//               </div>

//               {/* محتوای متنی */}
//               <div className="flex-1 flex flex-col gap-1">
//                 <span className="inline-block bg-mainColor/10 text-mainColor text-xs px-2 py-0.5 rounded-full w-max font-semibold">
//                   RX Free
//                 </span>
//                 <h3 className="text-gray-900 font-semibold text-lg leading-tight">
//                   {item.name}
//                 </h3>
//                 <div className="flex items-center gap-3">
//                   <span className="text-xl font-bold text-gray-900">
//                     ${priceWithDiscount.toFixed(2)}
//                   </span>
//                   <span className="line-through text-gray-400 text-sm">
//                     ${item.price.toFixed(2)}
//                   </span>
//                 </div>
//                 {/* نکته: منوی انتخاب واحد (kg, g, lbs) حذف شد. 
//                   چون state آن (useState) نمی‌تواند داخل یک حلقه map استفاده شود 
//                   و در کد اصلی نیز تاثیری روی منطق برنامه نداشت.
//                 */}
//               </div>

//               {/* دکمه‌های کنترلی */}
//               <div className="flex flex-col items-center gap-2">
//                 <div className="flex items-center border border-mainColor rounded-full overflow-hidden select-none">
//                   <button
//                     onClick={() => decreaseQuantity(item.id)}
//                     className="w-10 h-10 text-mainColor font-bold flex justify-center items-center hover:bg-mainColor/50 transition"
//                   >
//                     −
//                   </button>
//                   <span className="w-12 text-center font-semibold">
//                     {item.quantity}
//                   </span>
//                   <button
//                     onClick={() => increaseQuantity(item.id)}
//                     className="w-10 h-10 text-mainColor font-bold flex justify-center items-center hover:bg-mainColor/50 transition"
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* بخش جمع کل و دکمه پرداخت */}
//       <div className="mt-8 pt-6 border-t border-gray-200">
//         <div className="flex justify-between items-center mb-4">
//           <span className="text-lg font-semibold text-gray-700">جمع کل:</span>
//           <span className="text-2xl font-bold text-gray-900">
//             ${totalAmount.toFixed(2)}
//           </span>
//         </div>
//         <button className="w-full bg-mainColor text-white font-bold py-3 rounded-lg hover:bg-green-700 transition">
//           ادامه فرآیند خرید
//         </button>
//       </div>
//     </div>
//   );
// };

const Basket = () => {
  const { cart, increaseQuantity, decreaseQuantity } = useCart();
  const [ showPdp, setShowPdp ] = useState<boolean>(false)
  return(
    <div className="flex-1 py-4">
      <div className="text-center text-3xl text-mainColor font-bold pb-3">سبد خرید</div>
      <div className="space-y-3">
        {cart?.map((item: product,idx: number)=>(
          <div key={idx} className={`flex border border-[#F5F2EF] rounded-lg ${idx == 0 ? 'flex-col overflow-hidden gap-3' : 'px-2 py-2 gap-4'}`}>
              <ProudctItem productDetail={item} setShowPdp={setShowPdp} index={idx} />
          </div>
        ))}
      </div>

    </div>
  )
}

export default Basket;