import React, {useEffect, useState} from "react";
import axios from "axios";

export default function Admin() {

    const [messages, setMessages] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');

        axios.defaults.headers.common['Authentication'] = 'Bearer ' + token;

        axios.get('http://localhost:5000/all-messages')
            .then((res) => {
                setMessages(res.data.messages);
                setError('');
            })
            .catch((error) => {
                setError(error.response.data.message);
            })

    }, []);

    return (
        <div>
            <h3>All Messages</h3>
            {error && <p style={{color: "rgb(220, 15, 15)"}}>{error}</p>}
            <ul>
                {
                    messages.map((message, index) => (
                        <li
                            key={index}
                            style={{
                                padding: "1em",
                                border: "1px solid #333",
                                marginBottom: "15px"
                            }}
                        >
                            <p>ID: {message._id}</p>
                            <p>Name: {message.name}</p>
                            <p>Message: {message.message}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}