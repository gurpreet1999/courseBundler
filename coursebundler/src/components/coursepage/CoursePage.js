import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCourseLecture } from '../../redux/actions/CourseAction'
import { Navigate, useParams } from 'react-router-dom'
import Loader from  "../layout/loader"
const CoursePage = ({user}) => {

const param=useParams()
const [lecturenumber,setlecturenumber]=useState(0)

const {lectures,loading}=useSelector(state=>state.courses)


const dispatch=useDispatch()

useEffect(()=>{
dispatch(getCourseLecture(param.id))
},[dispatch,param.id])


if(user.role!=="admin"  && (user.subscription===undefined || user.subscription.status!=="active") ){
 return   <Navigate to={"/subscribe"}/>
}

  return (
    <>
  {
    loading?(<Loader/>):(
        <Grid minH={"90vh"} templateColumns={["1fr","3fr 1fr"]}  >
        <Box>
        <video src={lectures[lecturenumber].video.url} width={"100%"}  autoPlay controls   controlsList='nodownload noremoteplayback'
        disablePictureInPicture
        disableRemotePlayback
        > 
        
        </video>
        
        <Heading m="4"   children={`#${lecturenumber+1} ${lectures[lecturenumber].title} `} ></Heading>
        <Heading m="4"   children="Description"  >
        
        
        </Heading>
        <Text m="4"  >{lectures[lecturenumber].description}</Text>
        
        </Box>
        
        <VStack>
            {
                lectures.map((item,index)=>{
                    return <button onClick={()=>setlecturenumber(index)}   key={item._id} style={{width:"100%",padding:"1rem",  textAlign:"center", margin:"0",borderBottom:"1px solid rgba(0,0,0,0.2) "}}  >
                        <Text noOfLines={1} >
                            #{index+1} {item.title}
                        </Text>
                    </button>
                })
            }
        </VStack>
        
        
           </Grid>
    )
  }
  </>
  )
}

export default CoursePage