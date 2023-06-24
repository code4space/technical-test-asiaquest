import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getTask } from '../store/actions/studentAction';

export default function RemainingTaskPage() {
    const navigate = useNavigate()
    const [remainingTask, setRemainingTask] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const task = useSelector(state => state.StudentReducer.task);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTask())
    }, [dispatch]);

    useEffect(() => {
        const temp = task.filter(el => el.status === 'remaining');
        setRemainingTask(temp);
        setIsLoading(false);
    }, [task]);

    console.log(remainingTask); // Check the value of remainingTask

    function handleNavigate(index) {
        const data = remainingTask[index];
        navigate(`/task/start`, {state: data})
    }

    if (isLoading) {
        return <div>Loading...</div>; // or any loading indicator
    } else {
        return (
            <div className="card-container">
                {remainingTask.map((el, i) => {
                    return (
                        <div className="card" key={i}>
                            <h3 className='title'>{el.title}</h3>
                            <p>{el.description}</p>
                            <div><PersonIcon /><b>Author:</b> {el.author}</div>
                            <div><ArrowCircleUpIcon /><b>Release Date:</b> {el.releaseDate}</div>
                            <div><AccessTimeIcon /><b>Deadline:</b> {el.deadline}</div>
                            <button onClick={() => handleNavigate(i)}>Start</button>
                        </div>
                    )
                })}
                <div className="card">
                    <h3 className='title'>Pembagian</h3>
                    <p>Kerjakan Pembagian berikut tanpa menggunakan calculator, gunakan cara sederhana, dan akan bapak test ketika waktunya tiba</p>
                    <div><PersonIcon /><b>Author:</b> Bambang Sulid</div>
                    <div><ArrowCircleUpIcon /><b>Release Date:</b> 25 January 2024, 15:00</div>
                    <div><AccessTimeIcon /><b>Deadline:</b> 26 January 2024, 15:00</div>
                    <button onClick={handleNavigate}>Start</button>
                </div>
                <div className="card">
                    <h3 className='title'>Pembagian</h3>
                    <p>Kerjakan Pembagian berikut tanpa menggunakan calculator, gunakan cara sederhana, dan akan bapak test ketika waktunya tiba</p>
                    <div><PersonIcon /><b>Author:</b> Bambang Sulid</div>
                    <div><ArrowCircleUpIcon /><b>Release Date:</b> 25 January 2024, 15:00</div>
                    <div><AccessTimeIcon /><b>Deadline:</b> 26 January 2024, 15:00</div>
                    <button onClick={handleNavigate}>Start</button>
                </div>
                <div className="card">
                    <h3 className='title'>Pembagian</h3>
                    <p>Kerjakan Pembagian berikut tanpa menggunakan calculator, gunakan cara sederhana, dan akan bapak test ketika waktunya tiba</p>
                    <div><PersonIcon /><b>Author:</b> Bambang Sulid</div>
                    <div><ArrowCircleUpIcon /><b>Release Date:</b> 25 January 2024, 15:00</div>
                    <div><AccessTimeIcon /><b>Deadline:</b> 26 January 2024, 15:00</div>
                    <button onClick={handleNavigate}>Start</button>
                </div>

            </div>
        )
    }

}