import { Container, Heading, VStack,Box,Input,FormLabel,Button, Textarea } from '@chakra-ui/react'
import React,{useState} from 'react'
import { Link } from 'react-router-dom'

const Request = () => {
    const [name,setname]=useState("")
    const [email,setemail]=useState("")
const[course,setcourse]=useState("")
  return (
  <Container h="92vh" >
<VStack h="full" justifyContent={"center"} spacing="16">
    <Heading children="Requets new course "></Heading>
    <form  style={{width:"100%"}} >
    <Box my={"4"} >
 <FormLabel htmlFor='name ' children="Name"  ></FormLabel>
  <Input required id='name' value={name}  onChange={(e)=>setname(e.target.value)} placeholder="abc@gmail.com" type={"text"}  focusBorderColor='yellow.500'/>
 </Box>
 <Box my={"4"} >
 <FormLabel htmlFor='email ' children="Email Address"  ></FormLabel>
  <Input required id='email' value={email}  onChange={(e)=>setemail(e.target.value)} placeholder="abc@gmail.com" type={"email"}  focusBorderColor='yellow.500'/>
 </Box>
  
 <Box my={"4"} >
 <FormLabel htmlFor='course ' children="course"  ></FormLabel>
  <Textarea required id='course' value={course}  onChange={(e)=>setcourse(e.target.value)} placeholder="explain the course.." type={"password"}  focusBorderColor='yellow.500'/>
 </Box>
 

 <Button my="4" colorScheme={"yellow"} type="submit">
Send email
 </Button>
 <Box my="4" >
see available course!{" "}<Link to="/courses"><Button colorScheme={"yellow"} variant="link" >Click</Button>{" "}here</Link>
</Box>
    </form> 
</VStack>
  </Container>
  )
}

export default Request