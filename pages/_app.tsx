import ResponsiveAppBar from '@/components/Navbar'
import ResponsiveSideBar from '@/components/Sidebar'
import '@/styles/globals.css'
import { Box } from '@mui/material'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  useEffect( () => {
    console.log("Render")
  })
  return <Box sx={{
    display:'flex',
    overflow:'hidden'
  }}>
    <ResponsiveSideBar/>
    <ResponsiveAppBar>
      <Component {...pageProps} />
    </ResponsiveAppBar>
  </Box>
}
