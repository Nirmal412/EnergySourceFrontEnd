import { useDispatch, useSelector } from "react-redux";
import ProductionDashboard from "../../components/AdminDashboard";

function Dashboard() {
  const dispatch = useDispatch()

  // const role = useSelector((store)=>store?.auth?.user?.userdata?.roleName)
    
    return (
        <div>
           <ProductionDashboard/>
        </div>
    );
}

export default Dashboard;
