import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import '../Styles/Login.css'

const Login = () => {

    const { register, handleSubmit } = useForm();

    const navigate = useNavigate()

    const submit = data => {
        axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/users/login/", data)
            .then(res => {
                localStorage.setItem("token", res.data.data.token)
                navigate("/")
            })
            .catch(error => {
                if(error.response.status === 404){
                    alert("credenciales incorrectas")
                }
            })
    }

    return (
        <div className='body-login'>
            <div className='container-login'>
                <h1>Welcome! Enter your email and password to continue</h1>
                <form className='loginform' onSubmit={handleSubmit(submit)}>
                    <label htmlFor='name' >
                        Email: 
                    </label>
                    <input {...register("email")} id="name" type="text" />
                    <label htmlFor='password'>
                        Password: 
                    </label>
                    <input {...register("password")}id="password" type="password" />
                    <div className='btn-login'>   
                        <button style={{ cursor: "pointer" }} type='submit'>
                            Login
                        </button>
                    </div> 
                </form>
            </div>
        </div>
    );
};

export default Login;