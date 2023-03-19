import React from 'react'
import {Chart as Chartjs,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,ArcElement,Legend} from "chart.js"
import {Line , Doughnut} from "react-chartjs-2"



Chartjs.register(
    CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,ArcElement,Legend
)
 export const LineChart = () => {

const labels=getlastyearmonths()


const options={
    responsive:true,
    plugins:{
        legend:{position:"bottom"}
    ,
    title:{
display:true,
text:"yearly veiws"
    }
}
}

const data={
    labels,
    datasets:[{ label:"views",data:[1,2,3,4] ,borderColor:"rgba(107,70,193,0.5)" ,backgroundColor:"#6b46c1" },
       
    ],

}


  return <Line options={options} data={data} />
}


export const DoughnutChart=()=>{
   
    
    const data={
        labels:["subscribe","not subscribe"],
        datasets:[{ label:"views",data:[3,20] ,borderColor:["rgb(62,12,171)","rgb(214,43,129)"] ,backgroundColor:["rgba(62,12,171,0.3)","rgba(214,43,129,0.3)"],    borderWidth:1  },
     
        ],
    
    } 
    
    
    return <Doughnut data={data}/>
}



function getlastyearmonths(){
    const labels=[]
    const months=[
        "january","february","march","april","may","june","july","august","september","october","november","december"
    ]

    const currentMonth=new Date().getMonth();
    const remains=11-currentMonth;

for(let i =currentMonth;i<months.length;i--){
    const element=months[i]
    labels.unshift(element)
    if(i===0){
        break
    }
}

for(let i=11;i>remains;i--){
    if(i===currentMonth){
        break;
        }
    const element=months[i]
    labels.unshift(element);
    
}
console.log(labels)

return labels

}
