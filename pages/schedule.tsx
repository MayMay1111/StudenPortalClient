import { List, ListItem, ListItemText, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import Box from "@mui/material/Box"
import react,{useState} from 'react'
import * as StyleVar from '../components/Style'

interface lessonInterface {
  name:string,
  classId:string,
  startFrom:Date,
  dayOfWeek:number,
  numberOfPeriod:number,
  startTime:number,
}

interface skipping {
  day:number,
  lesson:number[],
}

const WeekLesson:lessonInterface[] = [
    {
        name:'Cau truc roi rac',
        classId:'40123545682',
        startFrom:new Date(17,2,2023),
        dayOfWeek:3,
        numberOfPeriod:2,
        startTime:7,
    },
    {
      name:'Co so du lieu',
      classId:'40123545681',
      startFrom:new Date(17,2,2023),
      dayOfWeek:3,
      numberOfPeriod:3,
      startTime:10,
    }
]

const scheduleSort = (condition:number, skipCheck:skipping[]) => {
  let getLesson = WeekLesson.filter((lesson) => lesson.startTime===condition)
  let b:(lessonInterface | null)[]= [];
  for(var i = 0; i < 7; i++){
    let isExist = 0;
    getLesson.map((item) => {
      if(item.dayOfWeek === i){
        b.push(item);
        skipCheck.push({
          day:item.dayOfWeek,
          lesson:[item.startTime,item.numberOfPeriod],
        })
        isExist=1;
      }
    })
    isExist==0 && skipCheck.filter((skipItem) => condition > skipItem.lesson[0] && condition < skipItem.lesson[1] + skipItem.lesson[0] && skipItem.day === i).length === 0 && b.push(null);
  }
  return b;
}

const scheduleFilter = () => {
  const a = []
  const skipCheck:skipping[] = []
  for(var i = 1; i <= 16; i++){
    a.push({
      time:i,
      lessons:scheduleSort(i,skipCheck),
    })
  }
  return a;
}

const Schedule = () => {
  const now = new Date();

  const [weekDay, setWeekDay] = useState(now)

  const tableHeader = [null,'Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  const PreDay = new Date(now.getTime() - 60*60*24*1000)

  const getWeekLesson = scheduleFilter();

  const getSundayOfWeek = (day:Date) => {
    const dayOfWeek = day.getDay()
    return new Date(day.getTime() - (dayOfWeek*60*60*24*1000))
  }

  const getDayByIndex = (index:number) => {
    const sunday = getSundayOfWeek(weekDay)
    const dayByIndex = new Date(sunday.getTime() + index*60*60*24*1000)
    return `${dayByIndex.getDate()}/${dayByIndex.getMonth()}/${dayByIndex.getFullYear()}`
  }

    return (
        <>
          <Box sx={{
            width:'100%',
            background:StyleVar.white,
            height:'50px'
          }}>
            Ok
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {tableHeader.map((header, index) => (
                    <TableCell width={200} align="center" key={index}>
                      <Box>{header}</Box>
                      <Box>{index!==0 && getDayByIndex(index-1)}</Box>
                      </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {getWeekLesson.map((timeLesson, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell  align="center">
                        {timeLesson.time}
                      </TableCell>
                      {timeLesson.lessons.map((lesson,index) => (
                        <TableCell sx={{
                          background:'#fff',
                        }} key={index} rowSpan={lesson?.numberOfPeriod}>
                          <Box sx={lesson && {
                            background:StyleVar.lightWhite,
                            height:lesson.numberOfPeriod * 45 + 'px',
                            padding:'5px 15px',
                            borderRadius:'5px',
                            position:'relative',
                            ":before":{
                              content:'""',
                              height: 'calc(100% - 10px)',
                              width: '5px',
                              left:'4px',
                              position:'absolute',
                              background:'orange',
                              borderRadius:'2px',
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
        </>
    )
}

export default Schedule