import { useEffect, useRef } from "react";
import { TiTick } from "react-icons/ti";
import { useGetCategories } from "../hooks/useCategory";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link, useParams } from "react-router-dom";
import type { categories } from "../types/type";
import SwiperCore from "swiper";

const CategoryList = () => {
  const { data } = useGetCategories();
  const { id: categoryId } = useParams();
  const numericCategoryId = categoryId ? parseInt(categoryId, 10) : -1;

  const swiperRef = useRef<SwiperCore>();

  useEffect(() => {
    if (data && swiperRef.current) {
      const indexToScroll = data.findIndex(item => item.id === numericCategoryId);
      if (indexToScroll !== -1) {
        swiperRef.current.slideTo(indexToScroll);
      }
    }
  }, [data, numericCategoryId]);

  return (
    <div className="flex gap-1 mt-5">
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="mySwiper cursor-pointer"
      >
        {data ? (
          data.map((item: categories, index: number) => (
            <SwiperSlide key={index} className="space-y-2 relative mt-2">
              <div className={`bg-gradient-to-b from-[#FFF7F5] to-[#FFEBE5] w-18 py-2 px-2 rounded-lg ${item.id === numericCategoryId && 'border border-mainColor'}`}>
                {item.id === numericCategoryId && (
                  <div className="w-full z-40 absolute right-0 -top-2 flex items-center">
                    <div className=" bg-[#FFCAB2] mx-auto text-mainColor rounded-full text-sm p-[1px]">
                      <TiTick />
                    </div>
                  </div>
                )}
                <Link to={`/product/${item.id}`}>
                  <img src={`http://localhost:3000/categories/${item.image}`} className="w-22 h-18" />
                </Link>
              </div>
              <Link to={`/product/${item.id}`} className={`text-[#787471] whitespace-nowrap text-center ${item.id === numericCategoryId && 'font-bold'}`}>
                {item.name}
              </Link>
            </SwiperSlide>
          ))
        ) : (
          ["", "", "", "", "", ""].map((_, idx) => (
            <SwiperSlide key={idx} className="space-y-1">
              <div className="skeleton w-18 h-18"></div>
              <div className="skeleton w-18 h-3"></div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
};

export default CategoryList;