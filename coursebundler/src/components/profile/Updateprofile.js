import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMyProfile } from '../../redux/actions/userAction'
import { updateProfile } from '../../redux/actions/userProfile'

const Updateprofile = () => {


const navigate=useNavigate()

const {name,email}=useSelector(state=>state.users.user)
const dispatch=useDispatch()

    const [name1,setname]=useState(name)
    const [email1,setemail]=useState(email)

const submitHandler=async(e)=>{
  e.preventDefault()
    await dispatch(updateProfile(name1,email1))
    dispatch(getMyProfile())
    navigate("/profile")

}


const {loading}=useSelector(state=>state.profile)

  return (
    <Container py="16" minH={"90vh"}  >
    <form  onSubmit={submitHandler} >
        <Heading textTransform={"uppercase"}  children="update profile" my={"16"} textAlign={["center","left"]}/>
    <VStack spacing={"8"}>
    <Input 
     id='name'
     value={name1} 
     onChange={(e)=>setname(e.target.value)}
     placeholder=" Name"
     type={"text"} 
   focusBorderColor='yellow.500'/>
    <Input required id='email' value={email1}  onChange={(e)=>setemail(e.target.value)} placeholder="abc@gmail.com" type={"email"}  focusBorderColor='yellow.500'/>
    <Button isLoading={loading}   w="full"  colorScheme={"yellow"} type="submit"  >
    change
    </Button>
    
    </VStack>
    
    </form>
       </Container>
  )
}

export default Updateprofile