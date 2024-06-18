import React from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function LogOut() {

    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem('jwtToken');
        axios.post('/api/auth/logout')
            .then(() => {
                navigate('/login')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <button type='button' onClick={handleLogOut}>Log Out</button>
    )
}