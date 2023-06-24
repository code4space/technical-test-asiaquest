import { Outlet, useLocation, useNavigate } from "react-router-dom";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CelebrationIcon from '@mui/icons-material/Celebration';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotification, getTask } from "../store/actions/studentAction";
import { getQuickNote, getRoutine, getTodo, quickNoteFetchSuccess } from "../store/actions/noteAction";

function SubCategory({ Icon, title, option, id, active, setActive }) {

    const location = useLocation()
    const navigate = useNavigate()
    function handleClick() {
        if (id === active) return setActive(null)
        setActive(id)
    }
    function navigationTo(path) {
        navigate(path)
    }


    return (
        <div className={id === active ? "sub-category-container active" : "sub-category-container"}>
            <div className="sub-category" onClick={handleClick}>
                <Icon />
                {title}
                <ExpandMoreOutlinedIcon />
            </div>
            <ul>
                {option.map((el, i) => {
                    return <li className={location.pathname === option[i].path ? "active" : null} key={i} onClick={() => navigationTo(option[i].path)}>{location.pathname === option[i].path ? <CircleIcon /> : <CircleOutlinedIcon />}{el.name}</li>
                })}
            </ul>
        </div>
    )
}

function SubCategory1({ title, alert = 0, handleClick, Icon }) {

    return (
        <div className="sub-category-container">
            <div className="sub-category" onClick={handleClick}>
                <Icon />
                {title}
                <span>{alert > 0 ? <p>{alert}</p> : null}</span>
            </div>
        </div>
    )
}

export default function Navigation() {
    const [active, setActive] = useState(null)
    const [isMinimize, setMinimize] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [countNew, setCountNew] = useState(0)

    const navigate = useNavigate()

    function handleNavigate(route) {
        navigate(route)
    }

    const dispatch = useDispatch();
    const notification = useSelector((state) => state.StudentReducer.notification);
    useEffect(() => {
        if (localStorage.getItem('role') === 'student') dispatch(getNotification())
    }, [dispatch]);

    useEffect(() => {
        let temp = 0
        notification.forEach(el => {
            if (!el.status) {
                temp++;
            }
        });
        setCountNew(temp)
    }, [notification]);

    return (
        <>
            <div className="navigation-container">
                <div className={isMinimize ? "side-navigation minimize" : "side-navigation"}>
                    <h2><SchoolIcon style={{ fontSize: '50px' }} /> Schoot</h2>
                    <div className="category">
                        <h4>Menu</h4>
                        {localStorage.getItem('role') === "student" ?
                            < SubCategory Icon={AssignmentOutlinedIcon}
                                title={'Tasks'}
                                option={[
                                    { name: 'Remaining Task', path: '/task/remaining' },
                                    { name: 'Completed Task', path: '/task/completed' },
                                    { name: 'Missed Task', path: '/task/missed' },
                                ]}
                                id={1}
                                active={active}
                                setActive={setActive}
                            /> :
                            < SubCategory Icon={AssignmentOutlinedIcon}
                                title={'Tasks'}
                                option={[
                                    { name: 'Add Task', path: '/add/task' },
                                    { name: 'Completed Task', path: '/task/student/complete' },
                                ]}
                                id={1}
                                active={active}
                                setActive={setActive}
                            />
                        }

                        < SubCategory Icon={NoteAltOutlinedIcon}
                            title={'Notes'}
                            option={[
                                { name: 'Quick Note', path: '/quick-note' },
                                { name: 'Routine', path: '/routine' },
                                { name: 'Todo', path: '/todo' },
                            ]}
                            id={2}
                            active={active}
                            setActive={setActive}
                        />

                        {localStorage.getItem('role') === "student" ? < SubCategory1
                            Icon={NotificationsNoneIcon}
                            title={'Notifications'}
                            alert={countNew}
                            handleClick={() => { handleNavigate('/notification') }} /> :
                            null}

                        < SubCategory1
                            Icon={SmartToyIcon}
                            title={'Ask AI'}
                            handleClick={() => { handleNavigate('/ask-ai') }} />
                        < SubCategory1
                            Icon={LogoutOutlinedIcon}
                            title={'Logout'}
                            handleClick={() => { handleNavigate('/login') }} />
                    </div>
                    <div className="category">
                        <h4>Profile</h4>
                        <div className="profile">
                            <AccountCircleIcon />
                            <div>
                                <h3>{localStorage.getItem('name')}</h3>
                                <span>{localStorage.getItem('role')}</span>
                            </div>
                            <MoreHorizOutlinedIcon />
                        </div>
                    </div>
                </div>
                <div className={isMinimize ? "container minimize" : "container"}>
                    <div className={isMinimize ? "top-navigation minimize" : "top-navigation"}>
                        <span
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onClick={() => setMinimize(!isMinimize)}>{isMinimize && !isHovered ? <MenuOutlinedIcon /> : <ChevronLeftOutlinedIcon />}</span>
                        <div className="introduction">
                            <h2>Welcome, {localStorage.getItem('name')}&nbsp;<CelebrationIcon /></h2>
                            <p>{localStorage.getItem('role') === 'student' ? 'Are you ready to complete the task?' : 'Teachers at the Heart of Education'}</p>
                        </div>
                        <div className="right-nav">
                            <NotificationsNoneIcon />
                        </div>
                    </div>
                    <div className="page">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}