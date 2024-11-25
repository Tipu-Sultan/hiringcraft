import React, { useState } from 'react';
import { Box, Container, Paper, Drawer, CssBaseline } from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/material';
import UserList from '../chat/UserList';
import ChatHeader from '../chat/ChatHeader';
import ChatMessages from '../chat/ChatMessages';
import MessageInput from '../chat/MessageInput';

const users = [
  { name: 'Alice', avatar: 'https://via.placeholder.com/40' },
  { name: 'Bob', avatar: 'https://via.placeholder.com/40' },
  { name: 'Charlie', avatar: 'https://via.placeholder.com/40' },
];

const messages = [
  "Hello, how are you?",
  "I'm fine, thank you! How about you?",
  "I'm doing great, thanks for asking!"
];

const currentUser = users[0];

const ChatPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ display: 'flex', height: '80vh', borderRadius: 3, overflow: 'hidden' }}>
          {!isMobile && (
            <Box width={{ xs: '35%', sm: '30%', md: '25%' }}>
              <UserList users={users} />
            </Box>
          )}

          <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
            <UserList users={users} />
          </Drawer>

          <Box width={{ xs: '100%', sm: '70%', md: '75%' }} display="flex" flexDirection="column">
            <ChatHeader user={currentUser} onMenuClick={toggleDrawer} isMobile={isMobile} />
            <ChatMessages messages={messages} />
            <MessageInput />
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default ChatPage;
