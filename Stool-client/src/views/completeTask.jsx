import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { useNavigate } from 'react-router-dom';

export default function CompletedTaskPage () {
    const navigate = useNavigate()
    function handleNavigate () {
        navigate(`/task/detail/1`)
    }

    return (
        <div className="card-container">
            <div className="card">
                <h3 className='title'>Pembagian</h3>
                <p>Kerjakan Pembagian berikut tanpa menggunakan calculator, gunakan cara sederhana, dan akan bapak test ketika waktunya tiba</p>
                <div><PersonIcon/><b>Author:</b> Bambang Sulid</div>
                <div><ArrowCircleUpIcon/><b>Release Date:</b> 25 January 2024, 15:00</div>
                <div><AccessTimeIcon/><b>Deadline:</b> 26 January 2024, 15:00</div>
                <button onClick={handleNavigate}>See detail</button>
            </div>
            
        </div>
    )
}