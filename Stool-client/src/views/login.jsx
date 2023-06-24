import { useState } from 'react';
import { Input, InputEmail, PasswordInput } from '../components/input';
import { useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';

export default function LoginPage() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: '',
        password: '',
    })

    function handleButton () {
        navigate('/')
    }

    return (
        <div className='login-container'>
            <div className='border-container'>
                <div className='login-box'>
                <h2><SchoolIcon style={{ fontSize: '50px' }} /> Schoot</h2>
                    <h3>SIGN IN</h3>
                    <form className='input-container' onSubmit={handleButton}>
                        
                        <InputEmail setState={setData} state={data} value={'email'} placeHolder={'Email'} />
                        <PasswordInput setState={setData} state={data} value={'password'} placeHolder={'Password'} suggest={true} />
                        {/* <p className='sign-up'>Already a user ? <b>Sign In</b></p> */}

                        <button className='basic-button'>Sign in</button>
                        <p className='sign-up'>New user ? <b onClick={() => navigate('/register')}>Sign Up</b></p>
                    </form>
                </div>
            </div>
        </div>
    )
}