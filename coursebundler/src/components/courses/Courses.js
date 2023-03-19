import { Button, Container, Heading, HStack, Input, Stack, Text, VStack ,Image} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllCourses } from '../../redux/actions/CourseAction'
import { getMyProfile } from '../../redux/actions/userAction'
import { addtoplaylist } from '../../redux/actions/userProfile'

const Course=({views,title,imageSrc,id,addToPlaylistHandler,creator,description,lecture,loading})=>{
  return (
<VStack className='course' alignItems={["center","flex-start"]} >

<Image src={imageSrc} boxSize="60"  objectFit={"contain"}  />
<Heading textAlign={["center" , "left"]}  maxW="200px" fontFamily={"sans-serif"} noOfLines={3} children={title} size={"sm"}  ></Heading>
<Text children={description} noOfLines={2} />
<HStack>
<Text children={"creator"} textTransform="uppercase" fontWeight={'bold'} />
<Text children={creator} textTransform="uppercase" fontFamily={"body"} />
</HStack>


<Heading textAlign={"center"} size="xs" children={`lecture - ${lecture}`} textTransform="uppercases" ></Heading>
<Heading  size="xs" children={`views - ${views}`} textTransform="uppercases" ></Heading>
<Stack direction={["column","row"]} alignItems="center" >
  <Link to={`/course/${id}`} >
    <Button colorScheme={"yellow"}  >watch now</Button>
  </Link>
  <Button isLoading={loading}  variant={"ghost"}   colorScheme={"yellow"} onClick={()=>{addToPlaylistHandler(id)}} >Add to playlist</Button>
</Stack> 
</VStack>
  )
}




const Courses = () => {


const dispatch=useDispatch()

 const [keyword,setkeyword]=useState("")
 const [category , setcategory]=useState("")
 const {courses,loading,error}=useSelector(state=>state.courses)
useEffect(()=>{
dispatch(getAllCourses(category,keyword))


if(error){
  toast.error(error)
  dispatch({type:"clearError"})
}
if(message){
  toast.success(message)
  dispatch({type:"clearMessage"})
}


},[keyword,category,dispatch,error,message])


const categories=[
    "web development" , "Artificial Intelligence","Data Structure & Algorithm", "App Development" ,"Data Science", "Game Development" 
]

const addToPlaylistHandler=async(id)=>{
 await dispatch(addtoplaylist(id))
 dispatch(getMyProfile())
}
  return (
   <Container minH={'95vh'} maxW="container.lg" padding={"8"}   >
<Heading children="All Courses" margin={"8"}></Heading>
<Input value={keyword} onChange={(e)=>setkeyword(e.target.value)} placeholder="search a course..." type="text"   focusBorderColor='yellow.500' ></Input>
   
   
   <HStack  overflowX={"auto"} paddingY="8" css={{"&::-webkit-scrollbar":{
    display:"none"
   }}} >
   {
    categories.map((item,i)=>{
       return  <Button key={i} onClick={()=>{setcategory(item)}}   minW={"60"}  >
        <Text children={item}/>
    </Button>
    })
   }
   </HStack>


   <Stack direction={["column","row"]} flexWrap="wrap" justifyContent={["flex-start","space-evenly"]} alignItems={["center","flex-start"]}  >
    

    {courses.length>0?(


     courses &&  courses.map((item)=>(
      <Course 
      key={item._id}
      title={item.title} 
      description={item.description}
      views={item.views}
      imageSrc={item.poster.url}
      id={item._id}
      creator={item.createdby}
      lecture={item.numofvideo}
      addToPlaylistHandler={addToPlaylistHandler}
      loading={loading}
  
        />
      ))):(<Heading opacity={0.5} mt="4"  children="courses not found"/>)

      
    }

   </Stack>
   
   
   
   </Container>
  )
}

export default Courses