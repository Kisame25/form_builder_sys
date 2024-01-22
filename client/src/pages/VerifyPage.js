
import React, {useEffect, useRef, useContext, useState} from 'react';
import Input from "../components/Input";
import Button from "../components/Button";
import AuthContext from "../context/AuthProvider";
import {useNavigate} from "react-router-dom";

const VerifyPage = () => {
    const codeRef = useRef()
    const { auth } = useContext(AuthContext)
    const [Code ,setCode] = useState('')
    const [count, setCount] = useState(0)
    const [error, setError] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        codeRef.current.focus()
    },[])
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(auth)
        if(auth.code === parseInt(Code) && count < 5){
            navigate('/login')
        }else{
            setError('Code is not valid. You have 4 time left.')
            setCount(count + 1)
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl mb-4 text-center">Verification Page</h2>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <label className="mb-2 text-gray-700" htmlFor="code">
                        Verification Code:
                    </label>
                    <Input Ref={codeRef} type={'text'} value={Code} name={'code'} id={'code'} onChange={(e) => setCode(e.target.value)} />
                    <div>
                        {error && (
                            <div className="text-red-500 text-sm">{error}</div>
                        )}
                    </div>
                    <Button type={'submit'} className={'bg-blue-500 mt-5 text-white px-6 py-2 rounded hover:bg-blue-700 focus:outline-none'}>Verify</Button>
                </form>
            </div>
        </div>
    );
};

export default VerifyPage;
