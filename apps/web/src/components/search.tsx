import { RiSearch2Line } from "react-icons/ri";
interface inpSearch {
    searchValue: string
    setSearchValue: (val:string) => void
}
const Search = ({searchValue,setSearchValue}: inpSearch) => {
    return(
        <label className="input rounded-xl w-full focus-within:outline-none focus-within:border-mainColor group duration-300">
            <RiSearch2Line className="text-[#DDDCDB] text-3xl group-focus-within:text-mainColor duration-300" />
            <input type="search" value={searchValue} onChange={(e)=> setSearchValue(e.target.value)} className="placeholder:text-[#DDDCDB]" required placeholder="جستجو" />
        </label>
    )
}
export default Search