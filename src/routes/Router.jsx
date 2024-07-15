import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Error from "../pages/Error/Error";
import HomePage from "../pages/Home/HomePage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        errorElement: <Error/>,
        children: [
            {
                index: true,
                element: <HomePage/>
            }
        ]
    }
])
export default router;