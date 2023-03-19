import React, { useEffect, useState } from 'react'
import {Avatar, Button, Container, Heading, HStack, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure, VStack} from "@chakra-ui/react"
import { Link } from 'react-router-dom'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import { fileuploadscss } from '../Auth/Register'
import { updateProfilePic } from '../../redux/actions/userProfile'
import { useDispatch, useSelector } from 'react-redux'
import { cancelSubscription, getMyProfile } from '../../redux/actions/userAction'
import { toast } from 'react-hot-toast'
import { removefromplaylist } from '../../redux/actions/userProfile'

const Profile = ({user}) => {


const {loading,message,error}=useSelector(state=>state.profile)
const {loading:subscriptionloading,message:subscriptionmessage,error:subscriptionerror}=useSelector(state=>state.subscription)

const dispatch=useDispatch()


const RemoveFromPlaylist=async(id)=>{
await dispatch( removefromplaylist)
dispatch(getMyProfile())
}
const {isOpen,onClose,onOpen}=useDisclosure()
const changeImageSubmitHandler=async(e,image)=>{
    e.preventDefault()
    console.log(image)
  let myform=new FormData()
         myform.append("file",image)
        await dispatch(updateProfilePic(myform))
     
         dispatch(getMyProfile())
         onClose()
}

const cancelHandler=()=>{
    dispatch(cancelSubscription())
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
    if(subscriptionerror){
        toast.error(subscriptionerror)
        dispatch({type:"clearError"})
    }  
    if(subscriptionmessage){
        toast.success(subscriptionmessage)
        dispatch({type:"clearMessage"})
        dispatch(getMyProfile())
    } 
 },[dispatch,error,message,subscriptionerror,subscriptionmessage])
    



  return (
  <Container minH={"95vh"} maxW={"container.lg"} py="8" >
<Heading children="profile" m="8" textTransform={"uppercase"}  >

</Heading>
<Stack padding={"8"}   justifyContent={"flex-start"} direction={["column","row"]} alignItems={"center"} spacing={["8","16"]}  >
<VStack>
    <Avatar boxSize={"48"} src={user.avatar.url}  />
    <Button   colorScheme={"yellow"} variant="ghost"   onClick={onOpen} >
Change photo
    </Button>
</VStack>

<VStack  spacing={"4"} alignItems={["center" ,"flex-start"]}>
    <HStack>
        <Text fontWeight={"bold"}  >
Name
        </Text>
        <Text  >
{user.name}
        </Text>
    </HStack>{" "}

    <HStack>
        <Text fontWeight={"bold"}  >
Email
        </Text>
        <Text  >
{user.email}
        </Text>
    </HStack>

    <HStack>
        <Text fontWeight={"bold"}  >
created at
        </Text>
        <Text  >
{user.createdAt.split("T")[0]}
        </Text>
    </HStack>

    {
        user.role!=="admin" && <HStack>
<Text fontWeight={"bold"} >
    subscription
</Text>

{

 user.subscription &&   user.subscription.status==="active"?(
    <Button isLoading={subscriptionloading}  color={"yellow.500"}  onClick={cancelHandler}   >cancel subscription</Button>
):(
    <Link to={"/subscribe"} >
        <Button colorScheme={"yellow"} >Subscribe </Button>
    </Link>
)
}
        </HStack>
    }


    <Stack direction={["column","row"]} alignItems={"center"}   >
<Link to={"/updateprofile"}  >
    <Button>
        update profile
    </Button>
 </Link>
 <Link to={"/changepassword"}  >
    <Button>
    Change Password
    </Button>
 </Link>
    </Stack>


</VStack>
</Stack>

<Heading children="Playlist"  size={"md"} my="8" />


{
    user.playlist.length>0 && (
        <Stack direction={["column","row"]} alignItems={"center"} flexWrap="wrap" p="4" >
{
user.playlist.map((item,index)=>{
    return <VStack w="48" m="2" key={item.course} > 
    <Image boxSize={"full"} objectFit="contain" src={item.poster}/>
<HStack>
    <Link to={`/course/${item.course}`}>
        <Button variant={"ghost"} colorScheme="yellow" >
            Watch Now
        </Button>
    </Link>

<Button isLoading={loading} onClick={()=>RemoveFromPlaylist(item.course)} >
    <RiDeleteBin7Fill/>
</Button>

</HStack>
    </VStack>
})


}
        </Stack>
    )
}





<ChangePhoto  loading={loading} changeImageSubmitHandler={changeImageSubmitHandler}  isOpen={isOpen} onClose={onClose} ></ChangePhoto>
  </Container>
  )
}

export default Profile



function ChangePhoto({isOpen,onClose,changeImageSubmitHandler,loading}){

const[image,setimage]=useState('')
const[imagepreview,setimagepreview]=useState('')


    const changeimage=(e)=>{
        const file=e.target.files[0];
        const reader=new FileReader()
        reader.readAsDataURL(file)
    
        reader.onloadend=()=>{
            setimagepreview(reader.result)
            setimage(file)
        }
    }

const closehandler=()=>{
    onClose()
    setimagepreview("")
    setimage("")
}

return (





<Modal isOpen={isOpen} onClose={ closehandler}  >
    <ModalOverlay backdropFilter={"blur(10px)"}/>
    <ModalContent>
        <ModalHeader>
            change photo
        </ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
            <Container>
                <form onSubmit={(e)=>changeImageSubmitHandler(e,image)}  >
<VStack spacing={"8"} >
    <Avatar src={imagepreview}   boxSize={"48"} />
    <Input type="file" onChange={changeimage}   css={{"&::file-selector-button":fileuploadscss}}/>
<Button  isLoading={loading}  w="full" colorScheme={"yellow"} type="submit">
    change
</Button>
</VStack>
                </form>
            </Container>
        </ModalBody>

<ModalFooter>
    <Button mr="3" onClick={ closehandler} >cancel

    </Button>
</ModalFooter>

    </ModalContent>
</Modal>


)
}