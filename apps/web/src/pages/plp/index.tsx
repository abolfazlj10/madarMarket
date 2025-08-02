
import CategoryList from "../../components/categoryList";
import PlpFilter from "../../components/plpFilter";
import Tags from "../../components/tags";

const PLP = () => { 
    return(
        <div className="space-y-3">
            <CategoryList />
            <Tags />
            <PlpFilter />
        </div>
    ) }
export default PLP;