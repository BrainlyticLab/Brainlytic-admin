import React,{useState,useEffect} from "react"
import {useSelector} from "react-redux"
import Navbar from "./Navbar"
import axios from "axios"
import {link} from "../base_url"
import "../App.css"
import { keys } from "../keys"
const ProbStats=()=>{

    const [data,setData]=useState([])
    const [maindata,setMainData]=useState([])
 const click1=()=>{
  let c=0;
if(maindata.length>0){
  let g=maindata[0];

  g && g.all_topics.forEach(e=>{
    let sum=0;

   e && e.all_series.forEach(k=>{
     sum+= k.problem_count
    })
    e['nProblem']=sum;
    c+=sum;
  })
g['nProblem']=c; 
  let b=[]
  b.push(g)
  console.log(b);
  setData(b)
document.getElementById("1").classList.add("active");
document.getElementById("2").classList.remove("active");
document.getElementById("3").classList.remove("active");
}

 }   
 const click2=()=>{
  let g=maindata[1];
  let b=[]
  let c=0;
 

  g.all_topics.forEach(e=>{
    let sum=0;
    e.all_series.forEach(k=>{
     sum+= k.problem_count
    })
    e['nProblem']=sum;
    c+=sum;
  })

g['nProblem']=c; 
  b.push(g)
  setData(b)
  document.getElementById("2").classList.add("active");
  document.getElementById("1").classList.remove("active");
document.getElementById("3").classList.remove("active");
  
   }  

   const click3=()=>{
    let g=maindata[2];

    let b=[]
    
    
let c=0;
  g.all_topics.forEach(e=>{
    let sum=0;
    e.all_series.forEach(k=>{
     sum+= k.problem_count
    })
    e['nProblem']=sum;
    c+=sum;
  })
  g['nProblem']=c; 
    b.push(g)
    setData(b)
    document.getElementById("3").classList.add("active");
    document.getElementById("1").classList.remove("active");
document.getElementById("2").classList.remove("active");
    
     }  

    useEffect(()=>{


        axios({
            method: 'get',
            url: link.url+'admin/getLevelsTopicsSeries',
      
            headers: {
              'authorization': keys.authorization,
              
            }
          }).then(res => { console.log(res.data);  setMainData(res.data) }); 
      
        
        },[]) 
return (
<div>
<Navbar/>
<h2 style={{marginBottom:"30px"}}>Problem Stats </h2>
<ul class="nav nav-tabs" style={{cursor:"pointer"}}>
  <li class="nav-item ">
    <a id="1" class="nav-link " onClick={click1} >Level-1</a>
  </li>
  <li class="nav-item">
    <a id="2" class="nav-link" onClick={click2} >Level-2</a>
  </li>
  <li class="nav-item">
    <a id="3" class="nav-link"  onClick={click3} >Level-3</a>
  </li>
  </ul>
  <br/>
<table class="table table-bordered"  style={{marginTop:"50px"}}>
  <thead>
    <tr>
   
    
      <th scope="col">Topics</th>
      <th scope="col">Serieses</th>
      <th scope="col">Problem Count</th>
      <th scope="col">Topic Wise Count</th>
    </tr>
  </thead>
  {data && data.map((e,i)=>(

 e && e.all_topics.map(topic=>(

    <>

<tr>


<td  id="td" rowspan={topic.all_series.length} scope="col" >{topic.topic.name} ( {topic.topic.lang} )</td>
<td>{topic.all_series[0].name}</td> 
<td>{topic.all_series[0].problem_count}</td>
  <td  id="td" rowspan={topic.all_series.length}>
    {topic.nProblem}
  </td>
</tr>
{topic.all_series.slice(1).map(s=>(
  <>
<tr>
 <td>{s.name}</td> 
 <td>{s.problem_count}</td>

 </tr>

 
  </>
  ))
}


    </>

  ))



  ))}
  {data.length>0?<tr>
    <td></td> 
    <td></td> 
    <td>Total Problems : </td>
    <td> {data.length>0? data[0].nProblem:null}</td>
   
    </tr>
  
  :null
  }

</table>
</div>
	)

}
export default ProbStats;