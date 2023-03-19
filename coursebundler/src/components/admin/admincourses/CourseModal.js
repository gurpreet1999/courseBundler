import { Box, Button, Grid, Heading, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import { fileuploadscss } from '../../Auth/Register'

const CourseModal = ({loading,isOpen,onClose,id,deleteButtonHandler, addLectureHandler,courseTitle,lectures}) => {

const[title,settitle]=useState()
const[description,setdescription]=useState()
const[video,setvideo]=useState()
const[videoprev,setvideoprev]=useState()


const changevideohandler=(e)=>{
    const file=e.target.files[0];
    const reader=new FileReader()
    reader.readAsDataURL(file)
  
    reader.onloadend=()=>{
        setvideoprev(reader.result)
        setvideo(file)
    }
  }
const handlerClose=()=>{
    settitle("")
    setdescription("")
    setvideoprev("")
    setvideo("")
    onClose()
}

  return (
    <Modal isOpen={isOpen} size="full" onClose={handlerClose}  scrollBehavior="inside" >
<ModalOverlay/>
<ModalContent>
    <ModalHeader>{courseTitle}</ModalHeader>
    <ModalCloseButton  ></ModalCloseButton>
    <ModalBody p="16"  >
<Grid templateColumns={["1fr","3fr 1fr"]} >
<Box px={["0","16"]} >
<Box my="5"  >
    <Heading>{courseTitle}</Heading>
    <Heading size={"sm"} opacity={0.4}   >{`#${id}`}</Heading>

</Box>

<Heading children="lecture" size="lg"  />

{
lectures.map((item,index)=>(

<VideoCard key={index}
title={item.title}
description={item.description}
num={index+1}
lectureid={item._id}
courseid={id}
deleteButtonHandler={deleteButtonHandler}

loading={loading}




/>


))

}

</Box>

<form onSubmit={(e)=>addLectureHandler(e,id,title,description,video)}  >

<VStack  spacing={"4"}   >
<Heading children="add lecture" size={"md"} textTransform="uppercase"  />

<Input focusBorderColor='purple.300' placeholder='title' value={title} onChange={(e)=>{settitle(e.target.value)}} />
<Input focusBorderColor='purple.300' placeholder='description' value={description} onChange={(e)=>{setdescription(e.target.value)}} />
<Input  css={{
   "&::file-selector-button":{
    ...fileuploadscss,color:"purple"
   }
}} onChange={changevideohandler}   accept='video/mp4'  required   type={"file"}  focusBorderColor='purple.500'/>

{
videoprev && (
    <video controlsList='nodownload' controls  src={videoprev}>

    </video>
)

}

<Button isLoading={loading}  w="full" colorScheme={"purple"} type="submit" >
upload

</Button>




</VStack>



</form>







</Grid>
    </ModalBody>
<ModalFooter>
<Button onClick={handlerClose} >
    close
</Button>

</ModalFooter>


</ModalContent>
    </Modal>
  )
}

export default CourseModal


function VideoCard({title,description,num,lectureid,courseid,deleteButtonHandler}){


    return <HStack direction={["column","row"]}  my="8"  p={["4","8"]}  borderRadius={"lg"} justifyContent={["flex-start","space-between"]}   boxShadow={"0 0 10px rgba(107,70,193,0.5)"}>

        <Box>
            <Heading size={"sm"} children={`#${num} ${title} `} />
   
                
                <Text children={description} />
                
                </Box> 


<Button  isLoading={loading} color={"purple.600"} onClick={()=>deleteButtonHandler(courseid,lectureid)}  >
    <RiDeleteBin7Fill/>
</Button>




    </HStack>

}