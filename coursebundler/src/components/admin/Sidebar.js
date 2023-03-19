import { Button, VStack } from '@chakra-ui/react'
import React from 'react'
import { RiAddCircleFill, RiDashboardFill ,RiEyeFill, RiUser3Fill} from 'react-icons/ri'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
const location=useLocation()



  return (
  <VStack spacing={"8"} p="16" boxShadow={"-2px 0 10px rgba(107,70,193,0.5)"}>
<Linkbutton Icon={RiDashboardFill } text="Dashboard" url={"dashboard"} active={location.pathname==="/admin/dashboard"} ></Linkbutton>
<Linkbutton Icon={RiAddCircleFill } text="create course" url={"createcourse"}active={location.pathname==="/admin/createcourse"}  ></Linkbutton>
<Linkbutton Icon={RiEyeFill } text="courses" url={"courses"} active={location.pathname==="/admin/courses"} ></Linkbutton>
<Linkbutton Icon={RiUser3Fill } text="users" url={"users"} active={location.pathname==="/admin/users"} ></Linkbutton>

  </VStack>
  )
}

export default Sidebar


  function Linkbutton({url,Icon,text,active}){
  return (  <Link to={`/admin/${url}`}>
    <Button  fontSize={"larger"} variant="ghost" colorScheme={active?"purple":""}  >
        <Icon style={{margin:"4px"}} />
       {text}
    </Button>
</Link>)
}