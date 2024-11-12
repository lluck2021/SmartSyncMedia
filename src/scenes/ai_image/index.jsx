import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Container } from '@mui/material';
import AIGenerator from '../../components/AI_ImageGen/AI_Image';
import { tokens } from '../../theme';

const Posting = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Container>

            <AIGenerator />
        </Container>
    );
};

export default Posting;
