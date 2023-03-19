import { Box, Button, Grid, Heading, HStack, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import cursor from "../../../assets/images/cursor.png"
import { getALLuser, updateUserRole } from '../../../redux/actions/adminAction'
import Sidebar from '../Sidebar'
import Loader from "../../layout/loader"
import { toast } from 'react-hot-toast'

const User = () => {


const {users,loading,error,message}=useSelector(state=>state.admin)

const dispatch=useDispatch()

const updatehandler=(userid)=>{
dispatch(updateUserRole(userid))
}







const deletebuttonhandler=(userid)=>{

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
dispatch(getALLuser())

},[dispatch,error,message])



  return (
    <Grid css={{cursor:`url(${cursor}),default`}}   minH={'100vh'} templateColumns={["1fr","5fr 1fr"]} >
    {
      loading?<Loader/>:(
        <Box p={["0","16"]} overflowX="auto">
      <Heading children="all user" my="16" textTransform={"uppercase"} textAlign={["center","left"]} />
    
<TableContainer w={["100vw","full"]} >
<Table variant={"simple" } size="lg">
<TableCaption>
  all available user in the database
</TableCaption>
<Thead>
  <Tr>
    <Th>Id</Th>
    <Th>Name</Th>
    <Th>email</Th>
    <Th>role</Th>
    <Th>subscription</Th>
    <Th isNumeric >action</Th>

  </Tr>
</Thead>

<Tbody>
{
 users &&  users.map((item)=>{
    
    return <Row  deletebuttonhandler={deletebuttonhandler}  updatehandler={updatehandler}   key={item._id}   item={item} ></Row>
})
}
</Tbody>


</Table>
</TableContainer>


    </Box>
      )
    }
    
    <Sidebar/>
       </Grid>
  )
}

export default User


function Row({item,updatehandler,deletebuttonhandler}){
  return (

<Tr>
  <Td>
#{item._id}
  </Td>
  <Td>
{item.name}
  </Td>
  <Td>
{item.email}
  </Td>
  <Td>
{item.role}
  </Td>
  <Td>
{
item.subscription && 

item.subscription.status=="active"?"Active":"not active"}
  </Td>



  <Td isNumeric >
   <HStack justifyContent={"flex-end"} >
    <Button onClick={()=>updatehandler(item._id)}   variant={"outline"} color="purple.500"  >change role</Button>
<Button   onClick={()=>deletebuttonhandler(item._id)}   color="purple.600" >
  <RiDeleteBin7Fill/>
</Button>

   </HStack>
  </Td>
</Tr>

  )
}