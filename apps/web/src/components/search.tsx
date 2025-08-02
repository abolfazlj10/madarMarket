import { RiSearch2Line } from "react-icons/ri";
const Search = () => {
    return(
        <label className="input rounded-xl w-full mt-2">
            <RiSearch2Line className="text-[#DDDCDB] text-3xl" />
            <input type="search" className="placeholder:text-[#DDDCDB]" required placeholder="جستجو" />
        </label>
    )
}
export default Search