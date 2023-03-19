import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import {useDispatch, useSelector} from "react-redux"
import { buySubscription } from '../../redux/actions/userAction'
import { userReducer } from '../../redux/reducer/UserReducer'

const Subscribe = ({user}) => {

const {loading,error,subscriptionId}=useSelector(state=>state.subscription)
const {error:courseerror}=useSelector(state=>state.courses)
const dispatch=useDispatch()
const[key,setkey]=useState("")


const subscribehandler=async()=>{
const {data:{key}}=   await axios.get(`http://localhost:4000/api/v1/razorpaykey`)
setkey(key)


dispatch(buySubscription())
}



useEffect(()=>{
    if(error){
        toast.error(error)
        dispatch({type:"clearError"})
      }
      if(courseerror){
        toast.error(courseerror)
        dispatch({type:"clearError"})
      }
      if(subscriptionId){
        const openup=()=>{
       const options={
        key,
        name:"coursebundler",
        description:"get access to all premium content"
        ,image:"ok",
        subscription_id:subscriptionId,
        callback_url:`http://localhost:4000/api/v1/paymentverification`,
        prefill:{
            name:user.name,
            email:user.email,
            contact:""
        },
        notes:{
            address:"6 pack programmer at youtube"
        },
        theme:{
            color:"#FFC800"
        }
       }
       const razor=new window.razorpay(options)
       razor.open()
        }
        openup()
        toast.success(message)
        dispatch({type:"clearMessage"})
      }
},[dispatch,error,user.name,user.email,key,subscriptionId,courseerror]
)


  return (
   <Container h="90vh" p="16"  >
<Heading children="welcome" my="8"  textAlign={"center"}>

</Heading>
<VStack boxShadow={"lg"} alignItems="stretch" borderRadius={"lg"} spacing="0" >

<Box bg="yellow.400" p="4" css={{borderRadius:"8px 8px 0 0"}} >
    <Text color={"black"}   children={`pro pack-299.00`}  />

</Box>
<Box p="4"   >
<VStack textAlign={"center"}  px="8" mt="4" spacing={"8"}  >
    <Text color={"black"} children="join pro pack and get access to all content"  />
    <Heading size={"md"} children="299 only"  />
</VStack>

<Button isLoading={loading}    my="8" w="full" colorScheme={"yellow"} onClick={subscribehandler}  >
    Buy Now
</Button>
</Box>


<Box bg={"blackAlpha.600"} p="4" CSS={{borderRadius:" 0 0 8px 8px"}}>
<Heading color={"white"} textTransform="uppercase"  size={"sm"} children="100% refund at cancellation"  />
<Text fontSize={"xs"} color="white" children={"* term and conditions apply"} />
</Box>



</VStack>



   </Container>
  )
}

export default Subscribe