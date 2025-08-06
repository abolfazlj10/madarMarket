import { useCart } from "../context/cartContext";
const SpecialProductsItem = ({ product }: { product?: any }) => {
  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCart()
    const finalPrice = product.discount
      ? Math.round(product.price * (1 - product.discount / 100))
      : product.price;

      const itemInCart = cart.find((item) => item.id === product.id);

      const quantity = itemInCart ? itemInCart.quantity : 0;
  
    return (
      <div className="border border-[#F5F2EF] rounded-b-3xl rounded-t-xl space-y-1 overflow-hidden w-[200px] !flex-1 grid grid-rows-[2fr_auto_auto_auto]">
        <img src={`http://localhost:3000/products/${product.image}`} className="mx-auto w-36" />
        <div className="px-2 truncate">{product.name}</div>
  
        <div className="px-2">
          {product.discount ? (
            <div className="flex gap-2 items-center">
              <div className="text-[#787471] text-sm"><del>{product.price.toLocaleString('fa-IR')}</del></div>
              <div className="bg-[#C50F1F] text-white rounded-2xl p-1 text-xs">
                {product.discount}%
              </div>
            </div>
          ): <div className="opacity-0 select-none">t</div>}
          <div className="flex gap-1 items-center">
            <div className="text-[#BA400B] font-bold">{finalPrice.toLocaleString('fa-IR')}</div>
            <div className="text-[#BA400B] text-xs">تومان</div>
          </div>
        </div>

        <div 
          className="border border-[#F5F2EF] bg-[#F7F7F7] text-[#787471] text-sm py-2 px-3 hover:shadow cursor-pointer duration-200 rounded-full font-semibold flex items-center justify-center" 
          onClick={() => {
              if (quantity === 0) 
                  addToCart(product)
          }}
        >
          {quantity > 0 ? (
              <div className="flex gap-4 items-center">
                  <div className="flex-1">
                      <img src="/icons/plus.svg" className="w-6 cursor-pointer duration-200 hover:scale-110" 
                          onClick={() => increaseQuantity(product.id)} 
                      />
                  </div>
                  <div className="flex-1 flex items-center justify-center text-lg">{quantity}</div>
                  <div className="flex-1">
                      <img src="/icons/trash.svg" className="w-6 cursor-pointer duration-200 hover:scale-110" 
                          onClick={() => decreaseQuantity(product.id) } 
                      />
                  </div>
              </div>
          ) : (
              'افزودن به سبد'
          )}
      </div>
  
        {/* <div className="bg-[#F7F7F7] border border-[#F5F2EF] rounded-3xl text-center py-2 text-[#787471] cursor-pointer" onClick={() => alert('test')}>
          افزودن به سبد
        </div> */}
      </div>
    );
  };
  export default SpecialProductsItem;
  