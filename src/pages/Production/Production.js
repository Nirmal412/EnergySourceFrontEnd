import { useDispatch, useSelector } from "react-redux";
import ProductionTable from "../../components/AdminProductionTable";

function Production() {
  const dispatch = useDispatch()

  // const role = useSelector((store)=>store?.auth?.user?.userdata?.roleName)
    
    return (
        <div>
          <ProductionTable/>
        </div>
    );
}

export default Production;