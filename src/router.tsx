import { createBrowserRouter } from "react-router-dom";
import RouterLayout from "./components/MainContent/RouterLayout";
import HomeScreen from "./components/Home/HomeScreen";
import NotFound404 from "./components/ErrorPages/NotFound404";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RouterLayout />,
        children: [
            {
                index: true,
                element: <HomeScreen />
            },
            {
                path: 'leaderboard',
                element: <div className="text-white"> Hi leaderboard! </div>
            },
            {
                path: '*',
                element: <NotFound404 />
            }
        ]
    }
])