import { MdClose } from "react-icons/md";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
interface PdpProps {
    onClose: () => void;
}

const Pdp = ({ onClose }: PdpProps) => {

    const [activeIndex, setActiveIndex] = useState(0);
    const totalSlides = 3; // تعداد اسلایدها
    const swiperRef = useRef<any>(null);

    const handlePaginationClick = (index: number) => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideTo(index);
        }
    };
    
    const testforspped = (

        <div className='relative'>
            <Swiper
                ref={swiperRef}
                spaceBetween={10}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                modules={[Pagination]}
                loop={true}
                className="mySwiper h-full border-2 border-white rounded-xl"
            >
                <SwiperSlide className="bg-white">
                    <img src="/icons/cheese.png" className='object-contain w-full h-52' />
                </SwiperSlide>
                <SwiperSlide className="bg-white">
                    <img src="/icons/cheese.png" className='object-contain w-full h-52' />
                </SwiperSlide>
                <SwiperSlide className="bg-white">
                    <img src="/icons/cheese.png" className='object-contain w-full h-52' />
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
    
    return(
        <>
            {/* Backdrop */}
            <motion.div
                className="fixed bg-black/50 z-[98]"
                style={{ 
                    top: 0, 
                    left: 0, 
                    right: 0, 
                    bottom: 0,
                    width: '100vw',
                    height: '100vh'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={onClose}
            />
            
            {/* PDP Content */}
            <motion.div 
                className="bg-[#FAFAFA] flex flex-col gap-4 justify-between absolute bottom-0 rounded-t-2xl p-3 h-[85%] w-full z-[99]"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ 
                    type: "spring", 
                    damping: 30, 
                    stiffness: 300,
                    duration: 0.5
                }}
            >
                <MdClose className="text-3xl cursor-pointer" onClick={onClose} />
                <div className="space-y-5 flex-1">
                    {testforspped}
                    <div className="space-y-3">
                        <div className="text-[#6B6866] text-lg">پنیر فتا دوشه هراز مقدار 300 گرم</div>
                        <div className="grid grid-rows-2 grid-cols-2 gap-4">
                            <div className="bg-white px-2 py-3 rounded-lg space-y-2">
                                <div className="text-[#979593] text-xs">نوع بسته بندی :</div>
                                <div className="text-[#787471] text-xs font-bold">پلی اتیلن</div>
                            </div>
                            <div className="bg-white px-2 py-3 rounded-lg space-y-2">
                                <div className="text-[#979593] text-xs">مواد تشکیل دهنده :</div>
                                <div className="text-[#787471] text-xs font-bold">شیر گاوی</div>
                            </div>
                            <div className="bg-white px-2 py-3 rounded-lg space-y-2">
                                <div className="text-[#979593] text-xs">نوع بسته بندی :</div>
                                <div className="text-[#787471] text-xs font-bold">پلی اتیلن</div>
                            </div>
                            <div className="bg-white px-2 py-3 rounded-lg space-y-2">
                                <div className="text-[#979593] text-xs">مواد تشکیل دهنده :</div>
                                <div className="text-[#787471] text-xs font-bold">شیر گاوی</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="space-y-3">
                    <div className="p-[1px] rounded-[12px] bg-gradient-to-r from-[#D2DD25] via-[#43B999] via-[#02A9EC] via-[#364FC0] to-[#65029B] overflow-hidden">
                        <div className="flex justify-between bg-white px-4 py-2 rounded-[10px]">
                            <div className="text-[#65029B] font-bold">قیمت با حامی کارت</div>
                            <div className="text-[#0B8500] text-sm flex items-center gap-1">
                                <span className="font-bold">۳,0۰۰,۰۰۰</span>
                                <span>تومان</span>
                            </div>

                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex-2 bg-mainColor text-white rounded-xl py-3 text-center cursor-pointer"> افزودن به سبد خرید </div>
                        <div className="flex-1 flex flex-col items-end justify-around">
                            <div className="text-[#787471] text-xs">قیمت کالا</div>
                            <div className="text-sm flex items-center gap-1 text-mainColor">
                                <span className="font-bold text-lg">40,۰۰۰</span>
                                <span className="text-xs">تومان</span>
                            </div>
                        </div>
            </div>
        </div>
            </motion.div>
        </>
    )
}
export default Pdp;