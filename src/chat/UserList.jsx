import React from 'react';
import { Box, List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@mui/material';

const UserList = ({ users }) => {

  return (
    <Box width="100%" p={2} overflow="auto" >
      <List>
        {users.map((user, index) => (
          <ListItem key={index} button>
            <ListItemAvatar>
              <Avatar src={user.avatar} />
            </ListItemAvatar>
            <ListItemText primary={user.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default UserList;
