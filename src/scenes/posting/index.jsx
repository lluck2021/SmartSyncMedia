import React from 'react';
import { useTheme } from '@mui/material/styles'; 
import { Container } from '@mui/material';
import UserPostingMedia from '../../components/UserPostMedia/UserPostingMedia'; 
import { tokens } from '../../theme'; 
 

const Posting = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Container>

            <UserPostingMedia />
        </Container>
    );
};

export default Posting;
