import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import * as StyleVar from './Style'
import { ReactNode } from 'react';
import { ChildrenProps } from '@/model/props';

const settings = ['Profile', 'Account', 'Logout'];
const pageOptions = ['Trang chủ', 'Tin tức']

interface userLoginState {
  name:string;
  photoURL:string;
}

const NavbarLogin = (user?: userLoginState | null) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

    if(user){
      return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
      )
    } else {
      return (<div>Login</div>) 
    }
}


function ResponsiveAppBar({ children }: ChildrenProps) {
  return (
    <Box sx={{
      width:'calc(100vw - 15rem)',
    }}>
      <AppBar sx={{
        background:StyleVar.navBar,
        boxShadow:'0 1px 0 .2 rgba(0,0,0,.3)',
        height:'70px',
        display:'block',
        position:'relative',
      }}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters sx={{display:'flex', justifyContent:'space-between'}}>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: '#000',
              textDecoration: 'none',
              width:300,
            }}
          >
            STUDENT PORTAL
          </Typography>

            <Box sx={{
              color:'#000',
              fontFamily: 'monospace',
              fontWeight: 700,
              textDecoration: 'none',
              fontSize:16,
              display:'flex',
              gap:10,
              cursor:'pointer',
              
          }}>
              
            </Box>
            {/* <NavbarLogin /> */}
        </Toolbar>
      </Container>
    </AppBar>
    <Box sx={{
      width:'calc(100vw - 15rem)',
      height:'calc(100vh - 70px)',
      overflow:'auto',
      background:StyleVar.mainTheme,
      padding:'70px 50px',
    }}>
      {children}
    </Box>
    </Box>
  );
}
export default ResponsiveAppBar;