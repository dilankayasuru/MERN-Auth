const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./Database/Connect');

const register = require('./Routers/register.route');
const login = require('./Routers/login.route');

const sendMessage = require('./Routers/sendMessage.route');
const readMessageUser = require('./Routers/readMessage.user.route');
const readAllMessages = require('./Routers/readMessage.admin.route');
const deleteMessage = require('./Routers/deleteMessage.route');
const updateMessage = require('./Routers/updateMessage.route');

require('dotenv').config();
const MONGODB_URL = process.env.MONGODB_URL;

connectDB(MONGODB_URL);
const app = express();
const PORT = process.env.PORT || 5050

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => console.log(`Server listening to PORT: ${PORT}`))

app.use('/register', register);
app.use('/login', login);

app.use('/send-message', sendMessage);
app.use('/user-messages', readMessageUser);
app.use('/all-messages', readAllMessages);
app.use('/message', deleteMessage);
app.use('/message', updateMessage);