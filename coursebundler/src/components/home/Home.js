import { Box, Button, Heading, HStack, Image, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import "./Home.css"
import vg from "../../assets/images/bg.png"
import {CgGoogle,CgYoutube,} from "react-icons/cg"
import {SiCoursera,SiUdemy,} from "react-icons/si"
import {DiAws} from "react-icons/di"
import introvideo from "../../assets/videos/intro.mp4"


const Home = () => {
  return (
 <section className='home'>
    <div className='container'>
        <Stack direction={["column", "row"]} height="100%" justifyContent={["center", "space-between"]}  alignItems="center" spacing={["16","56"]} >
          <VStack  spacing={"8"}  width={"full"} alignItems={["center","flex-end"]}><Heading children="LEARN FROM THE EXPERTS" size={'2xl'}></Heading>
          <Text fontSize={"2xl"} fontFamily="cursive"    alignItems={["center","left"]}   children="Find Valuavble Content at Reasonable Price"></Text>
          <Link to="/courses">
            <Button size={"lg"} colorScheme="yellow">Enroll now</Button>
          </Link>
          </VStack>

<Image className='vector-graphics'   boxSize={"md"} src={vg} objectFit="contain" width={"250px"}></Image>


        </Stack>
        </div>

        
          <Box padding={"8"} bg="blackAlpha.800">
            <Heading textAlign={"center"} fontFamily="body" color={"yellow.400"}  children="OUR BRANDS"></Heading>
            <HStack className='brandsbanner' justifyContent={"space-evenly"} marginTop="4">
<CgGoogle/>
<CgYoutube/>
<SiCoursera/>
<SiUdemy/>
<DiAws/>
          </HStack>
          </Box>
   



    <div className='container2'>
<video autoPlay controls src={introvideo}  controlsList='nodownload nofullscreen noremoteplayback'
disablePictureInPicture
disableRemotePlayback
> 

</video>

      </div>    


 </section>
  )
}

export default Home