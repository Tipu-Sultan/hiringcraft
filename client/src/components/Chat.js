
// components/Chat.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  startChat,
  fetchMessages,
  sendMessage,
} from '../redux/slices/chatSlice';
import { joinRoom, leaveRoom, receiveMessage } from '../services/socket';
import {
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Typography,
} from '@mui/material';

const Chat = ({ jobId }) => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const user = useSelector((state) => state.user.userInfo);

  const [message, setMessage] = useState('');

  useEffect(() => {
    dispatch(startChat(user._id));
    joinRoom(jobId);

    return () => {
      leaveRoom(jobId);
    };
  }, [dispatch, user._id, jobId]);

  useEffect(() => {
    dispatch(fetchMessages(jobId));
    receiveMessage((msg) => {
      dispatch(fetchMessages(jobId));
    });
  }, [dispatch, jobId]);

  const handleSendMessage = () => {
    dispatch(sendMessage({ chatId: jobId, message }));
    setMessage('');
  };

  return (
    <div>
      <Typography variant="h6">Chat</Typography>
      <List>
        {messages.map((msg, index) => (
          <ListItem key={index}>
            <ListItemText primary={msg.message} />
          </ListItem>
        ))}
      </List>
      <TextField
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        fullWidth
        variant="outlined"
        margin="normal"
      />
      <Button onClick={handleSendMessage} variant="contained" color="primary">
        Send
      </Button>
    </div>
  );
};

export default Chat;