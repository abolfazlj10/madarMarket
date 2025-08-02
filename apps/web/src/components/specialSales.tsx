const SpecialSales = () => {
    return (
        <div className="border bg-[#FDF2F6] border-[#FFCACA] w-full flex justify-between rounded-xl px-4 py-3">
            <div className="flex items-center gap-2">
                <img src="icons/fireIcon.svg" />
                <div className="text-[#DE030A] text-sm">
                    <div>جشنواره فروش</div>
                    <div className="flex">
                        <div className="font-bold">ویـــــــــــژه!</div>
                        <img src="icons/leftArrow.svg" />
                    </div>
                </div>
            </div>
            <div className="flex gap-1 items-center text-sm text-redBg">
                <div className="bg-[#FA2C37] rounded font-semibold text-white px-2 py-1">12</div>:
                <div className="bg-[#FA2C37] rounded font-semibold text-white px-2 py-1">45</div>:
                <div className="bg-[#FA2C37] rounded font-semibold text-white px-2 py-1">59</div>
            </div>
        </div>
    )
}
export default SpecialSales