
import CategoryList from "../../components/categoryList";
import PlpFilter from "../../components/plpFilter";
import Tags from "../../components/tags";

const PLP = () => { 
    return(
        <div className="space-y-3">
            <CategoryList />
            <Tags />
            <PlpFilter />
            <div className="space-y-3">
                {["","","","","","",""].map((item,idx)=>(
                    <div className={`flex border border-[#F5F2EF] rounded-lg ${idx == 1 || idx == 4 ? 'flex-col overflow-hidden gap-3' : 'px-2 py-2 gap-4'}`}>
                        {idx == 1 || idx == 4 ? (
                            <>
                            <div className="flex px-2 pt-2 gap-4">
                                <div>
                                    <img src="/icons/cheese.png" />
                                </div>
                                <div className="flex-1 flex flex-col gap-3">
                                    <div className="text-[#787471] text-sm flex-1">روغن زیتون بکر کریستال - 5 لیتر پنیر فتا دوشه هراز روغن زیتون بکر کریستال - 5 لیتر پنیر فتا دوشه هرا</div>
                                    <div className="flex items-center flex-1">
                                    <div className="flex-1">
                                        <div className="flex gap-2 items-center">
                                            <div className="text-[#787471] text-sm"><del>40,000تومان</del></div>
                                            <div className="bg-[#C50F1F] text-white rounded-2xl p-1 text-xs">10%</div>
                                        </div>
                                        <div className="flex gap-1 items-center">
                                            <div className="text-[#BA400B] font-bold">۳,۷۰۰,۰۰۰</div>
                                            <div className="text-[#BA400B] text-xs">تومان</div>
                                        </div>
                                    </div>
                                        <div className="flex-1 flex items-center justify-end">
                                            <div className="border border-[#F5F2EF] bg-[#F7F7F7] text-[#787471] px-3 text-sm py-2 rounded-full font-semibold cursor-pointer hover:bg-mainColor hover:text-white duration-200 hover:shadow">افزودن به سبد </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[#FFEDE5] flex justify-between py-2 px-4">
                                <div className="text-[#BA400B] font-bold text-lg">قیمت با حامی کارت</div>
                                <div className="flex gap-1 items-center">
                                        <div className="text-[#BA400B] font-bold">۳,۷۰۰,۰۰۰</div>
                                        <div className="text-[#BA400B] text-xs">تومان</div>
                                </div>
                            </div>
                            </>
                        ):(
                            <>
                                <div>
                                    <img src="/icons/cheese.png" />
                                </div>
                                <div className="flex-1 flex flex-col gap-3">
                                    <div className="text-[#787471] text-sm flex-1">روغن زیتون بکر کریستال - 5 لیتر پنیر فتا دوشه هراز روغن زیتون بکر کریستال - 5 لیتر پنیر فتا دوشه هرا</div>
                                    <div className="flex items-center flex-1">
                                    <div className="flex-1">
                                        <div className="flex gap-2 items-center">
                                            <div className="text-[#787471] text-sm"><del>40,000تومان</del></div>
                                            <div className="bg-[#C50F1F] text-white rounded-2xl p-1 text-xs">10%</div>
                                        </div>
                                        <div className="flex gap-1 items-center">
                                            <div className="text-[#BA400B] font-bold">۳,۷۰۰,۰۰۰</div>
                                            <div className="text-[#BA400B] text-xs">تومان</div>
                                        </div>
                                    </div>
                                        <div className="flex-1 flex items-center justify-end">
                                            <div className="border border-[#F5F2EF] bg-[#F7F7F7] text-[#787471] px-3 text-sm py-2 rounded-full font-semibold cursor-pointer hover:bg-mainColor hover:text-white duration-200 hover:shadow">افزودن به سبد </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    ) }
export default PLP;