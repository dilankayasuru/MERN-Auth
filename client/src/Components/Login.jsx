import React, {useState} from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";

export default function Login() {

    const [data, setData] = useState({email: '', password: ''});

    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        setError('');
        const {name, value} = e.target;
        setData({...data, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/login', data)
                .then((res) => {
                    localStorage.setItem('jwtToken', res.data.token);

                    const decodedToken = jwtDecode(res.data.token);
                    const userRole = decodedToken.role;

                    switch (userRole) {
                        case 'user':
                            navigate('/message')
                            break;
                        case 'admin':
                            navigate('/admin');
                            break;
                        default:
                            setError('Unknown role identified!');
                    }
                    setError('')
                })
        } catch (error) {
            setError(error.response.data.message)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input type="email" required name="email" onChange={handleChange}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" required name="password" onChange={handleChange}/>
                </div>
                <button type="submit">Login</button>
            </form>
            {error && <p style={{color: "rgb(220, 0, 0)"}}>{error}</p>}
        </div>

    )
}