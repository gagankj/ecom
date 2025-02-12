import { useSelector } from "react-redux";
import AdminNavbar from "./AdminNavbar";
import UserNavbar from "./UserNavbar";

const Navbar=()=>{
    const role=useSelector((state)=>state.auth.role);
    
    return role==="admin"? <AdminNavbar/>:<UserNavbar/>
};

export default Navbar;