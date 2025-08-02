import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { useState, useRef, useEffect } from 'react';

const SwiperBanner = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const totalSlides = 3; // تعداد اسلایدها
    const swiperRef = useRef<any>(null);

    const handlePaginationClick = (index: number) => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideTo(index);
        }
    };

    return(
        <div className='relative'>
            <Swiper
                ref={swiperRef}
                spaceBetween={10}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                modules={[Pagination, Autoplay]}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                    waitForTransition: true
                }}
                loop={true}
                className="mySwiper h-32 border-2 border-white shadow-xl rounded-xl"
            >
                <SwiperSlide>
                    <img src="/icons/slider.png" className='object-cover' />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/icons/slider.png" className='object-cover' />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/icons/slider.png" className='object-cover' />
                </SwiperSlide>
            </Swiper>
            
            {/* Custom Pagination Buttons - Positioned inside swiper with z-index */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex justify-center items-center gap-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                    <button
                        key={index}
                        className={`transition-all duration-300 ease-in-out ${
                            index === activeIndex
                                ? 'bg-white backdrop-blur-4xl w-8 h-2 cursor-pointer'
                                : 'bg-white/20 border-[.1px] border-white w-2 h-2 cursor-pointer'
                        } rounded-full`}
                        onClick={() => handlePaginationClick(index)}
                    />
                ))}
            </div>
        </div>
    )
}

export default SwiperBanner