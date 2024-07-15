import { Outlet } from "react-router-dom";

const Main = () => {
    return (
        <div className="min-h-screen w-full bg-[#F5F5F5]">
            <Outlet/>
        </div>
    );
};

export default Main;