import { createBrowserRouter } from "react-router-dom";
import HomePage from "../views/home";
import Navigation from "../components/navigation";
import RemainingTaskPage from "../views/remainingTask";
import TaskPage from "../views/task";

const router = createBrowserRouter([
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