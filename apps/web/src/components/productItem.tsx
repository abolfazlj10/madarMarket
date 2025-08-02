import { Link } from "react-router-dom";

const ProductItem = ({id, title}: {id: number, title: string}) => {
    return(
        <Link className="cursor-pointer" to={`/product/${id}/${title}`}>
            <div className="bg-gradient-to-b from-[#FFF7F5] to-[#FFEBE5] flex items-center justify-center rounded-xl px-2">
                <img src="/icons/productimage.svg" className="w-32" />
            </div>
            <div className="text-center text-[#787471]">{title}</div>
        </Link>
    )
}
export default ProductItem