import Search from "../../components/search";
import SwiperBanner from "../../components/swiperBanner";
import SpecialSales from '../../components/specialSales'
import Products from "../../components/products";
import SpecialProducts from "../../components/specialProducts";

const Home = () => {
    return (
        <div className="h-full space-y-2 pt-3">
            <Search />
            <SwiperBanner />
            <SpecialSales />
            <Products />
            <SpecialProducts />
        </div>
    );
}

export default Home;