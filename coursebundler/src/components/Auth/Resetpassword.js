import { Button, Container, Heading, VStack,Input} from '@chakra-ui/react'
import React,{useEffect, useState} from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { resetPassword } from '../../redux/actions/userProfile'

const Resetpassword = () => {


    const navigate=useNavigate()

const dispatch=useDispatch()
    const params=useParams()
    const {loading,message,error}=useSelector(state=>state.profile)
    const [password,setpassword]=useState("")
    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(resetPassword(params.token,password))
        }
        console.log(params)
        useEffect(()=>{
          
            if(error){
              toast.error(error)
              dispatch({type:"clearError"})
            }
            if(message){
              toast.success(message)
              dispatch({type:"clearMessage"})
              navigate("/login")
            }
            },[dispatch,error,message])
        









  return (
   <Container  padding={"16"} h="90vh"> 
    <form onSubmit={submitHandler}  >
        <Heading  my="16" textTransform={"uppercase"} textAlign={["center","left"]}  children="Reset passowrd"/>
    <VStack spacing={"8"} >
    <Input required id='email' value={password}  onChange={(e)=>setpassword(e.target.value)} placeholder="enter new password" type={"password"}  focusBorderColor='yellow.500'/>
       
       
<Button  isLoading={loading}  type='submit' w={"full"} colorScheme="yellow">Reset Passowrd</Button>

        </VStack>
    
    </form>
   </Container>
  )
}

export default Resetpassword