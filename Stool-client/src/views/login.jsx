import { useState } from 'react';
import { Input, InputEmail, PasswordInput } from '../components/input';
import { useNavigate } from 'react-router-dom';
import Face6Icon from '@mui/icons-material/Face6';
import Face5Icon from '@mui/icons-material/Face5';
import SchoolIcon from '@mui/icons-material/School';
import {baseUrl} from '../constant/url'
import Swal from "sweetalert2";
import axios from "axios";


export default function LoginPage() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: '',
        password: '',
        role: 'student'
    })

    function login(e) {
        e.preventDefault();
        axios({
            url: baseUrl + `/${data.role}/login`,
            method: "POST",
            data: {
                email: data.email,
                password: data.password,
                role: data.role
            },
        })
            .then((res) => {
                if (res.statusText !== "OK") throw new Error("something went wrong");
                return res.data;
            })
            .then((result) => {
                localStorage.setItem("access_token", result.access_token);
                localStorage.setItem("name", result.name);
                localStorage.setItem("role", data.role);
                navigate("/");
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: `ERROR ${error.response.status}`,
                    text: error.response.data.message,
                });
            });
    }

    return (
        <div className='login-container'>
            <div className='border-container'>
                <div className='login-box'>
                    <h2><SchoolIcon style={{ fontSize: '50px' }} /> Schoot</h2>
                    <h3>SIGN IN</h3>
                    <form className='input-container' onSubmit={login}>

                        <InputEmail setState={setData} state={data} value={'email'} placeHolder={'Email'} />
                        <PasswordInput setState={setData} state={data} value={'password'} placeHolder={'Password'} suggest={true} />
                        {/* <p className='sign-up'>Already a user ? <b>Sign In</b></p> */}

                        <div className="role">
                            <span className={data.role === 'student' ? "student active" : "student"} onClick={() => setData({ ...data, role: 'student' })}><Face5Icon />Student</span>
                            <span className={data.role === 'teacher' ? "teacher active" : "teacher"} onClick={() => setData({ ...data, role: 'teacher' })}><Face6Icon />Teacher</span>
                        </div>
                        <button className='basic-button' type='submit'>Sign in</button>
                        <p className='sign-up'>New user ? <b onClick={() => navigate('/register')}>Sign Up</b></p>
                    </form>
                </div>
            </div>
        </div>
    )
}