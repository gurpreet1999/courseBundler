import { Avatar, Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { registerUser } from '../../redux/actions/userAction'





export const fileuploadscss={
    cursor:"pointer",
    marginLeft:"-5%",
    width:"110%",
    border:"none"
    ,
    height:"100%",
    color:"#ECC94B",
    backgroundColor:"white"
}


const fileuploadstyle={
    "&::file-selector-button":fileuploadscss

    
}


const Register = () => {

    const [email,setemail]=useState("")
    const [name,setname]=useState("")
    const[password,setpassword]=useState("")
    const [image,setimage]=useState("")
    const[imagepreview,setimagepreview]=useState("")

const dispatch=useDispatch()

const changeimagehandler=(e)=>{
    const file=e.target.files[0];
    const reader=new FileReader()
    reader.readAsDataURL(file)

    reader.onloadend=()=>{
        setimagepreview(reader.result)
        setimage(file)
    }
}













const submitHandler=(e)=>{

    e.preventDefault()
    let myform=new FormData()
    myform.append("name",name)
    myform.append("email",email)
    myform.append("password",password)
    myform.append("file",image)
    
    dispatch(registerUser(myform))
    console.log(myform)
    }
    




  return (
   <Container h={"95vh"} >
<VStack h={"full"} justifyContent="center" spacing={"16"}>
    <Heading textTransform={"uppercase"}  children="Registration"/>
    <form  onSubmit={submitHandler}          style={{width:"100%"}} >

<Box my="4" display={"flex"} justifyContent="center" >
<Avatar src={imagepreview}  size={"2xl"}/>
</Box>

    <Box my={"4"} >
 <FormLabel htmlFor='name ' children="Name"  ></FormLabel>
  <Input required id='name' value={name}  onChange={(e)=>setname(e.target.value)} placeholder="abc@gmail.com" type={"text"}  focusBorderColor='yellow.500'/>
 </Box>
 <Box my={"4"} >
 <FormLabel htmlFor='email ' children="Email Address"  ></FormLabel>
  <Input required id='email' value={email}  onChange={(e)=>setemail(e.target.value)} placeholder="abc@gmail.com" type={"email"}  focusBorderColor='yellow.500'/>
 </Box>
  
 <Box my={"4"} >
 <FormLabel htmlFor='password ' children="password"  ></FormLabel>
  <Input required id='password' value={password}  onChange={(e)=>setpassword(e.target.value)} placeholder="enter your password" type={"password"}  focusBorderColor='yellow.500'/>
 </Box>
 <Box my={"4"} >
 <FormLabel htmlFor='Chooseavatar ' children="Choose Avatar "  ></FormLabel>
  <Input  css={fileuploadstyle} onChange={changeimagehandler}   accept='image/*'  required id='Chooseavatar ' type={"file"}  focusBorderColor='yellow.500'/>
 </Box>
  
<Button my="4" colorScheme={"yellow"} type="submit" >Sign Up</Button>

<Box my="4" >
Already Sign Up?{" "}<Link to="/login"><Button colorScheme={"yellow"} variant="link" >Login </Button>{" "}here</Link>
</Box>
</form> 
   
</VStack>

   </Container>
  )
}

export default Register