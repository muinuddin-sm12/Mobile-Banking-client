import { Outlet } from "react-router-dom";

const Main = () => {
    return (
        <div className="min-h-screen w-full bg-[#F5F5F5] bg-[url(https://i.pinimg.com/564x/63/f5/66/63f566eeb91c2d424a6627671b9b911f.jpg)] bg-cover">
            <Outlet/>
        </div>
    );
};

export default Main;