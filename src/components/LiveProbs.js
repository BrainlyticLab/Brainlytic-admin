import React,{useState} from 'react'
import Navbar from "./Navbar"
import {link} from "../base_url"
import { keys } from "../keys"
import axios from "axios"
import { Link } from "react-router-dom"
import firebase from "../firebase"
const LiveProbs=()=>{


const [level,setLevel]=useState(6)
const [allLoading,setallLoading]=useState(false)
const [rating,setRating]=useState(0)
const [data,setData]=useState([])
const [mappedId,setMappedId]=useState(0)
const editRating=(prob)=>{

console.log(rating)
    axios({
        method: 'post',
        url: link.url+'problems/rate?problem_id='+prob.problem_id,
        data: {
            "rating":rating
        },
        headers: {
          'authorization': keys.authorization,
        }
      }).then(res=>{
        alert("Problem rating updated");}
      ).catch(e=>console.log(e))
      


}
const editMappedProblem=(prob)=>{

  let id1=prob.problem_id;

  let id2=mappedId;
  let data={problem_id_1:id1,problem_id_2:id2};
  axios({
    method: 'post',
    url: link.url+'admin/associate/create',
    data: data,
    headers: {
      'authorization': keys.authorization,
    }
  }).then(res=>{
    alert("Problem mapping successful");
  
    firebase.firestore().collection("problem").doc(prob.doc_id).update({
      associated_problem_id:id2
    })
  
  
  
  }).catch(e=>{
    console.log(e);
  })
  

}
const click=()=>{

    axios({
        method: 'get',
        url: link.url+'admin/getTopicsAndProblems',
    
        headers: {
          'authorization': keys.authorization,
        }
      }).then(res =>{ setData(res.data);console.log(res.data)})
        .catch(e => {  console.log(e)})
}

return (<div>

<Navbar />
   <div class="d">
  <label for="exampleInput1">Select Level</label>
    {/* <label for="exampleInput1">Language (en or bn) </label> */}
    {/* <input onChange={(e)=>setLang(e.target.value)} style={{width:"50%",margin:"auto"}} type="text" class="form-control" id="exampleInput1" aria-describedby="emailHelp" /> */}
  <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
  
  value={level}
  onChange={(e)=>{setLevel(e.target.value)}}
  >
  <option selected value="6">Level 1</option>
  <option value="7">Level 2</option>
  <option value="8">Level 3</option>
  <option value="9">Level 4</option>
  
</select>
<button class="btn btn-dark my-3 ml-4" type="button" onClick={click} >

{allLoading == false? null : <><span class="spinner-grow spinner-grow-sm pr-2" role="status" aria-hidden="true"></span>
<span class="sr-only mr-2">Loading..</span></>}

  Load Problems
  
  
  </button>
  </div>
{
data && data.map((d,i)=>(

<div key={i} style={{margin:"auto"}}>

<h4 style={{marginTop:"20px"}}>Topic name : {d.topic.name}-<span class="badge badge-secondary">{d.topic.lang=="en"?"English":"Bangla"} </span> </h4>

{
        d.problems.map((prob,i)=>{

return (


<div key={prob.problem_id} class="card mt-5" style={{ width: '20rem', margin: "auto" }} id={prob.problem_id}>
      
      <img src={prob.logo} className="img-fluid rounded-circle w-50 mb-3 m-auto" alt="..." />
      <div className="card-body">
        <h2 className="card-title">{prob.title}</h2>
        <p class="card-text" >Problem Id - {prob.problem_id}</p>

     

          <button className="btn btn-primary" type="button" data-toggle="collapse" data-target={'#collapse' + prob.problem_id} aria-expanded="false" aria-controls="collapseExample">
            Details
          </button>
          <Link to={{
                      pathname: "/problem/" + prob.problem_id, myProps: {
                        problem: prob
                      }
                    }} >    <button type="button" className="btn btn-info ml-3" data-toggle="modal" data-target="#editProblem">
                        Edit
                      </button></Link>
         <button className="btn btn-primary ml-3" type="button" data-toggle="collapse" data-target={'#collapse2' + prob.problem_id} aria-expanded="false" aria-controls="collapseExample">
                    Edit Rating
                  </button>       <br/>
                  <button className="btn btn-primary ml-2 mt-5" type="button" data-toggle="collapse" data-target={'#collapse3' + prob.problem_id} aria-expanded="false" aria-controls="collapseExample" >Mapped Problem Id</button>     

</div>
<div class="collapse" id={'collapse2' + prob.problem_id}>
                  <div class="card card-body">
                    <input onChange={(e) => setRating(e.target.value )} placeholder="Enter Admin Rating" type="text" class="form-control" name="mappedProblemId" />
                    <button onClick={(e) => editRating(prob)} className="btn btn-primary py-3 my-3" >Submit</button>

                  </div>
                </div>
                <div class="collapse" id={'collapse3' + prob.problem_id}>
                  <div class="card card-body">
                    <input onChange={(e) => setMappedId(e.target.value )} placeholder="Enter mapped problem id" type="text" class="form-control" name="mappedProblemId" />
                    <button onClick={(e) => editMappedProblem(prob)} className="btn btn-primary py-3 my-3" >Submit</button>

                  </div>
                </div>
<div class="collapse" id={'collapse' + prob.problem_id}>
                  <div class="card card-body">
                    <h6>AnsType :{prob.data.ansType}</h6>
                    <h6>Setter : {prob.author_name}</h6>
                    <h6>Category: {prob.data.category} </h6>
                    <h6>Grade: {prob.grade} </h6>
                    <h6>InteractiveType : {prob.data.interactiveType}</h6>
                    <h6>Status : {prob.islive ? 'Approved' : 'Not Approved'}</h6>
                    <h6><b>Series_name</b> : {prob.series_name}</h6>
             
                    <h6><b>Doc_Id </b> : {prob.doc_id}</h6>
                    <h6><b>Admin Rating</b> : {prob.admin_rating}</h6>
                    <h6><b>Users' Rating</b> : {prob.user_rating}</h6>
                    <h6><b>Topic_level </b>: {level-5}</h6>
                    {
                      prob.translated == true || prob.translated == false ? <h6>ProblemId : {prob.problem_id}</h6> : <h6>ProblemId : {prob.prob_id}</h6>

                    }

                    {
                      prob.serial ? <h5>Serial:{prob.serial}</h5>
                        : null}
                    {
                      prob.series_id ? <h5>Series Id: {prob.series_id}</h5> : null
                    }

                    <h6>Mapped ProblemId : {prob.associated_problem_id}</h6>
                  </div>

</div>
</div>


)

        })

    }




</div>




))


}
</div>)

}

export default LiveProbs;