import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
const SwiperBanner = () => {
    return(
        <div className='relative'>
            <Swiper
                spaceBetween={10}
                pagination={{
                clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
            <SwiperSlide className=''>
                <img src="/public/logo/Ebl88nJRrSrzV3B4UBFj0yRcZr10ON-jvxnlKO6ARHhaqfi9.webp" alt='banner' />
            </SwiperSlide>
            <SwiperSlide className=''>
                <img src="/public/logo/Ebl88nJRrSrzV3B4UBFj0yRcZr10ON-jvxnlKO6ARHhaqfi9.webp" alt='banner' />
            </SwiperSlide>
        </Swiper>
        </div>
    )
}
export default SwiperBanner