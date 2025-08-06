import { useTagsByCategory } from "../hooks/useTags";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useParams } from "react-router-dom";
import type { tag } from "../types/type";
import { useState } from "react";
const Tags = () => {
    const {id} = useParams()
    const {data: tags} = useTagsByCategory(Number(id))
    const [tagsSelected, setTagsSelected] = useState(0)
    return(
        <Swiper
            slidesPerView={4}
            spaceBetween={10}
            className="mySwiper cursor-pointer"
        >
            {tags?.map((item: tag,idx: number)=>(
                <SwiperSlide onClick={() => setTagsSelected(idx)} key={idx} className={`!duration-300 bg-[#F7F7F7] !w-auto text-[#787471] rounded-2xl px-5 py-2 text-sm cursor-pointer text-center border border-mainColor/0 ${idx == tagsSelected && '!border-mainColor text-mainColor'}`}>{item.name}</SwiperSlide>
            ))}
        </Swiper>
    )
}
export default Tags;