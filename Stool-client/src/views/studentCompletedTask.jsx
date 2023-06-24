import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTeacherTask } from '../store/actions/teacherAction';

export default function StudentCompletedTaskPage() {
    const navigate = useNavigate()
    // const [completedTask, setCompletedTask] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const task = useSelector(state => state.TeacherReducer.task);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTeacherTask())
        setIsLoading(false)
    }, [dispatch]);

    function handleNavigate(index) {
        const data = task[index];
        navigate(`/task/student/comment`, { state: data })
    }

    function formatDate(dateString) {
        const months = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];

        const date = new Date(dateString);

        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        const hour = date.getHours();
        const minute = date.getMinutes();

        const formattedDate = `${day} ${month} ${year}, ${hour.toString().padStart(2, '0')}.${minute.toString().padStart(2, '0')}`;

        return formattedDate + ' WIB';
    }

    if (isLoading) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="card-container">
                {task.map((el, i) => {
                    return (
                        <div className="card" key={i}>
                            <h3 className='title'>{el.Task.title}</h3>
                            <p>{el.Task.description}</p>
                            <div><AccessTimeIcon /><b>Deadline:</b> {formatDate(el.Task.date)}</div>
                            <button onClick={() => handleNavigate(i)}>See detail</button>
                        </div>
                    )
                })}
            </div>
        )
    }
}