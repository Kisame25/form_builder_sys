import React from "react";
import {useEffect, useState, useRef, useContext} from "react";
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthProvider'
import Axios from "axios";
import Input from "../components/Input";

const Register = () => {
    const { setAuth } = useContext(AuthContext)
    const emailRef = useRef()
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repass, setRepass] = useState('')
    const [error , setError] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        emailRef.current.focus()
    },[])
    const handleRegister = async (e) => {
        e.preventDefault()
        try{
            // Send a POST request to the server with username and password
            if(password !== repass) return  setError('Password and Re-password not match.')
            const response = await Axios.post('http://127.0.0.1:8000/register',
                {
                    email,
                    username,
                    password,
                }
            )

            // Assuming the server responds with authentication success
            if (response.data.success){
                // Redirect to '/' after successful login
                //const token = response.data.token
                const code = response.data.code
                setAuth({ username,password,code})
                navigate('/verify');
            } else {
                // Handle authentication failure
                setError(response.data.message);
            }
        } catch (error) {
            // Handle errors from the server or network issues
            console.error('Error during login:', error);
            setError('An error occurred. Please try again.')
        }
    }
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
                <h2 className="text-2xl font-semibold mb-6">Login</h2>
                <form className="space-y-4" onSubmit={handleRegister}>
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <Input Ref={emailRef} id={"email"} name={'email'} value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-600">
                            Username
                        </label>
                        <Input id={"username"} name={'username'} value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <Input type={'password'} id={"password"} name={'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="re-password" className="block text-sm font-medium text-gray-600">
                            Re-Password
                        </label>
                        <Input type={'password'} id={"re-password"} name={'password'} value={repass} onChange={(e) => setRepass(e.target.value)} />
                    </div>
                    {error && (
                        <div className="text-red-500 text-sm">{error}</div>
                    )}
                    <div>
                        <button type="submit" className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register