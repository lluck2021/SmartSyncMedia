import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Container } from '@mui/material';
import AIGenerator from '../../components/AIGenerator/AI_Generator';
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
