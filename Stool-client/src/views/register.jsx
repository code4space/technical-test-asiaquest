import { useState } from 'react';
import { Input, InputEmail, PasswordInput } from '../components/input';
import { useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import { baseUrl } from '../constant/url';
import axios from 'axios';
import Swal from "sweetalert2";

export default function RegisterPage() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        fullName: '',
        email: '',
        password: '',
        grade: ''
    })

    async function handleButton(e) {
        e.preventDefault()
        await axios({
            url: baseUrl + `/student/register`,
            method: "POST",
            data: { fullName: data.fullName, email: data.email, password: data.password, GradeId: data.grade }
        }).then(() => {
            navigate('/')
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Success add your comment',
                showConfirmButton: false,
                timer: 1500
            })
        }).catch(err => {
            console.log(err)
        })
    }

    function handleChange(e) {
        setData({ ...data, grade: e.target.value })
    }

    return (
        <div className='login-container'>
            <div className='border-container'>
                <div className='login-box register'>
                    <h2><SchoolIcon style={{ fontSize: '50px' }} /> Stool</h2>
                    <h3>SIGN Up</h3>
                    <form className='input-container' onSubmit={handleButton}>

                        <div className="dual-input">
                            <Input setState={setData} state={data} value={'fullName'} placeHolder={'Full Name'} />
                            {/* <Input setState={setData} state={data} value={'fullName'} placeHolder={'Grade'} /> */}
                            <select required value={data.grade} onChange={handleChange} className="detail-content">
                                <option value="" defaultValue={''} disabled>grade</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>

                        </div>
                        <InputEmail setState={setData} state={data} value={'email'} placeHolder={'Email'} />
                        <PasswordInput strength={true} setState={setData} state={data} value={'password'} placeHolder={'Password'} suggest={true} />

                        <button className='basic-button' type='submit'>Sign Up</button>
                        <p className='sign-up'>Already a user ? <b onClick={() => navigate('/login')}>Sign In</b></p>
                    </form>
                </div>
            </div>
        </div>
    )
}