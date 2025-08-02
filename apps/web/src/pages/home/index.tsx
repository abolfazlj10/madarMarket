import Search from "../../components/search";
import SwiperBanner from "../../components/swiperBanner";
import SpecialSales from '../../components/specialSales'
import Products from "../../components/products";

const Home = () => {
    return (
        <div className="h-full space-y-2 pt-3">
            <Search />
            <SwiperBanner />
            <SpecialSales />
            <Products />
        </div>
    );
}

export default Home;