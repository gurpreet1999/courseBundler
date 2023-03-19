import { Button, Container, Heading, VStack,Input} from '@chakra-ui/react'
import React,{useEffect, useState} from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { forgetPassword } from '../../redux/actions/userProfile'

const Forgetpassword = () => {

const {loading,message,error}=useSelector(state=>state.profile)

    const [email,setemail]=useState("")
const dispatch=useDispatch()
const submitHandler=(e)=>{
e.preventDefault()
dispatch(forgetPassword(email))
}

useEffect(()=>{
    console.log("jdhdhjdhdjb")
    if(error){
      toast.error(error)
      dispatch({type:"clearError"})
    }
    if(message){
      toast.success(message)
      dispatch({type:"clearMessage"})
    }
    },[dispatch,error,message])

    
  return (
   <Container  padding={"16"} h="90vh"> 
    <form onSubmit={submitHandler} >
        <Heading  my="16" textTransform={"uppercase"} textAlign={["center","left"]}  children="Forget passowrd"/>
    <VStack spacing={"8"} >
    <Input required id='email' value={email}  onChange={(e)=>setemail(e.target.value)} placeholder="abc@gmail.com" type={"email"}  focusBorderColor='yellow.500'/>
       
       
<Button isLoading={loading}   type='submit' w={"full"} colorScheme="yellow">Send Reset Link</Button>

        </VStack>
    
    </form>
   </Container>
  )
}

export default Forgetpassword