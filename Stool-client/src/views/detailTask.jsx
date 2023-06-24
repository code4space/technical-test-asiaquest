import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Input, InputFile, Textarea } from "../components/input";
import { useState } from "react";
import HelpIcon from '@mui/icons-material/Help';
import Swal from "sweetalert2";


export default function TaskDetailPage() {
    const location = useLocation()
    const navigate = useNavigate()
    const { state } = location;

    const myAnser = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit neque ipsum autem qui, atque architecto ex nostrum explicabo ipsa nihil obcaecati nulla modi nemo deserunt totam unde laboriosam eum possimus. Perferendis culpa repudiandae quis vitae neque libero, itaque officiis praesentium nihil delectus, facilis dolore, laudantium ea. Enim, quis eligendi eos veritatis exercitationem quae amet, molestias ullam doloremque similique, odio reiciendis asperiores? Quidem velit iste maiores. In animi odio fugiat repudiandae error molestias, voluptas, eius natus ipsum possimus, placeat quia et qui! Et ullam, voluptas quisquam sapiente doloremque alias dolorem quod illum deleniti, corrup'
    function question() {
        Swal.fire({
            icon: 'question',
            iconHtml: '?',
            html: `<div><b>Author:</b> ${state.author}</div>
            <div><b>Release Date:</b> ${state.releaseDate}</div>
            <div><b>Deadline:</b> ${state.deadline}</div>`
        })
    }

    function back() {
        navigate('/task/completed')
    }

    return (
        <div className="task-container">
            <div className="task">
                <span><b></b></span>
                <h2>{state.title}</h2>
                <span onClick={question}><HelpIcon className="question" /></span>
                <p>{state.description}</p>
                <br />
                <h3>Your Answer <i>read only</i></h3>
                {/* <InputFile state={data} setState={setData} /> */}
                <Textarea readOnly={true} state={state.answer} />
                <button onClick={back}>back</button>
            </div>
        </div>
    )
}