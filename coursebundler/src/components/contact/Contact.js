import { Container, Heading, VStack,Box,Input,FormLabel,Button, Textarea } from '@chakra-ui/react'
import React,{useState} from 'react'
import { Link } from 'react-router-dom'

const Contact = () => {
    const [name,setname]=useState("")
    const [email,setemail]=useState("")
const[message,setmessage]=useState("")
  return (
  <Container h="92vh" >
<VStack h="full" justifyContent={"center"} spacing="16">
    <Heading children="contact us "></Heading>
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
 <FormLabel htmlFor='message ' children="message"  ></FormLabel>
  <Textarea required id='message' value={message}  onChange={(e)=>setmessage(e.target.value)} placeholder="enter your message" type={"password"}  focusBorderColor='yellow.500'/>
 </Box>
 

 <Button my="4" colorScheme={"yellow"} type="submit">
Send email
 </Button>
 <Box my="4" >
Request for a course?{" "}<Link to="/request"><Button colorScheme={"yellow"} variant="link" >Click</Button>{" "}here</Link>
</Box>
    </form> 
</VStack>
  </Container>
  )
}

export default Contact