import React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import * as StyleVar from './Style';

const Profile = () => {
    return (
    <Box sx={{
        width: "100%",
        background:'yellow',
        color:'#000',
    }}>
        <Box sx={{
            background: StyleVar.white,
            display:'flex',
            
        }}>
            Profile
        </Box>
    </Box>
    )
}

export default Profile