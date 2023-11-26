import { useState } from "react";
import { Input, Textarea } from "../components/input";
import Swal from "sweetalert2";
import axios from "axios";
import { baseUrl } from "../constant/url";
import { useNavigate } from "react-router-dom";

export default function AddTaskPage() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [time, setTime] = useState('')
    const [date, setDate] = useState('')
    const [grade, setGrade] = useState('')
    const navigate = useNavigate()

    async function add(e) {
        e.preventDefault()
        const data = { date, time }

        const [year, month, day] = data.date.split('-');
        const [hours, minutes] = data.time.split(':');

        const formattedDate = new Date(year, month - 1, day, hours, minutes);

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
                    url: baseUrl + `/task`,
                    method: "POST",
                    headers: { access_token: localStorage.getItem("access_token") },
                    data: { date, title, description, GradeId: grade }
                }).then(() => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `Success create new task for student`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    navigate('/')
                }).catch(err => {
                    console.log(err)
                })
            }
        })
    }

    return (
        <div className="task-container">
            <form className="task add-task" onSubmit={add}>
                <span style={{fontSize: '20px'}}><b>Add Task</b></span>
                <Input placeHolder={'title'} state={title} setState={setTitle} />
                <Textarea placeHolder={'description'} state={description} setState={setDescription} />
                <select required value={grade} onChange={(e) => setGrade(e.target.value)} className="detail-content">
                    <option value="" defaultValue={''} disabled>grade</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <span><b>Deadline</b></span>
                <input required type="date" value={date} onChange={(e) => { setDate(e.target.value) }} />
                <input required type="time" value={time} onChange={(e) => { setTime(e.target.value) }} />
                <button type="submit">Add</button>
            </form>
        </div>
    )
}