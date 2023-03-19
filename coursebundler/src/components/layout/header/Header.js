import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, HStack, useDisclosure, VStack } from '@chakra-ui/react'
import React from 'react'
import {ColorModeSwitcher }from "../../../ColorModeSwitcher" 

import {RiDashboardFill, RiLogoutBoxFill, RiLogoutBoxLine, RiMenu5Fill}  from "react-icons/ri"
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logOut } from '../../../redux/actions/userAction'

const Header = ({isAuthenticated=false,user}) => {
const {isOpen,onOpen,onClose} =useDisclosure()
const LinkButton=({url="/",title="Home",onClose})=>{
   return <Link onClick={onClose}    to={url}>
    <Button variant={"ghost"}>{title}</Button>
    </Link>
}

const dispatch=useDispatch()
const logouthandler=()=>{
   dispatch(logOut())
    onClose() 
}





  return <>
  <ColorModeSwitcher/>
  <Button onClick={onOpen}  zIndex={"overlay"}  colorScheme={"yellow"} width="12" height={"12"} rounded="full" position={"fixed"} top="6" left="6">
<RiMenu5Fill/>
  </Button>

<Drawer placement='left' onClose={onClose} isOpen={isOpen}>
    <DrawerOverlay backdropFilter={'blur(1px)'}  />
    <DrawerContent>
       <DrawerHeader borderBottomWidth={"1px"} >COURSE BUNDLER</DrawerHeader>
       <DrawerBody>
    <VStack spacing={"4"} alignItems="flex-start">
       <LinkButton url="/" title="Home"   onClose={onClose}   ></LinkButton>
       <LinkButton url="/courses" title="Browse Course"  onClose={onClose} ></LinkButton>
       <LinkButton url="/request" title="Request Course"  onClose={onClose} ></LinkButton>
       <LinkButton url="/contact" title="Contact Us"  onClose={onClose} ></LinkButton>
       <LinkButton url="/About" title="About"  onClose={onClose} ></LinkButton>

<HStack justifyContent={"space-evenly"} position="absolute" bottom={"2rem"} width="80%"  >
{isAuthenticated?(<>

<VStack>
<HStack>
<Link onClick={onClose}   to="/profile"><Button   variant={"ghost"} colorScheme={"yellow"}>Profile</Button></Link>

<Button      onClick={logouthandler}    variant={"ghost"} ><RiLogoutBoxLine/>Logout</Button>

</HStack>

{
    user && user.role==="admin" && <Link onClick={onClose}    to='/admin/dashboard'  >
        <Button colorScheme={"purple"} variant="ghost"  ><RiDashboardFill  style={{margin:"4px"}}  />Dashboard</Button>
    </Link>
}
</VStack>



</>):(<>
<Link onClick={onClose}   to="/login"><Button colorScheme={"yellow"}>Login</Button></Link>
<p>OR</p>

<Link  onClick={onClose}  to="/register"><Button colorScheme={"yellow"}>Sign Up</Button></Link>
</>)}
</HStack>


    </VStack>
       </DrawerBody>
    </DrawerContent>

</Drawer>


  </>
}

export default Header