import Head from 'next/head'
import { Inter } from '@next/font/google'
import { Box } from '@mui/system'
import * as StyleVar from '../components/Style'
import { Button, Checkbox, Input } from '@mui/material'
import { useAuth } from '@/hooks'
import { LoginPayLoad } from '../model/auth'
import { useRouter } from 'next/router'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { LoadingComponent, LoadingPage } from '@/components/Loading'
import { Auth } from '@/components/auth/auth'
import { dataBinding } from '@syncfusion/ej2-react-schedule'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const inputStyle = {
    marginBottom: '40px',
  }

  const router = useRouter()

  // typeof window !== 'undefined' ? localStorage.getItem('password') ?? '' : 

  const [username, setUsername] = useState(localStorage.getItem('username') ?? '');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [Loading, setLoading] = useState(false);

  const { data, login} = useAuth({
    revalidateOnMount: true,
  })

  const handleLogin = async () => {
    setLoading(true)
    try {
      await login({ username, password })
      handleLocalSave()
      router.push('/home')
    } catch (err) {
      console.log("error:", err)
      setLoading(false)
    }
  }

  const handleSaveUser = () => {
    setIsChecked(!isChecked)
  }

  const handleLocalSave = () => {
    if (isChecked) {
      localStorage.setItem('username', username)
    } else {
      localStorage.clear()
    }
  }

  return (
      <Box sx={{
        width: '100vw',
        height: '100vh',
        background: 'url(university.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,.7)',
        }}>
          <Head>
            <title>Login to Student Portal</title>
            <meta name="description" content="Student portal" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Box sx={{
            background: StyleVar.lightWhite,
            width: '400px',
            height: '500px',
            borderRadius: '25px',
            padding: '30px',
          }}>
            <Typography variant='h3' align='center' sx={{
              color: StyleVar.heavyBlue,
              marginBottom: '40px',
            }}>Login</Typography>

            <Typography variant='h6'>Username</Typography>
            <Input sx={inputStyle} placeholder='Username' fullWidth value={username} onChange={(e) => setUsername(e.target.value)} />

            <Typography variant='h6'>Password</Typography>
            <Input sx={inputStyle} placeholder='Password' type='password' fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />

            <Box >
              <Checkbox onClick={handleSaveUser} /> Remember me
            </Box>

          <Button sx={{
            border: '1px solid #000',
            borderRadius:'15px',
            width:'100%',
            height:'60px'
          }}
            onClick={handleLogin}
          >
            {!Loading?<div>Login</div>:<LoadingComponent/>}
          </Button>
          </Box>
        </Box>
      </Box>
  )
}
