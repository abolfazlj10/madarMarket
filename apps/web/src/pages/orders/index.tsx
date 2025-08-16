import { useState } from "react";
import type { order, product } from "../../types/type";

const Orders = () => {
    const [orders] = useState<order[]>(() => {
        const localData = localStorage.getItem('orderMadarmarket');
        return localData ? JSON.parse(localData) : [];
    });

    const formatPrice = (price: number) => {
        return `${price.toLocaleString('fa-IR')} تومان`;
    };

    const calculateTotalPrice = (items: product[]) => {
        const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        return formatPrice(total);
    };

    if (orders.length === 0) {
        return (
            <div className="flex items-center justify-center h-full text-gray-500">
                تاریخچه سفارشات شما خالی است.
            </div>
        );
    }
    return (
        <div className="p-4 flex flex-col gap-4 bg-gray-50 min-h-screen">
            {orders.map((item) => (
                <div key={item.id} className="border border-gray-300 rounded-lg p-4 flex flex-col gap-3 bg-white shadow-sm">
                    
                    <div className="flex justify-between items-center">
                        <h2 className="font-bold text-lg text-gray-800">سفارش #{item.id}</h2>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800  text-yellow-800'}`}>
                           تحویل داده شده
                        </span>
                    </div>
                    <div className="text-sm text-gray-600 flex justify-between">
                        <span>تاریخ ثبت</span>
                        <span>{item.date}</span>
                    </div>
                    <div className="text-sm text-gray-600 flex justify-between font-semibold">
                        <span>مبلغ کل</span>
                        <span className="text-gray-800">{calculateTotalPrice(item.orders)}</span>
                    </div>

                    <hr className="border-t border-dashed border-gray-300 my-2" />
                    
                    <div>
                        <h3 className="font-semibold text-md text-gray-700 mb-2">
                            محصولات ({item.orders.length} آیتم)
                        </h3>
                        <div className="flex flex-col gap-2">
                            {item.orders.map((productItem) => (
                                <div key={productItem.id} className="flex justify-between items-center text-sm text-gray-600 p-2 rounded-md bg-gray-50">
                                    <div className="flex-1 pr-2">
                                        <p className="text-gray-800 font-medium">{productItem.name}</p>
                                        <p>تعداد: {productItem.quantity}</p>
                                    </div>
                                    <div className=" text-left">
                                        {formatPrice(productItem.price * productItem.quantity)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            ))}
        </div>
    )
}

export default Orders;