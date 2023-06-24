import { createBrowserRouter } from "react-router-dom";
import HomePage from "../views/home";
import Navigation from "../components/navigation";
import RemainingTaskPage from "../views/remainingTask";
import TaskPage from "../views/task";
import LoginPage from "../views/login";
import RegisterPage from "../views/register";

const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/register',
        element: <RegisterPage />
    },
    {
        element: <Navigation />,
        children: [
            {
                path: '/',
                element: <HomePage />
            },
            {
                path: '/task/remaining',
                element: <RemainingTaskPage />
            },
            {
                path: '/task/start/:id',
                element: <TaskPage />
            },
        ]
    }
])

export default router