import { Box, Button, Grid, Heading, HStack, Image, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import cursor from "../../../assets/images/cursor.png"
import { addLecture, deleteCourse, deleteLecture } from '../../../redux/actions/adminAction'
import { getAllCourses, getCourseLecture } from '../../../redux/actions/CourseAction'

import Sidebar from '../Sidebar'
import CourseModal from './CourseModal'

const AdminCourses = () => {


  const[courseeid,setcourseeid]=useState()
  
  const[courseetitle,setcourseetitle]=useState()
  const dispatch=useDispatch()

const {courses,lectures,}=useSelector(state=>state.courses)
const {loading,error,message}=useSelector(state=>state.admin)

const {isOpen,onClose,onOpen}=useDisclosure()


const courseDetailHandler=(courseId,title)=>{
  dispatch(getCourseLecture(courseId))
onOpen()
setcourseeid(courseId)
setcourseetitle(title)
}



const deletebuttonhandler=(courseId)=>{
dispatch(deleteCourse(courseId))
}



const deleteLectureButtonHandler=async(courseid,lectureid)=>{
 await  dispatch(deleteLecture(courseid,lectureid))
dispatch(getCourseLecture(courseid))
}


const addLectureHandler=async(e,courseid,title,description,video)=>{
e.preventDefault()
let myform=new FormData()
myform.append("title",title)
myform.append("description",description)

myform.append("file",video)
await dispatch(addLecture(courseid,myform))
dispatch(getCourseLecture(courseid))

}


useEffect(()=>{
  if(error){
    toast.error(error)
    dispatch({type:"clearError"})
  }
  if(message){
    toast.success(message)
    dispatch({type:"clearMessage"})
  }


dispatch(getAllCourses())
},[dispatch,error,message])

  return (
    <Grid css={{cursor:`url(${cursor}),default`}}   minH={'100vh'} templateColumns={["1fr","5fr 1fr"]} >
    <Box p={["0","8"]} overflowX="auto">
      <Heading children="all courses" my="16" textTransform={"uppercase"} textAlign={["center","left"]} />
    
<TableContainer w={["100vw","full"]} >
<Table variant={"simple" } size="lg">
<TableCaption>
  all available courses in the database
</TableCaption>
<Thead>
  <Tr>
    <Th>Id</Th>
    <Th>poster</Th>
    <Th>title</Th>
    <Th>category</Th>
    <Th>creator</Th>
    <Th isNumeric >views</Th>
    <Th isNumeric >Lectures</Th>
    <Th isNumeric >action</Th>


  </Tr>
</Thead>

<Tbody>
{
 courses.map((item)=>{
    
    return <Row loading={loading} deletebuttonhandler={deletebuttonhandler}  courseDetailHandler={courseDetailHandler}   key={item._id}   item={item} ></Row>
})
}
</Tbody>


</Table>
</TableContainer>

<CourseModal   loading={loading} lectures={lectures}   isOpen={isOpen} onClose={onClose} id={courseeid} courseTitle={courseetitle}  addLectureHandler={addLectureHandler}    deleteButtonHandler={deleteLectureButtonHandler} />
    </Box>
    
    <Sidebar/>
       </Grid>
  )
}




function Row({item,courseDetailHandler,deletebuttonhandler,loading}){
  return (

<Tr>
  <Td>
#{item._id}
  </Td>
  <Td>
<Image src={item.poster.url}  />
  </Td>
  <Td>
#{item.title}
  </Td>

  <Td  textTransform={"uppercase"} >
{item.category}
  </Td>
  <Td>
{item.createdby}
  </Td>
 
  <Td isNumeric  >
{item.views}
  </Td>
  <Td isNumeric >
{item.numOfvideo}
  </Td>





  <Td isNumeric >
   <HStack justifyContent={"flex-end"} >
    <Button onClick={()=>courseDetailHandler(item._id,item.title)}   variant={"outline"} color="purple.500"  >view lecture</Button>
<Button   onClick={()=>deletebuttonhandler(item._id)}   color="purple.600"  isLoading={loading} >
  <RiDeleteBin7Fill/>
</Button>

   </HStack>
  </Td>
</Tr>

  )
}
export default AdminCourses