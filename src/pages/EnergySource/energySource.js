import { useDispatch, useSelector } from "react-redux";
import EnergySourceComponent from "../../components/AdminEnergySource";

function EnergySource() {
  const dispatch = useDispatch()

  // const role = useSelector((store)=>store?.auth?.user?.userdata?.roleName)
    
    return (
        <div>
           <EnergySourceComponent/>
        </div>
    );
}

export default EnergySource;