import { useParams } from "react-router-dom";
import { Input, InputFile, Textarea } from "../components/input";
import { useState } from "react";
import HelpIcon from '@mui/icons-material/Help';
import Swal from "sweetalert2";


export default function TaskPage() {
    const params = useParams();
    const { id } = params;

    const [data, setData] = useState("")
    function question() {
        Swal.fire({
            icon: 'question',
            iconHtml: '?',
            html: `<div><b>Author:</b> Bambang Sulid</div>
            <div><b>Release Date:</b> 25 January 2024, 15:00</div>
            <div><b>Deadline:</b> 26 January 2024, 15:00</div>`
        })
    }

    function submit(e) {
        e.preventDefault()
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            // cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
    }

    return (
        <div className="task-container">
            <form className="task" onSubmit={submit}>
                <span><b></b></span>
                <h2>Task</h2>
                <span onClick={question}><HelpIcon className="question" /></span>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit neque ipsum autem qui, atque architecto ex nostrum explicabo ipsa nihil obcaecati nulla modi nemo deserunt totam unde laboriosam eum possimus. Perferendis culpa repudiandae quis vitae neque libero, itaque officiis praesentium nihil delectus, facilis dolore, laudantium ea. Enim, quis eligendi eos veritatis exercitationem quae amet, molestias ullam doloremque similique, odio reiciendis asperiores? Quidem velit iste maiores. In animi odio fugiat repudiandae error molestias, voluptas, eius natus ipsum possimus, placeat quia et qui! Et ullam, voluptas quisquam sapiente doloremque alias dolorem quod illum deleniti, corrupti ad. Minus nisi ullam omnis possimus vitae.</p>
                <br />
                <h3>Your Answer <i>answer required! (image)</i></h3>
                {/* <InputFile state={data} setState={setData} /> */}
                <Textarea state={data} setState={setData} placeHolder={'Type your answer here'} />
                <button type="submit">submit</button>
            </form>
        </div>
    )
}