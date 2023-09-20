import React,{Component} from "react"
import {useSelector} from "react-redux"
import {keys} from "../keys"
import axios from "axios"
import {fetchSerieses} from "../actions/seriesAction"
import {connect} from "react-redux"
import Series from "./Edit/Series"
import Navbar from "./Navbar"
import {Link} from "react-router-dom"
import {link} from "../base_url"
class AllSerieses extends Component{
state={

name:"",
description:"",
serial:"",
islive:"",
nproblem:"",
logo:"",
topic_id:"",
currentSeries:null,
state:0,
serieses:[]

}
componentDidMount=()=>{
 
}

setSeries=()=>{
  this.setState({
    serieses:this.props.allserieses
  })

}
change=(e)=>{
  this.setState({
    [e.target.name]:e.target.value
  })
}
setCurrentSeriesToNull=()=>{
  this.setState({currentSeries:null})
}
demo=(series)=>{

 return (
<div>
  <Series series={series}/>
</div>


 )
}
submitNProblem=(id)=>{
 let  temp={
series_id:id,
nproblem:this.state.nproblem
  }
  axios({
    method: 'post',
    url: link.url+'admin/editSeriesProblemCount',
    data: temp,
    headers:{
      'authorization':keys.authorization,
    }
  }).then(res=>{
    console.log(res.data);
    alert("Successfully edited nproblem");
  
  }).catch(e=>console.log(e))


}
submit=()=>{
  let temp={}
  temp["series"]=this.state;
 

axios({
  method: 'post',
  url: link.url+'admin/addSeries',
  data: temp,
  headers:{
    'authorization':keys.authorization,
  }
}).then(res=>{
  console.log(res.data);
  alert("Successfully created");

}).catch(e=>console.log(e))



}
searchText=(text)=>{
let temp=[];

  this.props.allserieses.forEach(e=>{


if(e.name.toLowerCase().includes(text.toLowerCase())){
//document.getElementById(e.series_id).style.display="none";
temp.push(e);
}
// else{
//   document.getElementById(e.series_id).style.display="block";
// }

this.setState({
serieses:temp
})

  })
}
render(){

    return (
<div>
<Navbar fun={this.searchText}/> 
<button type="button" className="btn btn-outline-success btn-lg mt-3 mx-3" data-toggle="modal" data-target="#exampleModalLong">
 Add Series
</button>

<button type="button" className="btn btn-success btn-lg mt-3 ml-3" onClick={()=>{ this.props.serieses();
 
 setTimeout(this.setSeries,2000) }} >
Load Serieses
</button>
<div className="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <form>
  <div class="form-group">
    <label for="series_title">Series Title</label>
    <input onChange={this.change} type="text" class="form-control" id="series_title" name="name"/>
  </div>
  <div class="form-group">
    <label for="series_des">Description</label>
    <textarea onChange={this.change}  type="text" class="form-control" id="series_des" name="description"/>
  </div>
  <div class="form-group">
    <label for="topic_id">Topic Id</label>
    <input onChange={this.change}  type="text" class="form-control" id="topic_id" name="topic_id"/>
  </div>
  <div class="form-group">
    <label for="series_logo">Logo</label>
    <input onChange={this.change}  type="text" class="form-control" id="series_logo" name="logo"/>
  </div>
  <div class="form-group">
    <label for="series_live">isLive</label>
    <input onChange={this.change}  type="text" class="form-control" id="series_live" name="islive"/>
  </div>
  <div class="form-group">
    <label for="series_nProblems">Number of Problem</label>
    <input onChange={this.change}  type="text" class="form-control" id="series_nProblems" name="nproblem"/>
  </div>
  <div class="form-group">
    <label for="series_des">Serial</label>
    <input onChange={this.change}  type="text" class="form-control" id="series_des" name="serial"/>
  </div>
  

</form>
      </div>
      <div className="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button onClick={this.submit} type="button" class="btn btn-primary">Submit</button>
      </div>
    </div>
  </div>
</div>
{  this.state.serieses && this.state.serieses.map((series,i)=>{

return (
<div  key={series.series_id} class="card mt-5" style={{width: '20rem',margin:"auto"}} id={series.series_id}>
  <img src={series.logo} className="img-fluid rounded-circle w-50 mb-3 m-auto" alt="..."/>
  <div className="card-body">
    <h2 className="card-title">{series.name}</h2>
    <p class="card-text">{series.description}</p>
    <p>

  <button className="btn btn-primary mx-2" type="button" data-toggle="collapse" data-target={'#collapse'+series.series_id}  aria-expanded="false" aria-controls="collapseExample">
     Details
  </button>
  <button onClick={async()=>{await this.setState({currentSeries:series})}} type="button" className="btn btn-info ml-3 mx-2" data-toggle="modal" data-target="#editSeries">
 Edit
</button> 
<button type="button" className="btn btn-primary ml-3 mx-2 mt-4" data-toggle="collapse" data-target={'#collapse2'+series.series_id}>
 nProblems
</button> 
<Link to={{
  pathname: `/addTutorial/${series.series_id}`,
 
}}>
<button type="button" className="btn btn-primary ml-1 mt-4" >
Add Tutorial
</button> </Link>
{ this.state.currentSeries &&
<Series series={this.state.currentSeries} setCurrentSeriesToNull={this.setCurrentSeriesToNull}/>
}


 
</p>
<div class="collapse" id={'collapse'+series.series_id}>
  <div class="card card-body">
<h5>No of Problems : {series.nproblem}</h5>


  <h5>Serial: {series.serial}</h5>

  <h5>Series Id: {series.series_id} </h5>


  </div>
</div>

<div class="collapse" id={'collapse2'+series.series_id}>
<div class="card card-body">
<input onChange={(e)=>this.setState({nproblem:e.target.value})} placeholder="Enter no of problems" type="text" class="form-control" name="nProblem" />
<button onClick={()=>this.submitNProblem(series.series_id)} className="btn btn-primary py-3 my-3" >Submit</button>

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
     serieses:async()=>await fetchSerieses(dispatch)
  }
  }
  const mapStateToProps=(state)=>{
  return{

  allserieses:state.seriesReducer}
  }


export default connect(mapStateToProps,mapDispatchToProps)(AllSerieses);