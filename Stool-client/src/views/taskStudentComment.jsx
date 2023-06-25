import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Textarea } from "../components/input";
import axios from "axios";
import Swal from "sweetalert2";
import { baseUrl } from "../constant/url";



export default function TaskStudentCommentPage() {
    const location = useLocation()
    const navigate = useNavigate()
    const { state } = location;
    const [comment, setComment] = useState('')
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        let temp = state.comment || ''
        setComment(temp)
        setLoading(false)
    }, [])

    console.log(state)

    async function submit(e) {
        e.preventDefault()
        await axios({
            url: baseUrl + `/comment/${state.id}`,
            method: "PATCH",
            headers: { access_token: localStorage.getItem("access_token") },
            data: { comment, TaskId: state.TaskId, StudentId: state.StudentId }
        }).then(() => {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Success add your comment',
                showConfirmButton: false,
                timer: 1500
            })
            navigate('/task/student/complete')
        }).catch(err => {
            console.log(err)
        })
    }

    if (loading) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="task-container">
                <form className="task" onSubmit={submit}>
                    <span><b></b></span>
                    <h2>{state.Task.title}</h2>
                    <p>{state.Task.description}</p>
                    <br />
                    <h3>Answer</h3>
                    <Textarea readOnly={true} state={state.answer} />
                    <h3 style={{ marginTop: '30px' }}>Your comment</h3>
                    <Textarea state={comment} setState={setComment} />
                    <button type="submit">submit</button>
                </form>
            </div>
        )
    }
}