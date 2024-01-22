import React, { useState,useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from "../context/AuthProvider";
import Axios from 'axios';
import Input from "../components/Input";
import Button from "../components/Button";

const Login = () => {
    const { setAuth } = useContext(AuthContext)
    const userRef = useRef()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        userRef.current.focus()
    },[])

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Send a POST request to the server with username and password
            const response = await Axios.post('http://127.0.0.1:8000/login', {username,password }
            )


            // Assuming the server responds with authentication success
            if (response.data.success) {
                // Redirect to '/' after successful login
                const token = response.data.token
                setAuth({ username,password,token })
                navigate('/');
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
                <form className="space-y-4" onSubmit={handleLogin}>
                    <div className="space-y-2">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-600">
                            Username
                        </label>

                        <Input Ref={userRef} id={"username"} value={username} onChange={(e) => setUsername(e.target.value)} />

                    </div>
                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <Input type={'password'} id={'password'} name={'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {error && (
                        <div className="text-red-500 text-sm">{error}</div>
                    )}
                    <div>
                        <Button type={"submit"} >Login</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
