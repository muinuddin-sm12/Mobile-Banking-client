import { useLocation } from "react-router-dom";
import UserDashboard from "../../components/UserDashboard";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";


const Dashboard = () => {
    const [users, setUsers] = useState([])
    const location = useLocation();
    const {email} = location.state;

    useEffect(() => {
        const fetchData = async () => {
            try{
                const {data} = await axios.get('http://localhost:9000/users');
                setUsers(data)
            }catch(error){
                toast.error(error)
            }
        }
        fetchData()
    },[])

    // console.log(users)
    const currentUser = users.find((user) => user?.email === email || user?.number === email)
    // console.log(currentUser)
    return (
        <div>
            <UserDashboard user={currentUser}/>
        </div>
    );
};

export default Dashboard;