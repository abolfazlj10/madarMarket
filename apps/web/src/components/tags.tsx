const Tags = () => {
    return(
        <div className="flex gap-5">
            {["","","","",""].map((item,idx)=>(
                <div className={`bg-[#F7F7F7] text-[#787471] rounded-2xl px-2 py-2 text-sm cursor-pointer ${idx == 2 && 'border border-mainColor text-mainColor'}`}>ماست </div>
            ))}
        </div>
    )
}
export default Tags;