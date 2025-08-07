import Search from "../../components/search";
import SwiperBanner from "../../components/swiperBanner";
import SpecialSales from '../../components/specialSales'
import Products from "../../components/products";
import SpecialProducts from "../../components/specialProducts";
import { useEffect, useState } from "react";
import { useSearch } from "../../hooks/useSearch";
import type { product } from "../../types/type";
import ProudctItem from "../../components/productItem";

const Home = () => {
    const [valueSearch,setValueSearch] = useState<string>('')
    const [ showPdp,setShopPdp ] = useState<boolean>(false)
    const { data: productsSearch = [] } = useSearch(valueSearch) 
    return (
        <div className="h-full space-y-2 pt-3">
            <Search searchValue={valueSearch} setSearchValue={setValueSearch} />
            {valueSearch?.length == 0 ? (
                <>
                    <SwiperBanner />
                    <SpecialSales />
                    <Products />
                    <SpecialProducts />
                </>
            ):(
                productsSearch.map((item: product,idx: number)=>(
                    <div key={idx} className={`flex border border-[#F5F2EF] rounded-lg ${idx == 0 ? 'flex-col overflow-hidden gap-3' : 'px-2 py-2 gap-4'}`}>
                        <ProudctItem productDetail={item} setShowPdp={setShopPdp} index={idx} />
                    </div>
                ))
            )}
        </div>
    );
}

export default Home;