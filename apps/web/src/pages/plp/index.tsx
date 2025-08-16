
import CategoryList from "../../components/categoryList";
// import PlpFilter from "../../components/plpFilter";
import SpecialSales from "../../components/specialSales";
import Tags from "../../components/tags";
import { useGetpProductsFromCategory } from "../../hooks/useProduct";
import { useState } from "react";
import { useParams } from "react-router-dom";
import type { product, typeFilterType } from "../../types/type";
import ProudctItem from "../../components/productItem";

const showCategoey = true

const PLP = () => {
    const {id : categoryId} = useParams()
    const { data } = useGetpProductsFromCategory(categoryId)
    const [filterType] = useState<typeFilterType>(null)
    return(
        <div className="space-y-3 pb-20">
            {showCategoey ? (
                <>
                    <CategoryList />
                    <Tags />
                </>
            ) : (
                <SpecialSales />
            )}
            {/* <PlpFilter filterType={filterType} setFilterType={setFilterType} /> */}
            <div className="space-y-3">
                {data ? (
                    data.filter(item => {
                    if (filterType === "hami") return item.isWithHami;
                    if (filterType === "discount") return item.discount;
                    return true; 
                    }).length === 0 ? (
                    <p className="text-center text-gray-500 mt-10">محصولی یافت نشد.</p>
                    ) : (
                    data.map((item: product, idx: number) => {
                        if (
                        (filterType === "hami" && item.isWithHami) ||
                        (filterType === "discount" && item.discount) ||
                        filterType == null
                        ) {
                        return (
                            <div key={idx} className={`flex border border-[#F5F2EF] rounded-lg group/productItem ${item.isWithHami? "flex-col overflow-hidden gap-3" : "px-2 py-2 gap-4"}`}>
                                <ProudctItem productDetail={item} index={idx} />
                            </div>
                        );
                        }
                        return null;
                    })
                    )
                ) : (
                    <>
                    {["", "", ""].map((_, idx) => (
                        <div
                        key={idx}
                        className="border border-[#F5F2EF] rounded-lg h-32 flex p-2 gap-2"
                        >
                        <div className="skeleton w-4/12"></div>
                        <div className="flex-1 flex flex-col justify-between">
                            <div className="h-5 w-32 skeleton"></div>
                            <div className="flex justify-between items-end">
                            <div className="skeleton w-20 h-5"></div>
                            <div className="skeleton w-28 h-8 rounded-full"></div>
                            </div>
                        </div>
                        </div>
                    ))}
                    </>
                )}
                </div>

        </div>
    ) }
export default PLP;