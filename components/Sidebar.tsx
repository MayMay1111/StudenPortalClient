import * as React from 'react';
import Box from '@mui/material/Box';
import * as StyleVar from './Style'
import { ReactNode, useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import PersonIcon from '@mui/icons-material/Person';

interface userLoginState {
  name: string;
  photoURL: string;
}

interface Props {
  children: ReactNode,
}

const categories = [{
  content: 'Home',
  icon: <HomeIcon />,
},
{
  content: 'Profile',
  icon: <PersonIcon />,
},
{
  content: 'Schedule',
  icon: <CalendarMonthIcon />,
},
]

const item = {
  background: 'rgba(0,0,0,0.1)',
  ":before": {
    content: '""',
    left: 0,
    width: '5px',
    background: StyleVar.lightWhite,
    position: 'fixed',
    height: 'inherit',
  }
}

function ResponsiveSideBar() {
  const router = useRouter();

  const [cate, setCate] = useState(router.asPath);

  return (
    <>
      <Box sx={{
        width: '15rem',
        height: '100vh',
        paddingTop: '70px',
        background: StyleVar.sideBar,
        color: StyleVar.white,
      }}>
        <Box>
          {categories.map((category, index) => {
            return (
              <Box key={index} sx={`/${category.content.toLowerCase()}` === cate ? {
                paddingLeft: '20px',
                display: 'flex',
                alignItems: 'center',
                height: '50px',
                gap: '10px',
                cursor: 'pointer',
                ...item,
              } : {
                paddingLeft: '20px',
                display: 'flex',
                alignItems: 'center',
                height: '50px',
                gap: '10px',
                cursor: 'pointer',
                transition: '.3s',
                position: 'relative',
                ":hover": item,
              }
              } onClick={() => {
                setCate(`/${category.content.toLocaleLowerCase()}`)
                router.push(`/${category.content.toLocaleLowerCase()}`)
              }}>
                {category.icon}
                <Typography sx={{
                  fontWeight: 700,
                }}>{category.content}</Typography>
              </Box>
            )
          })}
        </Box>
      </Box>
    </>
  );
}
export default ResponsiveSideBar;