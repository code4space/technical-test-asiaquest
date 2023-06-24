import { useNavigate, useParams } from "react-router-dom";
import { Input, InputFile, Textarea } from "../components/input";
import { useState } from "react";
import HelpIcon from '@mui/icons-material/Help';
import Swal from "sweetalert2";


export default function TaskDetailPage() {
    const params = useParams();
    const navigate = useNavigate()
    const { id } = params;

    const myAnser = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit neque ipsum autem qui, atque architecto ex nostrum explicabo ipsa nihil obcaecati nulla modi nemo deserunt totam unde laboriosam eum possimus. Perferendis culpa repudiandae quis vitae neque libero, itaque officiis praesentium nihil delectus, facilis dolore, laudantium ea. Enim, quis eligendi eos veritatis exercitationem quae amet, molestias ullam doloremque similique, odio reiciendis asperiores? Quidem velit iste maiores. In animi odio fugiat repudiandae error molestias, voluptas, eius natus ipsum possimus, placeat quia et qui! Et ullam, voluptas quisquam sapiente doloremque alias dolorem quod illum deleniti, corrup'
    function question() {
        Swal.fire({
            icon: 'question',
            iconHtml: '?',
            html: `<div><b>Author:</b> Bambang Sulid</div>
            <div><b>Release Date:</b> 25 January 2024, 15:00</div>
            <div><b>Deadline:</b> 26 January 2024, 15:00</div>`
        })
    }

    function back() {
        navigate('/task/completed')
    }

    return (
        <div className="task-container">
            <form className="task">
                <span><b></b></span>
                <h2>Task</h2>
                <span onClick={question}><HelpIcon className="question" /></span>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit neque ipsum autem qui, atque architecto ex nostrum explicabo ipsa nihil obcaecati nulla modi nemo deserunt totam unde laboriosam eum possimus. Perferendis culpa repudiandae quis vitae neque libero, itaque officiis praesentium nihil delectus, facilis dolore, laudantium ea. Enim, quis eligendi eos veritatis exercitationem quae amet, molestias ullam doloremque similique, odio reiciendis asperiores? Quidem velit iste maiores. In animi odio fugiat repudiandae error molestias, voluptas, eius natus ipsum possimus, placeat quia et qui! Et ullam, voluptas quisquam sapiente doloremque alias dolorem quod illum deleniti, corrupti ad. Minus nisi ullam omnis possimus vitae.</p>
                <br />
                <h3>Your Answer <i>read only</i></h3>
                {/* <InputFile state={data} setState={setData} /> */}
                <Textarea readOnly={true} state={myAnser} />
                <button onClick={back}>back</button>
            </form>
        </div>
    )
}