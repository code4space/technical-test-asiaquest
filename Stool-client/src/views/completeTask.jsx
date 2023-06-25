import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTask } from '../store/actions/studentAction';

export default function CompletedTaskPage() {
    const navigate = useNavigate()
    const [completedTask, setCompletedTask] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const task = useSelector(state => state.StudentReducer.task);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTask())
    }, [dispatch]);

    console.log(task)

    useEffect(() => {
        async function fetchData() {
            try {
                const temp = await task.filter(el => el.status === 'completed');
                await setCompletedTask(temp);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [task]);

    function handleNavigate(index) {
        const data = completedTask[index];
        navigate(`/task/detail`, { state: data })
    }

    if (isLoading) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="card-container">
                {completedTask.map((el, i) => {
                    return (
                        <div className="card" key={i}>
                            <h3 className='title'>{el.title}</h3>
                            <p>{el.description}</p>
                            <div><PersonIcon /><b>Author:</b> {el.author}</div>
                            <div><ArrowCircleUpIcon /><b>Release Date:</b> {el.releaseDate}</div>
                            <div><AccessTimeIcon /><b>Deadline:</b> {el.deadline}</div>
                            <button onClick={() => handleNavigate(i)}>See detail</button>
                        </div>
                    )
                })}
            </div>
        )
    }
}