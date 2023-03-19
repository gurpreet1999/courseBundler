
import { Box, Button, Container, Grid, Heading, Image, Input, Select, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import cursor from "../../../assets/images/cursor.png"
import Sidebar from '../Sidebar'

import { fileuploadscss } from '../../Auth/Register'
import { useDispatch, useSelector } from 'react-redux'
import { CreateCourse } from '../../../redux/actions/adminAction'
import { toast } from 'react-hot-toast'

const Createcourse = () => {
const [ title,settitle]=useState("")
const [ description,setdescription]=useState("")



const [ createdby,setcreatedby]=useState("")
const [ category,setcategory]=useState("")
const [image,setimage]=useState("")
const [ imageprev,setimageprev]=useState("")


const categories=[
  "web development" , "Artificial Intelligence","Data Structure & Algorithm", "App Development" ,"Data Science", "Game Development" 
]
const changeimagehandler=(e)=>{
  const file=e.target.files[0];
  const reader=new FileReader()
  reader.readAsDataURL(file)

  reader.onloadend=()=>{
      setimageprev(reader.result)
      setimage(file)
  }
}
const {loading,message,error}=useSelector(state=>state.admin)
const dispatch=useDispatch()
const createcourseHandler=(e)=>{
e.preventDefault()

let myform=new FormData()
myform.append("title",title)
myform.append("description",description)
myform.append("category",category)
myform.append("createdby",createdby)
myform.append("file",image)

dispatch(CreateCourse(myform))




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
  
},[error,message])


  return (
    <Grid css={{cursor:`url(${cursor}),default`}}   minH={'100vh'} templateColumns={["1fr","5fr 1fr"]} >
    <Container py="16"  >
<form  onSubmit={createcourseHandler} >
<Heading textTransform={"uppercase"} children="create courses" my="16" textAlign={["center","left"]} />
<VStack m="auto" spacing={"8"} >
<Input 
     id='title'
     value={title} 
     onChange={(e)=>settitle(e.target.value)}
     placeholder="title"
     type={"text"} 
   focusBorderColor='purple.300'/>
   <Input 
     id='description'
     value={description} 
     onChange={(e)=>setdescription(e.target.value)}
     placeholder="description"
     type={"text"} 
   focusBorderColor='purple.300'/>
   
   <Input 
     id='createdby'
     value={createdby} 
     onChange={(e)=>setcreatedby(e.target.value)}
     placeholder="title"
     type={"text"} 
   focusBorderColor='purple.300'/>
<Select  focusBorderColor='purple.300' value={category} onChange={(e)=>setcategory(e.target.value)}  >
<option value={""}>Category</option>
{categories.map((item)=>(
  <option key={item}
  value={item}>{item}</option>
))}

</Select>
<Input  css={{
   "&::file-selector-button":{
    ...fileuploadscss,color:"purple"
   }
}} onChange={changeimagehandler}   accept='image/*'  required   type={"file"}  focusBorderColor='purple.500'/>


{imageprev && (
<Image src={imageprev} boxSize="64" objectFit={"contain"} />
)}
<Button isLoading={loading}  w="full" colorScheme={"purple"} type="submit">create</Button>

</VStack>
</form>
    </Container>
    
    <Sidebar/>
       </Grid>
  )
}

export default Createcourse