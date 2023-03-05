import { Auth } from "@/components/auth/auth"
import ResponsiveAppBar from "@/components/Navbar"
import ResponsiveSideBar from "@/components/Sidebar"
import { Box } from "@mui/material"
import Image from "next/image"

interface news {
    title: string,
    releasedDay: Date,
}

const newsEx: news[] = [
    {
        title: 'news 1',
        releasedDay: new Date(2023, 2, 19),
    },{
        title: 'news 2',
        releasedDay: new Date(2023, 2, 17),
    },
]

const Home = () => {

    const newNews = newsEx.filter((news, index) => index < 3)

    const convertDateToString = (date: Date) => {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }

    return (
        <Auth>
            <Box sx={{
                display: 'flex',
                overflow: 'hidden'
            }}>
                <ResponsiveSideBar />
                <ResponsiveAppBar>
                    <Box sx={{
                        background: '#fff',
                        textAlign: 'center',
                        fontSize: '40px',
                        fontFamily: 'monospace'
                    }}>Announcement</Box>

                    <Box>

                        <Box sx={{
                            display:'grid',
                            gridTemplateColumns:'repeat(auto-fit, minmax(250px, 300px))',
                            gap:'10px',
                        }}>
                            {newNews.map((news, index) => (
                                <Box key={index} >
                                    <Box sx={{
                                    border:'1px solid #000',
                                    borderRadius:'15px',
                                    overflow:'hidden',
                                }}>
                                        <img src="/book.png" alt="" />
                                    </Box>
                                    <Box >{news.title}</Box>
                                    <Box sx={{
                                        fontSize:'14px',
                                    }}>{convertDateToString(news.releasedDay)}</Box>
                                </Box>
                            ))}
                        </Box>

                    </Box>
                </ResponsiveAppBar>
            </Box>
        </Auth>
    )
}

export default Home