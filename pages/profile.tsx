import React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import * as StyleVar from '../components/Style';
import { Avatar } from '@mui/material';
import ResponsiveAppBar from '@/components/Navbar';
import ResponsiveSideBar from '@/components/Sidebar';
import { Auth } from '@/components/auth/auth';

const Profile = () => {
    return (
        <Auth>
            <Box sx={{
                display: 'flex',
                overflow: 'hidden'
            }}>
                <ResponsiveSideBar />
                <ResponsiveAppBar>
                    <Box sx={{
                        width: "100%",
                        background: 'yellow',
                        color: '#000',
                    }}>
                        <Box sx={{
                            background: StyleVar.white,
                            display: 'flex',

                        }}>
                            <Avatar sx={{
                                width: '200px',
                                height: '200px',
                            }}></Avatar>
                        </Box>
                    </Box>
                </ResponsiveAppBar>
            </Box>
        </Auth>
    )
}

export default Profile