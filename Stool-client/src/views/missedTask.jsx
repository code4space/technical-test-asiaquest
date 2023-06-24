import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTask } from '../store/actions/studentAction';

export default function MissedTaskPage() {
    const navigate = useNavigate()
    const [missedTask, setMissedTask] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const task = useSelector(state => state.StudentReducer.task);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTask())
    }, [dispatch]);

    useEffect(() => {
        async function fetchData() {
            try {
                const temp = await task.filter(el => el.status === 'missed');
                await setMissedTask(temp);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [task]);

    return (
        <div className="card-container">
            {missedTask.map((el, i) => {
                return (
                    <div className="card" key={i}>
                        <h3 className='title'>{el.title}</h3>
                        <p>{el.description}</p>
                        <div><PersonIcon /><b>Author:</b> {el.author}</div>
                        <div><ArrowCircleUpIcon /><b>Release Date:</b> {el.releaseDate}</div>
                        <div><AccessTimeIcon /><b>Deadline:</b> {el.deadline}</div>
                        {/* <button>Request an extension</button> */}
                    </div>
                )
            })}
        </div>
    )
}