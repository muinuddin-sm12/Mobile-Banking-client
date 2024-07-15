import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Error from "../pages/Error/Error";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Dashboard from "../pages/dashboard/Dashboard";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        errorElement: <Error/>,
        children: [
            {
                index: true,
                element: <Login/>
            },
            {
                path: '/register',
                element: <Register/>
            },
            {
                path: '/dashboard',
                element: <Dashboard/>
            }
        ]
    }
])
export default router;