import React, {useState} from "react";
import axios from "axios";
import LogOut from "./LogOut";

export default function Messages() {

    const [messages, setMessages] = useState([]);

    const [message, setMessage] = useState('');

    const [error, setError] = useState('');

    const [response, setResponse] = useState('');

    const [messageId, setMessageId] = useState('');

    const handleChange = (e) => {
        setError('');
        setMessage(e.target.value);
    };

    const reloadMessages = async () => {
        try {
            const token = localStorage.getItem('jwtToken');

            axios.defaults.headers.common['Authentication'] = 'Bearer ' + token;

            await axios.get('http://localhost:5000/user-messages')
                .then((res) => {
                    setError('');
                    setMessages(res.data.messages);
                    setResponse('Messages are reloaded!');
                })
        } catch (error) {
            setError(error.response.data.message);
            setResponse('');
        }
    }

    const handleSend = async () => {
        try {

            const token = localStorage.getItem('jwtToken');

            axios.defaults.headers.common['Authentication'] = 'Bearer ' + token;

            await axios.post('http://localhost:5000/send-message', {message})
                .then((res) => {
                    setResponse('Message Sent!')
                })
        } catch (error) {
            setError(error.response.data.message);
            setResponse('');
        }
        await reloadMessages();
    };

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('jwtToken');

            axios.defaults.headers.common['Authentication'] = 'Bearer ' + token;

            await axios.put(`http://localhost:5000/message/${messageId}`, {message: message})
                .then((res) => {
                    setError('');
                    setResponse(`Message Updated ID: ${messageId}`);
                })
        } catch (error) {
            setError(error.response.data.message);
            setResponse('');
        }
        await reloadMessages();
    };

    const setEdit = (data) => {
        setMessage(data.message);
        setMessageId(data._id);
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('jwtToken');

            axios.defaults.headers.common['Authentication'] = 'Bearer ' + token;

            await axios.delete(`http://localhost:5000/message/${id}`)
                .then((res) => {
                    setError('');
                    setResponse(`Message Deleted ID: ${id}`);
                })
        } catch (error) {
            setError(error.response.data.message);
            setResponse('');
        }
        await reloadMessages();
    };


    return (
        <div>
            {error && <p style={{color: "rgb(200,0,0)"}}>{error}</p>}
            {response && <p style={{color: "rgb(10,180,5)"}}>{response}</p>}
            <div>
                <h3>Send Messages</h3>
                <div>
                    <label>Message</label>
                </div>
                <div>
                    <textarea onChange={handleChange} value={message}/>
                </div>
                <div>
                    <button onClick={handleSend}>Send</button>
                    <button onClick={handleUpdate}>Update</button>
                </div>
            </div>
            <div>
                <h3>Read Messages</h3>
                <ul>
                    {
                        messages.map((data, index) => (
                            <li key={index} style={{padding: "1em", border: "1px solid #333", marginBottom: "10px"}}>
                                <p>{data._id}</p>
                                <p>{data.message}</p>
                                <p
                                    style={{cursor: "pointer", color: "rgb(42,175,33)"}}
                                    onClick={() => setEdit(data)}
                                >
                                    Edit
                                </p>
                                <p
                                    style={{cursor: "pointer", color: "rgb(220, 0, 0)"}}
                                    onClick={() => handleDelete(data._id)}
                                >
                                    Delete
                                </p>
                            </li>)
                        )
                    }
                </ul>
                <button onClick={reloadMessages}>Read</button>
            </div>
            <LogOut />
        </div>
    )
}