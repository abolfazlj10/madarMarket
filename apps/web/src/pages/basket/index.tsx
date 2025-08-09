import { useCart } from "../../context/cartContext";
import type { product, CartItem } from "../../types/type";
import ProudctItem from "../../components/productItem";

const Basket = () => {
  const { cart, submitOrder } = useCart();
  const deliverPrice: number = 20000;

  const totals = cart.reduce(
    (acc, item: CartItem) => {
      const itemTotalPrice = item.price * item.quantity;
      acc.totalPrice += itemTotalPrice;
      if (item.discount) {
        const discountAmount = (itemTotalPrice * item.discount) / 100;
        acc.totalDiscount += discountAmount;
      }
      return acc;
    },
    { totalPrice: 0, totalDiscount: 0 } 
  );

  const finalPayablePrice = totals.totalPrice - totals.totalDiscount + deliverPrice;

  return (
    <div className="flex-1 pt-4 pb-20 h-full overflow-hidden">
      {cart.length ? (
        <div className="h-full grid grid-rows-[1fr_auto_auto] overflow-hidden space-y-5">
          <div className="space-y-3 overflow-y-auto border border-secondary rounded-lg p-1">
              <div className="font-bold text-gray-500">سبد خرید ({cart.length})</div>
            {cart?.map((item: product, idx: number) => (
              <div key={idx} className={`flex text-sm border-b border-secondary group/productItem px-2 py-2 gap-4`}>
                {item.isWithHami = false}
                <ProudctItem productDetail={item} index={idx} />
              </div>
            ))}
          </div>
          <div className="border rounded-lg border-secondary px-2 py-3 text-sm text-gray-700 flex flex-col gap-2">
            <div className="flex justify-between">
              <div>مجموع سبد خرید</div>
              <div>{totals.totalPrice.toLocaleString('fa-IR')} تومان</div>
            </div>
            {totals.totalDiscount > 0 && (
              <div className="flex justify-between text-red-600">
                <div>مجموع تخفیف</div>
                <div> {totals.totalDiscount.toLocaleString('fa-IR')} تومان</div>
              </div>
            )}
            <div className="flex justify-between">
              <div>هزینه پیک</div>
              <div>{deliverPrice.toLocaleString('fa-IR')} تومان</div>
            </div>
            <div className="flex justify-between border-t border-dashed border-secondary pt-2 font-bold">
              <div>قابل پرداخت</div>
              <div>{finalPayablePrice.toLocaleString('fa-IR')} تومان</div>
            </div>
          </div>
          <div onClick={submitOrder} className="bg-mainColor text-white shadow-lg rounded-lg p-2 text-center mb-auto cursor-pointer duration-300 border border-secondary hover:bg-mainColor/90">ثبت سفارش</div>
        </div>
      ) : (
        <div className="h-full flex flex-col items-center justify-center gap-10">
          <img src="./icons/empty-cart.svg" />
          <div className="text-2xl font-bold text-mainColor drop-shadow-xl ">سبد خرید شما خالی است.</div>
        </div>
      )}
    </div>
  );
};

export default Basket;