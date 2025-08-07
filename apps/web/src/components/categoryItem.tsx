import { Link } from "react-router-dom";

const CategoryItem = ({id, title, image}: {id: number, title: string, image: string}) => {
    return(
        <Link className="cursor-pointer" to={`/product/${id}`}>
            <div className="bg-gradient-to-b from-[#FFF7F5] to-[#FFEBE5] flex items-center justify-center rounded-xl px-2 py-2">
                <img src={`http://localhost:3000/categories/${image}`} className="w-20 h-20" />
            </div>
            <div className="text-center text-[#787471]">{title}</div>
        </Link>
    )
}
export default CategoryItem