import { createBrowserRouter } from "react-router-dom";
import HomePage from "../views/home";
import Navigation from "../components/navigation";
import RemainingTaskPage from "../views/remainingTask";
import TaskPage from "../views/task";
import LoginPage from "../views/login";
import RegisterPage from "../views/register";
import CompletedTaskPage from "../views/completeTask";
import TaskDetailPage from "../views/detailTask";
import MissedTaskPage from "../views/missedTask";
import NotificationPage from "../views/notifications";
import QuickNotePage from "../views/quickNote";
import RoutinePage from "../views/routine";
import TodoPage from "../views/todo";
import AskAIPage from "../views/askAI";

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
            {
                path: '/task/completed',
                element: <CompletedTaskPage />
            },
            {
                path: '/task/missed',
                element: <MissedTaskPage />
            },
            {
                path: '/quick-note',
                element: <QuickNotePage />
            },
            {
                path: '/notification',
                element: <NotificationPage />
            },
            {
                path: '/routine',
                element: <RoutinePage />
            },
            {
                path: '/todo',
                element: <TodoPage />
            },
            {
                path: '/ask-ai',
                element: <AskAIPage/>
            },
            {
                path: '/task/detail/:id',
                element: <TaskDetailPage />
            },
        ]
    }
])

export default router