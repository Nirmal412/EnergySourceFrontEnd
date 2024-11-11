import { useDispatch, useSelector } from "react-redux";
import UserManagement from "../../components/AdminUSerManagement";

function Users() {
  const dispatch = useDispatch()

  // const role = useSelector((store)=>store?.auth?.user?.userdata?.roleName)
    
    return (
        <div>
            <UserManagement/> 
        </div>
    );
}

export default Users;