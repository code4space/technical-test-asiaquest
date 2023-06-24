import { useState } from 'react';
import { Input, InputEmail, PasswordInput } from '../components/input';
import { useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';

export default function RegisterPage() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        fullName: '',
        email: '',
        password: '',
        grade: ''
    })

    function handleButton() {
        navigate('/')
    }

    return (
        <div className='login-container'>
            <div className='border-container'>
                <div className='login-box'>
                    <h2><SchoolIcon style={{ fontSize: '50px' }} /> Stool</h2>
                    <h3>SIGN Up</h3>
                    <form className='input-container' onSubmit={handleButton}>

                        <div className="dual-input">
                            <Input setState={setData} state={data} value={'fullName'} placeHolder={'Full Name'} />
                            <Input setState={setData} state={data} value={'fullName'} placeHolder={'Grade'} />

                        </div>
                        <InputEmail setState={setData} state={data} value={'email'} placeHolder={'Email'} />
                        <PasswordInput strength={true} setState={setData} state={data} value={'password'} placeHolder={'Password'} suggest={true} />

                        <button className='basic-button'>Sign Up</button>
                        <p className='sign-up'>Already a user ? <b onClick={() => navigate('/login')}>Sign In</b></p>
                    </form>
                </div>
            </div>
        </div>
    )
}