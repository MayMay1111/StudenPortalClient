import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button } from "@mui/material"
import Box from "@mui/material/Box"
import react, { useState } from 'react'
import * as StyleVar from '../components/Style'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ResponsiveSideBar from "@/components/Sidebar";
import ResponsiveAppBar from "@/components/Navbar";


interface lessonInterface {
  name: string,
  classId: string,
  startFrom: Date,
  endAt: Date,
  dayOfWeek: number,
  numberOfPeriod: number,
  startTime: number,
}

interface skipping {
  day: number,
  lesson: number[],
}

const WeekLesson: lessonInterface[] = [
  {
    name: 'Cau truc roi rac',
    classId: '40123545682',
    startFrom: new Date(2023, 2, 17),
    endAt: new Date(2023, 4, 27),
    dayOfWeek: 3,
    numberOfPeriod: 2,
    startTime: 7,
  },
  {
    name: 'Co so du lieu',
    classId: '40123545681',
    startFrom: new Date(2023, 1, 17),
    endAt: new Date(2023, 3, 27),
    dayOfWeek: 3,
    numberOfPeriod: 3,
    startTime: 10,
  }
]


const Schedule = () => {


  const scheduleSort = (condition: number, skipCheck: skipping[]) => {
    let getLesson = WeekLesson.filter((lesson) => lesson.startTime === condition && lesson.endAt.getTime() >= firstDayOfWeek.getTime() && lesson.startFrom.getTime() <= firstDayOfWeek.getTime())
    let b: (lessonInterface | null)[] = [];
    for (var i = 0; i < 7; i++) {
      let isExist = 0;
      getLesson.map((item) => {
        if (item.dayOfWeek === i) {
          b.push(item);
          skipCheck.push({
            day: item.dayOfWeek,
            lesson: [item.startTime, item.numberOfPeriod],
          })
          isExist = 1;
        }
      })
      isExist == 0 && skipCheck.filter((skipItem) => condition > skipItem.lesson[0] && condition < skipItem.lesson[1] + skipItem.lesson[0] && skipItem.day === i).length === 0 && b.push(null);
    }
    return b;
  }

  const getSaturdayOfWeek = (day: Date) => {
    const dayOfWeek = day.getDay()
    return new Date(day.getTime() + ((6 - dayOfWeek) * 60 * 60 * 24 * 1000))
  }

  const getSundayOfWeek = (day: Date) => {
    const dayOfWeek = day.getDay()
    return new Date(day.getTime() - (dayOfWeek * 60 * 60 * 24 * 1000))
  }

  const scheduleFilter = () => {
    const a = []
    const skipCheck: skipping[] = []
    for (var i = 1; i <= 16; i++) {
      a.push({
        time: i,
        lessons: scheduleSort(i, skipCheck),
      })
    }
    return a;
  }

  const now = new Date()

  const [firstDayOfWeek, setFirstDayOfWeek] = useState(getSundayOfWeek(new Date()))

  const tableHeader = [null, 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  const getWeekLesson = scheduleFilter();

  const getDayByIndex = (index: number) => {
    const sunday = getSundayOfWeek(firstDayOfWeek)
    const dayByIndex = new Date(sunday.getTime() + index * 60 * 60 * 24 * 1000)
    return `${dayByIndex.getDate()}/${dayByIndex.getMonth() + 1}/${dayByIndex.getFullYear()}`
  }

  return (
    <Box sx={{
      display: 'flex',
      overflow: 'hidden'
    }}>
      <ResponsiveSideBar />
      <ResponsiveAppBar>
        <Box sx={{
          width: '100%',
          background: StyleVar.white,
          height: '50px',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: '0 20px',
          gap: '20px',
        }}>
          <Button sx={{
            border: `1px solid ${StyleVar.heavyBlue}`,
            fontWeight: 600,
            fontFamily: 'monospace',
            ":active": {
              background: StyleVar.heavyBlue,
              color: StyleVar.lightWhite,
            }
          }} onClick={() => setFirstDayOfWeek(new Date())}>Present</Button>
          <IconButton onClick={() => setFirstDayOfWeek(new Date(firstDayOfWeek.getTime() - 60 * 60 * 24 * 1000 * 7))}>
            <KeyboardArrowLeftIcon />
          </IconButton>
          <IconButton onClick={() => setFirstDayOfWeek(new Date(firstDayOfWeek.getTime() + 60 * 60 * 24 * 1000 * 7))}>
            <KeyboardArrowRightIcon />
          </IconButton>
        </Box>
        <TableContainer>
          <Table sx={{
            background: StyleVar.tableTheme,
          }}>
            <TableHead>
              <TableRow>
                {tableHeader.map((header, index) => (
                  <TableCell width={200} align="center" key={index} sx={{
                    border: `1px solid ${StyleVar.tableBorder}`
                  }}>
                    <Box>{header}</Box>
                    <Box>{index !== 0 && getDayByIndex(index - 1)}</Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {getWeekLesson.map((timeLessons, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell align="center" sx={{
                      border: `1px solid ${StyleVar.tableBorder}`,
                    }}>
                      {timeLessons.time}
                    </TableCell>
                    {timeLessons.lessons.map((lesson, index) => (
                      <TableCell sx={{
                        background: '#fff',
                        border: '1px solid #f4f4f7',
                      }} key={index} rowSpan={lesson?.numberOfPeriod}>
                        <Box sx={lesson && {
                          background: '#dfddf7',
                          height: lesson.numberOfPeriod * 45 + 'px',
                          padding: '5px 15px',
                          border: '1px solid #babbc4',
                          borderRadius: '5px',
                          position: 'relative',
                          ":before": {
                            content: '""',
                            height: 'calc(100% - 10px)',
                            width: '5px',
                            left: '4px',
                            position: 'absolute',
                            background: '#fff',
                            borderRadius: '2px',
                          }
                        }}>{lesson?.name}</Box>
                      </TableCell>
                    ))}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </ResponsiveAppBar>
    </Box>
  )
}

export default Schedule