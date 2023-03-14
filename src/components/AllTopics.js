
  
import axios from "axios"
import React,{Component} from "react"
import {keys} from "../keys"
import {fetchTopics} from "../actions/topicAction"
import Topic from "./Edit/Topic"
import { useHistory } from "react-router-dom";
import {connect} from "react-redux"
import Navbar from "./Navbar"
import {link} from "../base_url"
class AllTopics extends Component{

state={

  name:"",
  subject:"",
  description:"",
  logo:"",
  islive:"",
  nseries:"",
  lang:"",
  serial:"",
  nproblem:"",
  level_title:"",
  level_des:"",
  level:"",
  topics:[],
  tempTopics:[],
  currentTopic:null,
  lang:'en'

  


}
getLang=(e)=>{
  this.setState({
    topics:[]
  })
if(e.target.checked){

//this.getTopics('bn');
this.setState({lang:'bn'});

}
else{
//this.getTopics('en');
console.log('en');
this.setState({lang:'en'});
}

}
getTopics=(slug)=>{


}
componentDidMount=()=>{
//if(this.state.lang=='en' || this.state.lang="")
//this.getTopics('en');

}
setTopics=()=>{
  this.setState({
    topics:this.tempTopics
  })
}

setCurrentTopicToNull=()=>{
  this.setState({currentTopic:null})
}

change=(e)=>{
  this.setState({
    [e.target.name]:e.target.value
  })
}

assignLevel=(id)=>{

//console.log(this.state.level,id);
if(this.state.level!=""){
const temp={

  "topic_id":id,
  "level_id":this.state.level
}
axios({
  method: 'post',
  url: link.url+'/admin/topic/assignLevel',
  data: temp,
  headers:{
    'authorization':keys.authorization,
  }
}).then(res=>{
  console.log(res.data)
alert("success");

}).catch(e=>console.log(e))
}
else{
  alert("error")
}

}
loadTopics=()=>{

axios.get(link.url+'topics/'+this.state.lang,{

headers:{
	'authorization':keys.authorization,

}

}).then(res=>{
 this.setState({
    topics:res.data,

  })
	console.log(res.data)
}).catch(e=>console.log(e))
//this.setTopics();
}

submit=async()=>{

console.log(this.state);
let temp={};
temp["topic"]=this.state;
console.log(temp)
axios({
  method: 'post',
  url: link.url+'/admin/addTopic',
  data: temp,
  headers:{
    'authorization':keys.authorization,
  }
}).then(res=>{
  console.log(res.data)
}).catch(e=>console.log(e))


}
submitNProblem=(id)=>{
  let  temp={
topic_id:id,
 nproblem:this.state.nproblem
   }
   axios({
     method: 'post',
     url: link.url+'/admin/editTopicProblemCount',
     data: temp,
     headers:{
       'authorization':keys.authorization,
     }
   }).then(res=>{
     console.log(res.data);
     alert("Successfully edited nproblem");
   
   }).catch(e=>console.log(e))
 
 
 }
levelData=(e)=>{

this.setState({
  [e.target.name]:e.target.value
})

}

submitLevelData=()=>{
console.log(this.state.level_title)
const temp={

  "title":this.state.level_title,
  "description":this.state.level_des
}
console.log(temp)
axios({
  method: 'post',
  url: link.url+'/admin/addLevel',
  data: temp,
  headers:{
    'authorization':keys.authorization,
  }
}).then(res=>{
  console.log(res.data)
}).catch(e=>console.log(e))

}

searchText=(text)=>{
let temp = []
  this.props.alltopics.forEach(e=>{

if(e.name.toLowerCase().includes(text.toLowerCase())){
temp.push(e);
}
this.setState({
  topics:temp
})


  })
}

render(){

    return (
   
<div>


<Navbar fun={this.searchText}/>


<button type="button" className="btn btn-outline-success btn-lg my-3" data-toggle="modal" data-target="#exampleModalLong">
 Add Topic
</button>
<button type="button" className="btn btn-outline-success btn-lg ml-5 my-3" data-toggle="modal" data-target="#exampleModalLong2">
 Add Level
</button>
<div class="form-check form-switch">
 <input class="form-check-input" style={{marginLeft:"-50px"}} type="checkbox" id="flexSwitchCheckDefault" onChange={this.getLang}/>
 <label class="form-check-label" for="flexSwitchCheckDefault">Bangla</label>
</div>
<button type="button" onClick={this.loadTopics} className="btn btn-outline-primary btn-lg my-3 mx-3" data-toggle="modal" data-target="#exampleModalLong3">
 Get Topics
</button>

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
      <form>
  <div class="form-group">
    <label for="Level_title">Title</label>
    <input onChange={this.levelData} type="text" class="form-control" name="level_title" />
    <label for="Level_Description">Description</label>    
    <input onChange={this.levelData} type="text" class="form-control" name="level_des" />
  </div>
      </form>
</div>
<div className="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={this.submitLevelData}>Submit</button>
      </div>
</div>
</div>
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
    <label for="topic_title">Topic Title</label>
    <input onChange={this.change} type="text" class="form-control" name="name" />
  </div>
  <div class="form-group">
    <label for="topic_des">Description</label>
    <textarea onChange={this.change}  type="text" class="form-control" name="description"></textarea>
  </div>
  <div class="form-group">
    <label for="topic_sub">Subject</label>
    <input onChange={this.change}  type="text" class="form-control" name="subject"/>
  </div>
  <div class="form-group">
    <label for="topic_logo">Logo</label>
    <input onChange={this.change}  type="text" class="form-control" name="logo"/>
  </div>
  <div class="form-group">
    <label for="topic_live">isLive</label>
    <input onChange={this.change}  type="text" class="form-control" name="islive"/>
  </div>
  <div class="form-group">
    <label for="topic_nSeries">Number of Series</label>
    <input onChange={this.change}  type="text" class="form-control" name="nseries"/>
  </div>
  <div class="form-group">
    <label for="topic_nSeries">Number of Problems</label>
    <input onChange={this.change}  type="text" class="form-control" name="nproblem"/>
  </div>
  <div class="form-group">
    <label for="topic_lang">Language</label>
    <input onChange={this.change}  type="text" class="form-control" name="lang"/>
  </div>
  <div class="form-group">
    <label for="topic_serial">Serial</label>
    <input onChange={this.change}  type="text" class="form-control" name="serial"/>
  </div>
 
  <div class="form-group">
    <label for="topic_level">Level</label>
    <input type="text" class="form-control" name="level"/>
  </div>
</form>
      </div>
      <div className="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={this.submit}>Submit</button>
      </div>
    </div>
  </div>
</div>
{  this.state.topics &&this.state.topics.map(topic=>{
return (
<div>
<div  key={topic.topic_id} class="card mt-5" style={{width: '20rem',margin:"auto"}} id={topic.topic_id} >
  <img src={topic.logo} className="img-fluid rounded-circle w-50 mb-3 m-auto" alt="..."/>
  <div className="card-body">
   <a style={{textDecoration:"none"}} href={'/topics/'+topic.topic_id}> <h2 className="card-title">{topic.name}({this.state.lang})</h2></a>
    <p class="card-text">{topic.description}</p>
    <p>

  <button className="btn btn-primary" type="button" data-toggle="collapse" data-target={'#collapse'+topic.topic_id}  aria-expanded="false" aria-controls="collapseExample">
     Details
  </button>
  <button onClick={()=>this.setState({currentTopic:topic})} className="btn btn-info ml-3"  data-toggle="modal" data-target="#editTopic">
    Edit
 </button>
 <button className="btn btn-success ml-3 pl-3" type="button" data-toggle="collapse" data-target={'#collapse2'+topic.topic_id}  aria-expanded="false" aria-controls="collapseExample" >Add level</button>
 <button className="btn btn-primary ml-2 mt-5" type="button" data-toggle="collapse" data-target={'#collapse3'+topic.topic_id}  aria-expanded="false" aria-controls="collapseExample" >nProblems</button>

 {this.state.currentTopic &&
  <Topic topic={this.state.currentTopic} setCurrentTopicToNull={this.setCurrentTopicToNull}/>

 }
</p>
<div class="collapse" id={'collapse'+topic.topic_id}>
  <div class="card card-body">
<h5>No of Problems : {topic.nproblem}</h5>
<h5>No of Serieses : {topic.nseries}</h5>
<h5>Topic id: {topic.topic_id}</h5>

  <h5>Serial: {topic.serial}</h5>


  </div>
</div>
<div class="collapse" id={'collapse2'+topic.topic_id}>
  <div class="card card-body">
<input placeholder="Enter Level" type="text" class="form-control" name="level" onChange={(e)=>{this.setState({[e.target.name]:e.target.value})}}/>


<button  className="btn btn-primary py-3 my-3" onClick={()=>{this.assignLevel(topic.topic_id)}}>Submit</button>


  </div>
</div>

<div class="collapse" id={'collapse3'+topic.topic_id}>
<div class="card card-body">
<input onChange={(e)=>this.setState({nproblem:e.target.value})} placeholder="Enter no of problems" type="text" class="form-control" name="nProblem" />
<button  onClick={(e)=>this.submitNProblem(topic.topic_id)} className="btn btn-primary py-3 my-3" >Submit</button>

  </div>
</div>



  </div>
</div>
</div>
)

})}
</div>


    )
}


}
const mapDispatchToProps=(dispatch)=>{
  return {
     topics:async(slug)=>await fetchTopics(dispatch,slug)
  }
  }
  const mapStateToProps=(state)=>{
  return{

  alltopics:state.topicReducer}
  }
  
export default connect(mapStateToProps,mapDispatchToProps)(AllTopics);

