import React,{useState,useEffect} from "react"
import Navbar from "./Navbar";
import { keys } from "../keys"
import axios from "axios"
import {useParams} from "react-router-dom"
import DatePicker from "react-datepicker";
import {link} from "../base_url"

import "react-datepicker/dist/react-datepicker.css";

const AddTest = () => {

  var {level_id,test_id,lang}=useParams();
  const [marks,setM]=useState(0);
  const [o_id,setOId]=useState([]);
  const [test,setTest]=useState([]);
  const [startDate, setStartDate] = useState(new Date());
const [title,setTitle]=useState('');
const [time,setTime]=useState('');
const [probs,setProbs]=useState([])
const [ascending,setAscending]=useState(false)
const [probId,setProbId]=useState([]);
const [totProblem,setTotProblem]=useState(20);
const [MathProblem,setMathProblem]=useState(10);
const [GeoProblem,setGeoProblem]=useState(5);
const [LogicalProblem,setLogicalProblem]=useState(5);
const [data,setData]=useState([]);
const [filteredData,setFilteredData]=useState([]);
const [duration,setDuration]=useState(0);
const [totMarks,setTotMarks]=useState(50);
const [dataProb,setDataProb]=useState([])
const [testName,setTestName]=useState("");
const [level,setLevel]=useState(6);
const [langu,setLang]=useState("en");
const [status,setStatus]=useState(0);
const [type,setType]=useState(0);
const [marksForProblem,setMarksForProblem]=useState(5);
const edit=(prob_id)=>{


  axios({
    method: 'put',
    url: link.url+'api/tests/'+test_id+"/problems/"+prob_id,
    data: {marks:parseInt(marksForProblem)},
    headers:{
      'authorization':keys.authorization,
    }
  }).then(res=>{
   console.log(res.data)
    alert("Successfully updated problem marks");
  
  }).catch(e=>console.log(e))




}

const saveProperties=()=>{

let x=startDate.getTime();

if(test.data&& test.data[0].OnlineTest && Object.keys(test.data[0].OnlineTest).length>0){
  let data={
test_id:+test_id,
    test_date_time:x,
    duration:+duration,
    total_marks:+totMarks
  
  }
  console.log(data,o_id)
  axios({
  method: 'put',
  url: link.url+'api/tests/'+o_id+'/properties',
 data:data,
  headers: {
    'authorization': keys.authorization,
  }
}).then(res =>{ alert("Successfully updated test properties")})
  .catch(e => {  console.log(e)})


  }else{
let data={

  test_date_time:x,
  duration:+duration,
  total_marks:+totMarks

}
axios({
  method: 'post',
  url: link.url+'api/tests/'+test_id+'/properties',
 data:data,
  headers: {
    'authorization': keys.authorization,
  }
}).then(res =>{ alert("Successfully added test properties")})
  .catch(e => {  console.log(e)})
console.log(data);
  }
}
const confirm=()=>{
    console.log(probId)
}
const saveTestStatus=()=>{


console.log(testName,level,status,langu)
const data={
name:testName,
level_id:level,
lang:langu,
type:type,
status:status

}

axios({
  method: 'put',
  url: link.url+'api/tests/'+test_id,
  data: data,
  headers:{
    'authorization':keys.authorization,
  }
}).then(res=>{
 console.log(res.data)
  alert("Successfully updated test ");

}).catch(e=>console.log(e))
}

const levelClick=(text)=>{
  let level=text.split(' ')[1]
  let l=parseInt(level)+5;
  axios({
    method: 'get',
    url: link.url+'admin/getTopicsAndProblems?level_id='+l,

    headers: {
      'authorization': keys.authorization,
    }
  }).then(res =>{ 
    
    setData(res.data.filter(e=>e.topic.lang==lang ));
  
    
    console.log(res.data)})
    .catch(e => {  console.log(e)})
console.log(level);


}
const method=()=>{
  setAscending(!ascending)
let newData=data.slice(0);

newData.forEach(d=>{

d.problems=d.problems.sort((p1,p2)=>{

let p= p1.user_rating!=null?((p1.admin_rating*2+p1.user_rating)*100/30):p1.admin_rating*10;

let q= p2.user_rating!=null?((p2.admin_rating*2+p2.user_rating)*100/30):p2.admin_rating*10;
if(p<q) return 1
else return -1

})

})
console.log(data)
setData(newData)

}
const method2=()=>{
  setAscending(!ascending)

let newData=data.slice(0)
newData.forEach(d=>{
  console.log(data)
d.problems=d.problems.sort((p1,p2)=>{

let p= p1.user_rating!=null?((p1.admin_rating*2+p1.user_rating)*100/30):p1.admin_rating*10;

let q= p2.user_rating!=null?((p2.admin_rating*2+p2.user_rating)*100/30):p2.admin_rating*10;
if(p<q) return -1
else return 1

})

})

console.log(data)
setData(newData)
}
const submitHandler=()=>{

if(probId.length<totProblem){
  alert("You have to select total "+totProblem+ " problems")
}else{
console.log(probId);


console.log(level_id)
if(level_id==6){
setM(5);
}
else if(level_id==7){
  setM(8);
}
else {
  setM(10);
}
let d=[]
probId.forEach(p=>{
d.push({problem_id:p,marks:marks});
})
console.log(d)
let data={
  "auto_generate":false,
 
 "problems":d
 }
 console.log(data);
axios({
  method: 'post',
  url: link.url+'api/tests/'+test_id+'/problems',
 data:data,
  headers: {
    'authorization': keys.authorization,
  }
}).then(res =>{ alert("Successfully added problems")})
  .catch(e => {  console.log(e)})
}
}
const change=(e,d)=>{
    var checkedValue = []; 
    let count1=0;
    let count2=0;
    let count3=0;
    var inputElements = document.getElementsByClassName('custom-control-input');
    for(var i=0; inputElements[i]; ++i){
          if(inputElements[i].checked){
               checkedValue.push(parseInt(inputElements[i].value));
           if(d.topic_id==28){
            count1++;
            if(count1>LogicalProblem){
              inputElements[i].checked=false; 
            }
           }
           if(d.topic_id==32){
            count2++
            if(count2>MathProblem){
              inputElements[i].checked=false; 
            }
           }
           if(d.topic_id==33){
            count3++
            if(count3>GeoProblem){
              inputElements[i].checked=false; 
            }
           }
          }
    }
    
if(count1>LogicalProblem){
  alert("You can't select more than "+LogicalProblem+" from this topic")
}

if(count2>MathProblem){
  alert("You can't select more than "+MathProblem+" from this topic")
}
if(count3>GeoProblem){
  alert("You can't select more than "+GeoProblem+" from this topic")
}
  if(checkedValue.length>0){
    document.getElementById("submit-btn").style.display="block";
    console.log(checkedValue.length)
  }
  else{
    document.getElementById("submit-btn").style.display="none"  
  }
    setProbId(checkedValue)
}
const select =()=>{
  var inputElements = document.getElementsByClassName('custom-control-input');
 let k=0;
 let a=[LogicalProblem,MathProblem,GeoProblem];
 let checkedValue=[]
  while(k<3){
 
  let i=0;
  let ara=[]
  let flag=0;
  let t;
  let prev;
  console.log(a)
if(k==0){
t=0;

}else{
  if(k==1)
  t=data[k-1].problems.length;
  else{
    t=data[k-1].problems.length+data[k-2].problems.length;
  }
}
console.log(t)
let lrc=Math.abs(data[k].problems.length);
console.log("lrc",lrc)
  while(i<a[k]){
flag=0;
   let rand= Math.floor(Math.random()*lrc)+t;
  
   for(let j=0;j<ara.length;j++){
if(ara[j]==rand){
  flag=1;
break;
}
   }
   if(flag==0){
    ara[i]=rand;
    i++;
    

   }

  }

console.log(ara)
for(let i=0;i<a[k];i++){
  inputElements[ara[i]].checked=true;
  checkedValue.push(parseInt(  inputElements[ara[i]].value));
}
k++;
console.log(inputElements.length)
}
if(checkedValue.length>0){
  document.getElementById("submit-btn").style.display="block";
  
}
else{
  document.getElementById("submit-btn").style.display="none"  
}
console.log(checkedValue)
setProbId(checkedValue)
}
const saveData=()=>{
  // console.log(totProblem,MathProblem,GeoProblem,parseInt(LogicalProblem))
  let x=parseInt(LogicalProblem) 
  let y=parseInt(MathProblem);
  let z= parseInt(GeoProblem)
 console.log(x,y,z)
setTotMarks(marks*(x+y+z))
   setTotProblem(x+y+z);
let obj={}
   if(test.data && test.data[0].TestProblemDistributions.length>0){

obj[test.data[0].TestProblemDistributions[0].Topic.name]=test.data[0].TestProblemDistributions[0].testprobdist_id;

obj[test.data[0].TestProblemDistributions[1].Topic.name]=test.data[0].TestProblemDistributions[1].testprobdist_id;

obj[test.data[0].TestProblemDistributions[2].Topic.name]=test.data[0].TestProblemDistributions[2].testprobdist_id;
  

   console.log(obj);

 
  axios({
    method: 'put',
    url: link.url+'api/tests/problemDistribution/'+obj['Logical Reasoning'],
   data:{"problem_count":parseInt(LogicalProblem)},
    headers: {
      'authorization': keys.authorization,
    }
  }).then(

    axios({
      method: 'put',
      url: link.url+'api/tests/problemDistribution/'+obj['Math'],
     data:{"problem_count":parseInt(MathProblem)},
      headers: {
        'authorization': keys.authorization,
      }
    }).then(
      axios({
        method: 'put',
        url: 'http://43.224.110.202/api/tests/problemDistribution/'+obj['Geometry'],
       data:{"problem_count":parseInt(GeoProblem)},
        headers: {
          'authorization': keys.authorization,
        }
      }).then(
    
        alert("Success")
    
      ).catch(e=>console.log(e))
  
  
    ).catch(e=>console.log(e))

  )
    .catch(e => {  console.log(e)})}
    else{

      alert("problem number set")
    }
  }

const viewClick=()=>{

console.log(test)
setDataProb(test.data[0].TestProblems);

}
 useEffect(()=>{
  if(level_id==6){
    setM(5);
    }
    else if(level_id==7){
      setM(8);
    }
    else {
      setM(10);
    }
console.log(test_id)
  axios({
    method: 'get',
    url: link.url+'api/tests/'+test_id,

    headers: {
      'authorization': keys.authorization,
    }
  }).then(res =>{

setTestName(res.data.data[0].name);
setLang(res.data.data[0].lang);
setLevel(res.data.data[0].level_id);
setStatus(res.data.data[0].status)
setType(res.data.data[0].type)


if(res.data.data && res.data.data[0].OnlineTest && Object.keys(res.data.data[0].OnlineTest).length>0){
setStartDate(new Date(+res.data.data[0].OnlineTest.test_date_time));
setDuration(res.data.data[0].OnlineTest.duration);
if(res.data.data[0].OnlineTest.total_marks!=0)
setTotMarks(res.data.data[0].OnlineTest.total_marks);
else{
  setTotMarks(marks*15);
}

setOId(res.data.data[0].OnlineTest.onlinetest_id)
}
else{
  setTotMarks(marks*15)
}
let t=0;    
if(res.data && res.data.data[0].TestProblemDistributions.length>0 ){
for(let i=0;i<3;i++){  
if(res.data.data[0].TestProblemDistributions[i].Topic.name=="Logical Reasoning"){
setLogicalProblem(res.data.data[0].TestProblemDistributions[i].problem_count)
t+=res.data.data[0].TestProblemDistributions[i].problem_count;

}else if(res.data.data[0].TestProblemDistributions[i].Topic.name=="Math"){
  setMathProblem(res.data.data[0].TestProblemDistributions[i].problem_count)
 t+= res.data.data[0].TestProblemDistributions[i].problem_count;
}
else{
  setGeoProblem(res.data.data[0].TestProblemDistributions[i].problem_count)
 t+= res.data.data[0].TestProblemDistributions[i].problem_count;
}
}
//setTotMarks(marks*t)
}

setTotProblem(t);
    setTest(res.data);console.log(res.data)})
    .catch(e => {  console.log(e)})
},[data])


    return ( 

<>
<Navbar/>
<div>
  {
test && test.data &&  test.data[0].TestProblems.length>0?
(
<>
<button onClick={viewClick} type="button" className="btn btn-success btn-lg my-3 mx-3" >
View Problems
</button>
</>
):(

level_id==6?(
<>
<button onClick={(e)=>levelClick(e.target.innerHTML)} type="button" className="btn btn-outline-success btn-lg my-3 mx-3" >
Level 1
</button>
<button  onClick={select} type="button" className="btn btn-outline-success btn-lg my-3 mx-3" >  
Auto select
</button>
</>
):level_id==7?(
<><button onClick={(e)=>levelClick(e.target.innerHTML)} type="button" className="btn btn-outline-success btn-lg my-3 mx-3" >
Level 2
</button>
<button  onClick={select} type="button" className="btn btn-outline-success btn-lg my-3 mx-3" >  
Auto select
</button>
</>
):(<>
<button  onClick={(e)=>levelClick(e.target.innerHTML)} type="button" className="btn btn-outline-success btn-lg my-3 mx-3" >
Level 3
</button>
<button  onClick={select} type="button" className="btn btn-outline-success btn-lg my-3 mx-3" >  
Auto select
</button>
</>
)
)

  }

<button type="button" class="btn btn-primary mx-5" data-toggle="modal" data-target="#exampleModal">
Set Problem Distribution
</button>
<button type="button" class="btn btn-dark mx-5" data-toggle="modal" data-target="#exampleModal2">
Schedule Test Time 
</button>
<button type="button" class="btn btn-primary btn-lg  mx-5" data-toggle="modal" data-target="#exampleModal3">
Update Status
</button>

<button type="button" onClick={submitHandler} id="submit-btn" class="btn btn-primary mx-5" style={{position:"fixed",top:"160px",width:"100px",right:"-10px",display:"none"}} >
Submit
</button>

<div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel2">Configure Test</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <form>
 <div class="form-group">
 <DatePicker   showTimeSelect
  dateFormat="Pp" selected={startDate} onChange={(date: Date) => setStartDate(date)} />

  </div>
  <div class="form-group">
    <label for="exampleInput2">Duration (in hour)</label>
    <input value={duration} onChange={(e)=>setDuration(e.target.value) } style={{width:"50%",margin:"auto"}}type="text" class="form-control" id="exampleInput2"/>
  </div>
  <div class="form-group">
    <label for="exampleInput3">Total Marks</label>
    <input value={totMarks} onChange={(e)=>setTotMarks(e.target.value)}  style={{width:"50%",margin:"auto"}}type="text" class="form-control" id="exampleInput3"/>
  </div>
  


</form>
 


      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button onClick={saveProperties} type="button" class="btn btn-primary">Save changes</button>
      </div>
 
    </div>
  </div>
</div>



<div class="modal fade" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel3" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Update Test Status</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <form>
  <div class="form-group">
    <label for="exampleInpu31">Test Name</label>
    <input style={{width:"50%",margin:"auto"}} type="text" class="form-control" id="exampleInput1" aria-describedby="emailHelp" value={testName} onChange={(e)=>setTestName(e.target.value)}/>

  </div>
  <div class="form-group">
    <label for="exampleInput2">Level Id</label>
    <input value={level} onChange={(e)=>setLevel(e.target.value) } style={{width:"50%",margin:"auto"}}type="text" class="form-control" id="exampleInput2"/>
  </div>
  <div class="form-group">
    <label for="exampleInput3">Language</label>
    <input value={langu} onChange={(e)=>setLang(e.target.value)}  style={{width:"50%",margin:"auto"}}type="text" class="form-control" id="exampleInput3"/>
  </div>
  <div class="form-group">
    <label for="exampleInput4">Status  ( 0-Not live, 1- live, 2-Complete)</label>
    <input value={status} onChange={(e)=>setStatus(e.target.value)}  style={{width:"50%",margin:"auto"}}type="text" class="form-control" id="exampleInput4"/>
  </div>
  <div class="form-group">
    <label for="exampleInput4">Type(0-online,1-practice)</label>
    <input value={type} onChange={(e)=>setType(e.target.value)}  style={{width:"50%",margin:"auto"}}type="text" class="form-control" id="exampleInput4"/>
  </div>

</form>
 


      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button onClick={saveTestStatus} type="button" class="btn btn-primary">Save changes</button>
      </div>
 
    </div>
  </div>
</div>




<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Set Test Problem Number</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <form>
  <div class="form-group">
    <label for="exampleInput1">Total Problems</label>
    <input style={{width:"50%",margin:"auto"}} type="text" class="form-control" id="exampleInput1" aria-describedby="emailHelp" value={totProblem} onChange={(e)=>setTotProblem(e.target.value)}/>

  </div>
  <div class="form-group">
    <label for="exampleInput2">Math Problem</label>
    <input value={MathProblem} onChange={(e)=>setMathProblem(e.target.value) } style={{width:"50%",margin:"auto"}}type="text" class="form-control" id="exampleInput2"/>
  </div>
  <div class="form-group">
    <label for="exampleInput3">Geometry Problem</label>
    <input value={GeoProblem} onChange={(e)=>setGeoProblem(e.target.value)}  style={{width:"50%",margin:"auto"}}type="text" class="form-control" id="exampleInput3"/>
  </div>
  <div class="form-group">
    <label for="exampleInput4">Logical Problem</label>
    <input value={LogicalProblem} onChange={(e)=>setLogicalProblem(e.target.value)}  style={{width:"50%",margin:"auto"}}type="text" class="form-control" id="exampleInput4"/>
  </div>


</form>
 


      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button onClick={saveData} type="button" class="btn btn-primary">Save changes</button>
      </div>
 
    </div>
  </div>
</div>




</div>

<div className="content" style={{marginBottom:"50px"}}> 


{dataProb && dataProb.map(d=>(

<div key={d.Problem.problem_id} class="card mt-5" style={{width:"20rem",margin:"auto"}}>
  <img class="card-img-top" src={d.Problem.logo} alt="Card image cap"/>
  <div class="card-body">
    <h2 class="card-title">{d.Problem.title}</h2>
<h4> Marks :{d.marks}</h4>
 <button className="btn btn-primary ml-2 mt-5" type="button" data-toggle="collapse" data-target={'#collapse' + d.Problem.problem_id} aria-expanded="false" aria-controls="collapseExample" >Edit Marks</button>
 <a style={{marginTop:"50px",marginLeft:"15px"}} type="button" class="btn btn-primary "  target="_blank" href={"http://43.224.110.108/lang/en/level/"+level+"/series/"+d.Problem.Series.series_id+"/problem/"+d.Problem.serial} >Go</a>
                
 <div class="collapse" id={'collapse' + d.Problem.problem_id}>
                  <div class="card card-body">
                    <input onChange={(e) => setMarksForProblem(e.target.value) } placeholder="Enter marks" type="text" class="form-control" name="mappedProblemId" />
                    <button onClick={(e) => edit(d.Problem.problem_id)} className="btn btn-primary py-3 my-3" >Submit</button>
                </div>
  
  </div>
</div>

</div>

))}


   {

data && data.map((d,i)=>(

<div key={i} style={{marginTop:"15px",width:"50%"}}>

<h4 >Topic name : {d.topic.name}-<span class="badge badge-secondary">{d.topic.lang=="en"?"English":"Bangla"} </span> </h4>
<h5>Problems List (can select {d.topic.name=="Logical Reasoning"?LogicalProblem:d.topic.name=="Math"?MathProblem:GeoProblem})</h5> 

 <button onClick={ascending?method2:method} className="btn btn-primary btn -lg mb-2">{ascending?<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-up" viewBox="0 0 16 16">
  <path d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707V12.5zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
</svg>:<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-down" viewBox="0 0 16 16">
  <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
</svg>}</button>
 
 <ul class="list-group list-group-flush">
     {
        d.problems.map((data,i)=>{
return (
<div key={data.problem_id}>
<li class="list-group-item">
    
    <div class="custom-control custom-checkbox" style={{display:"flex"}}>
      <input onChange={(e)=>change(e,data)} type="checkbox" class="custom-control-input" id={'check'+data.problem_id} value={data.problem_id} />
      <label class="custom-control-label" for={'check'+data.problem_id}>{data.title}<span class="badge badge-secondary" style={{marginLeft:"10px"}}> <a target="_blank" href={"http://43.224.110.108/lang/en/level/"+level+"/series/"+data.series_id+"/problem/"+data.serial} style={{color:"white"}}>View</a></span></label>
     <p style={{marginLeft:"100px"}}>Avg rating {data.user_rating!=null?(data.admin_rating*2+data.user_rating)*100.0/30:data.admin_rating*10} %</p>
  
    </div>
  </li>
  
</div>

)

         })

        }
</ul>
  </div>



))

   }
   
  
   
    </div>  

 

<div className="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">Topic Data</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <form>
  <div class="form-group">
    <label for="topic_title">Test Title</label>
    <input onChange={(e)=>setTitle(e.target.value)} type="text" class="form-control" name="title" />
  </div>
  <div class="form-group">
  <button type="button" className="btn btn-outline-success btn-lg my-3" data-toggle="modal" data-target="#exampleModalLong2">
 Select Problems
</button>
</div>
<div class="form-group">
    <label for="topic_title">Test Time(in hours)</label>
    <input onChange={(e)=>setTime(e.target.value)} type="text" class="form-control" name="time" />
  </div>
  </form>
  <div className="modal-footer">
 
        <button type="button" class="btn btn-primary" onClick={confirm}>Confirm</button>
      </div>
      </div>
      </div>
      </div>
      </div>
      <div className="modal fade" id="exampleModalLong2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">Topic Data</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
          
      <h1>Problems List</h1> 
      <ul class="list-group list-group-flush">
     {
         probs && probs.map((data,i)=>{
return (
<div key={i}>
<li class="list-group-item">
    
    <div class="custom-control custom-checkbox">
      <input onChange={(e)=>change(e)} type="checkbox" class="custom-control-input" id={'check'+i} value={data.problem_id} />
      <label class="custom-control-label" for={'check'+i}>{data.title}</label>
    </div>
  </li>
</div>

)

         })
     }

  
   
 
  </ul>   

  {/* <button class="btn btn-primary"  data-dismiss="modal" aria-label="Close">Done</button> */}
  <div className="modal-footer">
  <button class="btn btn-primary"  data-dismiss="modal" aria-label="Close">Done</button>
      </div>  
          </div></div></div>
</div>

</>

     );
}
 
export default AddTest ;