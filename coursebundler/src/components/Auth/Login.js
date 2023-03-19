import { Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch} from "react-redux"
import { login } from '../../redux/actions/userAction'

const Login = () => {
const [email,setemail]=useState("")
const[password,setpassword]=useState("")


const dispath=useDispatch()

const submithandler=(e)=>{
e.preventDefault()
dispath(login(email,password))



}





  return (
   <Container h={"95vh"} >
<VStack h={"full"} justifyContent="center" spacing={"16"}>
    <Heading children="welcome to CourseBundler"/>
    <form  onSubmit={submithandler}    style={{width:"100%"}} >
 <Box my={"4"} >
 <FormLabel htmlFor='email ' children="Email Address"  ></FormLabel>
  <Input required id='email' value={email}  onChange={(e)=>setemail(e.target.value)} placeholder="abc@gmail.com" type={"email"}  focusBorderColor='yellow.500'/>
 </Box>
  
 <Box my={"4"} >
 <FormLabel htmlFor='password ' children="password"  ></FormLabel>
  <Input required id='password' value={password}  onChange={(e)=>setpassword(e.target.value)} placeholder="enter your password" type={"password"}  focusBorderColor='yellow.500'/>
 </Box>
  <Box>
    <Link to="/forgetpassword"><Button fontSize={"sm"} variant="link"  >Forget Password</Button></Link>
  </Box>
<Button my="4" colorScheme={"yellow"} type="submit" >Login</Button>
<Box my="4" >
New User?{" "}<Link to="/reister"><Button colorScheme={"yellow"} variant="link" >Sign up</Button>{" "}here</Link>
</Box>
    </form> 
</VStack>

   </Container>
  )
}

export default Login