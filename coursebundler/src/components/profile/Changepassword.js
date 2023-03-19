import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { changePassword } from '../../redux/actions/userProfile'
const Changepassword = () => {
  const dispatch=useDispatch()
const[oldpassword,setoldpassword]=useState("")
const[newpassword,setnewpassword]=useState("")

const submitHandler=(e)=>{
  e.preventDefault()
  dispatch(changePassword(oldpassword,newpassword))
}
const {loading,message,error}=useSelector(state=>state.profile)

useEffect(()=>{
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
   <Container py="16" minH={"90vh"}  >
<form onSubmit={submitHandler} >
    <Heading textTransform={"uppercase"}  children="change password" my={"16"} textAlign={["center","left"]}/>
<VStack spacing={"8"}>
<Input required id='oldpassword' value={oldpassword}  onChange={(e)=>setoldpassword(e.target.value)} placeholder=" old password" type={"password"}  focusBorderColor='yellow.500'/>
<Input required id='newpassword' value={newpassword}  onChange={(e)=>setnewpassword(e.target.value)} placeholder=" new password" type={"password"}  focusBorderColor='yellow.500'/>
<Button  isLoading={loading}  w="full"  colorScheme={"yellow"} type="submit"  >
change
</Button>

</VStack>

</form>
   </Container>
  )
}

export default Changepassword