import React from "react"
import {useState} from "react"
import {useDispatch} from "react-redux"
import {searchText} from "../actions"
import {Link} from "react-router-dom"
import Allproblems from "./Allproblems"
import firebase from "../firebase"
const Navbar=(props)=>{
const [search,setText]=useState("");
const dispatch=useDispatch();

const signout=()=>{
const auth=firebase.auth();
auth.signOut()
}

return (
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="/">Web Admin</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="/allTopics" >Topics<span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="/allSerieses" >Serieses<span class="sr-only">(current)</span></a>
      </li>
      {/* <li class="nav-item active">
        <a class="nav-link" href="/allProblems" >Problems<span class="sr-only">(current)</span></a>
      </li> */}
         <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
          Problems
        </a>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="/allProblems" >All Problems</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="/probStats">Stats</a>
       
        
        </div>
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="/allTests" >Tests<span class="sr-only">(current)</span></a>
      </li>
      <li  style={{paddingTop:"10px"}}>
        <a style={{marginLeft:"80vh",cursor:"pointer",color:"white"}}   onClick={signout} >SignOut<span class="sr-only">(current)</span></a>
      </li>
  
    </ul>
    
  <form class="form-inline  my-lg-0 search" style={{paddingBottom:"20px"}}>
<input name="search" onChange={(e)=>props.fun(e.target.value)} class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
 
   </form>
  </div>
</nav>


	)

}

export default Navbar;