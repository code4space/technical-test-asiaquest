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
import AddTaskPage from "../views/addTask";
import StudentCompletedTaskPage from "../views/studentCompletedTask";
import TaskStudentCommentPage from "../views/taskStudentComment";
import PrivateRoute from "../components/privateRoute";

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
        element: <PrivateRoute />,
        children: [
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
                        path: '/task/start',
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
                        path: '/add/task',
                        element: <AddTaskPage />
                    },
                    {
                        path: '/task/student/complete',
                        element: <StudentCompletedTaskPage />
                    },
                    {
                        path: '/task/student/comment',
                        element: <TaskStudentCommentPage />
                    },
                    {
                        path: '/todo',
                        element: <TodoPage />
                    },
                    {
                        path: '/ask-ai',
                        element: <AskAIPage />
                    },
                    {
                        path: '/task/detail',
                        element: <TaskDetailPage />
                    },
                ]
            }
        ]
    },

])

export default router