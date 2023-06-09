import { Box, Grid, Heading, HStack, Progress, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { RiArrowDownLine, RiArrowUpLine } from 'react-icons/ri'
import cursor from "../../../assets/images/cursor.png"
import Sidebar from '../Sidebar'
import { DoughnutChart, LineChart } from './Chart'

const Databox=({title, qty, qtypercentage, profit})=>{
   return  <Box w={["full","20%"]}  p="8" borderRadius={"lg"}  boxShadow={"-2px 0 10px rgba(107,70,193,0.5)"} >
<Text children={title}  />
<HStack spacing={"6"}>
    <Text fontSize={"2xl"} fontWeight="bold">{qty}</Text>
<HStack>
    <Text children={`${qtypercentage}%`} />
    {profit?<RiArrowUpLine color='green' />:(
        <RiArrowDownLine color='red'/>
    )}
</HStack>
</HStack>
<Text children="since last month"  opacity={0.6}/>
    </Box>
}

const Bar=({title,value,profit})=>(
<Box py={"4"} px={["0","20"]} >

    <Heading size="sm" children={title} mb="2" />
    <HStack w="full" alignItems={"center"}>
<Text children={profit?"0%":`-${value}%`} />
<Progress w="full" value={profit?value:0} colorScheme="purple"  />
<Text children={`${value>100?value:100}%`} />
<Text children="100%" />

    </HStack>


</Box>
)






const Dashboard = () => {
  return (
   <Grid css={{cursor:`url(${cursor}),default`}}   minH={'100vh'} templateColumns={["1fr","5fr 1fr"]} >
<Box boxSizing='border-box' py="16" px={["4","0"]} >
<Text
 textAlign={"center"} opacity={0.5} children={`Last changed was on ${String(new Date()).split("G")[0]}`}/>
<Heading  children="Dashboard" ml={["0","16"]} mb="16" textAlign={["center","left"]} />
<Stack direction={["column","row"]} minH="24" justifyContent={"space-evenly"} >
<Databox title="views" qty={123} qtypercentage={30} profit={true} />


<Databox title="users" qty={23} qtypercentage={78} profit={true} >

</Databox>
<Databox title="subscription" qty={12} qtypercentage={20} profit={false} >

</Databox>
</Stack>
<Box m={["0","16"]} borderRadius="lg" p={["0","16"]} mt={["4","16"]} boxShadow={"-2px 0 10px rgba(107,70,193,0.5)"} >
    <Heading textAlign={["center","left"]} size="md"  pt={["8","0"]} ml={["0","16"]} >views graph</Heading>

<LineChart/>

</Box>


<Grid  templateColumns={["1fr","2fr 1fr" ]} >
<Box p={"4"}>
    <Heading textAlign={["center","left"]} size="md" children="progress bar" my="8" ml={["0","16"]}/>
<Box>
    <Bar profit={true}   title="views" value={30} ></Bar>
    <Bar  profit={true}  title="users" value={78} ></Bar>
    <Bar profit={false}  title="subscription" value={0} ></Bar>

</Box>
</Box>


<Box p={["4","16"]} boxSizing="border-box" py="4"> 
    <Heading textAlign={"center"} size="md" mb="4" children="users" />
    {/* dougnut*/}
    <DoughnutChart/>
</Box>



</Grid>
</Box>

<Sidebar/>
   </Grid>
  )
}

export default Dashboard