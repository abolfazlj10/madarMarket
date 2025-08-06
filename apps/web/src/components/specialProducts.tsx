import SpecialProductsItem from "./specialProductItem"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import data from "../data.json"
import { useGetSpecialProducts } from "../hooks/useProduct"
import type { product } from "../types/type"

const SpecialProducts = () => {
    const { data: specialProduct } = useGetSpecialProducts()
    return(
        <div className="flex flex-col gap-3 pb-20">
            <div className="flex justify-between items-center">
                <div className="text-[#BA400B] font-bold text-xl">محصولات ویژه </div>
                <div className="text-[#C15323] text-sm">بهترین پیشنهادات روز</div>
            </div>
            
            <div>
                {/* First Swiper Section */}
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={40}
                    slidesPerView={2}
                    navigation={true}
                    direction="horizontal"
                    dir="rtl"
                    className="special-products-swiper"
                    style={{
                        direction: 'rtl'
                    }}
                >
                    {specialProduct?.slice().reverse().map((product, index) => ( 
                        <SwiperSlide key={index}>
                            <SpecialProductsItem product={product} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div>
                {/* Second Swiper Section */}
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={40}
                    slidesPerView={2}
                    navigation={true}
                    direction="horizontal"
                    dir="rtl"
                    className="special-products-swiper"
                    style={{
                        direction: 'rtl'
                    }}
                >
                    {specialProduct?.map((product, index) =>(
                        <SwiperSlide key={index} className="flex">
                            <SpecialProductsItem product={product} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <img className="mt-3" src="/icons/bannerbottom.png" />
        </div>
    )
}
export default SpecialProducts