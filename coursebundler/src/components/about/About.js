import { Avatar, Box, Button, Container, Heading, HStack, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { RiSecurePaymentFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import TermAndCondition from '../../assets/docs/TermAndCondition'

const Founder=()=>{
   return  <Stack direction={["column","row"]} spacing={["14","16"]}  padding="8">
<VStack>
    <Avatar src={""}  boxSize={["40","48"]}  />
    <Text children="co-founder" opacity={0.7}/>
</VStack>
<VStack justifyContent={"center"} alignItems={["center","flex-start"]} >
    <Heading children="abhisehek singh"  size={ ["md","xl"]}  />
<Text textAlign={["center","left"]}   children={`hi, i am a full stack developer and a teacher. our mission is provide quality content at reasonable price`}/>
</VStack>
    </Stack>
}

const TandC=({termandconditon})=>{
    return <Box>
        <Heading size={"md"} children="Term & Conditions" textAlign={["center" ,"left"]} my="4" >

        </Heading>
        <Box h="sm" p="4" overflowY={"scroll"}  >
            <Text textAlign={["center" ,"left"]}  letterSpacing={"widest"}  fontFamily={"heading"}>
{termandconditon}
            </Text>
            <Heading my="4" size={"xs"} children="refund only applicable for cancelation within 7 days" >

            </Heading>

        </Box>
    </Box>
}





const Videoplayer=()=>{
return <Box>
    <video src={''}  >

    </video>
</Box>
}

const About = () => {
  return (
   <Container maxW={"container.lg"} padding="16" boxShadow={"lg"} >
    <Heading children="about us "  textAlign={["center","left"]}  />
    <Founder/>
    <Stack  m="8" direction={["column","row"]} alignItems="center" >
        <Text fontFamily={"cursive"} m="8" textAlign={["center","left"]} >
            we are a video streaming platform with some premium courses avilable ony for premium users
        </Text>
<Link to="/subscribe">
    <Button variant={'ghost'} colorScheme="yellow">
        Check Our Plan
    </Button>




</Link>
    </Stack>
    <Videoplayer/>
<TandC termandconditon={TermAndCondition}></TandC>
<HStack my="4" p={"4"} >
    <RiSecurePaymentFill/>
    <Heading size={"xs"} fontFamily="sans-serif"  textTransform={"uppercase"} children="payment issecure by razor pay"></Heading>
</HStack>

   </Container>
  )
}

export default About