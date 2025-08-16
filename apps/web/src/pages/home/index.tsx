import Search from "../../components/search";
import SpecialSales from '../../components/specialSales'
import Products from "../../components/categories";
import SpecialProducts from "../../components/specialProducts";
import { useState } from "react";
import { useSearch } from "../../hooks/useSearch";
import type { product } from "../../types/type";
import ProudctItem from "../../components/productItem";

const Home = () => {
    const [valueSearch,setValueSearch] = useState<string>('')
    const { data: productsSearch = [] } = useSearch(valueSearch) 
    return (
        <div className="h-full space-y-2 pt-3">
            <Search searchValue={valueSearch} setSearchValue={setValueSearch} />
            {valueSearch?.length == 0 ? (
                <>
                    {/* <SwiperBanner /> */}
                    <img className="rounded-lg mt-3" src="./icons/DphMarketSlider.b7cf000b766b31b9c1c0f95dfdf19d80.png" alt="banner delivery" />
                    <SpecialSales />
                    <Products />
                    <SpecialProducts />
                </>
            ):(
                productsSearch.map((item: product,idx: number)=>(
                    <div key={idx} className={`flex border border-[#F5F2EF] rounded-lg group/productItem ${item.isWithHami? "flex-col overflow-hidden gap-3" : "px-2 py-2 gap-4"}`}>
                        <ProudctItem productDetail={item} index={idx} />
                    </div>
                ))
            )}
        </div>
    );
}

export default Home;