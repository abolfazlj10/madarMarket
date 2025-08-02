import Search from "../../components/search";
import SwiperBanner from "../../components/swiperBanner";
import SpecialSales from '../../components/specialSales'

const Home = () => {
    return (
        <div className="h-full">
            <Search />
            <SwiperBanner />
            <SpecialSales />
        </div>
    );
}

export default Home;