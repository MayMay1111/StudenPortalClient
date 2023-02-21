import ResponsiveAppBar from "@/components/Navbar"
import ResponsiveSideBar from "@/components/Sidebar"
import { Box } from "@mui/material"

interface news {
    title: string,
    releasedDay: Date,
}

const newsEx: news[] = [
    {
        title: 'news 1',
        releasedDay: new Date(2023, 2, 19),
    },

]

const Home = () => {

    const newNews = newsEx.filter((news, index) => index < 3)

    const convertDateToString = (date: Date) => {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }

    console.log(newsEx[0].releasedDay)

    return (
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

                    <Box>
                        {newNews.map((news, index) => (
                            <Box key={index}>
                                <img src="/book.png" alt="" />
                                <Box>{news.title}</Box>
                                <Box>{convertDateToString(news.releasedDay)}</Box>
                            </Box>
                        ))}
                    </Box>

                </Box>
            </ResponsiveAppBar>
        </Box>

    )
}

export default Home