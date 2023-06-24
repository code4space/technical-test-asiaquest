import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Input, InputFile, Textarea } from "../components/input";
import { useState } from "react";
import HelpIcon from '@mui/icons-material/Help';
import Swal from "sweetalert2";
import axios from "axios";
import { baseUrl } from "../constant/url";


export default function TaskPage() {
    const location = useLocation()
    const navigate = useNavigate()
    const { state } = location;

    const [data, setData] = useState("")
    function question() {
        Swal.fire({
            icon: 'question',
            iconHtml: '?',
            html: `<div><b>Author:</b> ${state.author}</div>
            <div><b>Release Date:</b> ${state.releaseDate}</div>
            <div><b>Deadline:</b> ${state.deadline}</div>`
        })
    }

    async function submit(e) {
        e.preventDefault()
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            // cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios({
                    url: baseUrl + `/do-task/${state.id}`,
                    method: "patch",
                    headers: { access_token: localStorage.getItem("access_token") },
                    data: { answer: data }
                }).then(() => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    navigate('/task/remaining')
                }).catch(err => {
                    console.log(err)
                })
            }
        })
    }

    return (
        <div className="task-container">
            <form className="task" onSubmit={submit}>
                <span><b></b></span>
                <h2>{state.title}</h2>
                <span onClick={question}><HelpIcon className="question" /></span>
                <p>{state.description}</p>
                <br />
                <h3>Your Answer <i>answer required! (image)</i></h3>
                {/* <InputFile state={data} setState={setData} /> */}
                <Textarea state={data} setState={setData} placeHolder={'Type your answer here'} />
                <button type="submit">submit</button>
            </form>
        </div>
    )
}