import React,{Component} from "react"
import axios from "axios"
import {keys} from "../../keys"
import firebase from "../../firebase"
import {link} from "../../base_url"
class Problem extends Component{

    state={

grade:this.props.problem.grade,
desc:this.props.problem.data.description,
serial:this.props.problem.serial,
series_id:this.props.problem.series_id,
title:this.props.problem.title,
difficulty:this.props.problem.difficulty,
isPremium:this.props.problem.isPremium,
isLive:this.props.problem.isLive,
statement:this.props.problem.data.statement,
explanation:this.props.problem.data.explanation,
is_for_test:this.props.problem.is_for_test!=null?this.props.problem.is_for_test:false


    }
    componentDidMount(){

      console.log(this.props.problem)
    }
    problemChange=(e)=>{

        this.setState({
            [e.target.name]:e.target.value
        })
    }
  
    post=()=>{
        let temp={}
        let final={}
        temp=this.props.problem;
        temp["serial"]=this.state.serial;
        temp["grade"]=this.state.grade;
        temp["series_id"]=this.state.series_id;
        temp["problem_id"]=temp["prob_id"] ? temp["prob_id"]:temp["problem_id"];
        temp["title"]=this.state.title;
        temp["difficulty"]=this.state.difficulty;
        temp["isPremium"]=this.state.isPremium;
        temp["islive"]=this.state.isLive;
        temp["is_for_test"]=this.state.is_for_test;
      
        final["problem"]=temp;
       console.log(final)
       axios({
        method: 'post',
        url: link.url+'admin/editProblem',
        data: final,
        headers:{
          'authorization':keys.authorization,
        }
      }).then(res=>{
        
        alert("Problem successfully edited");
        firebase.firestore().collection("problem").doc(this.props.problem.doc_id).update({
          title:this.state.title,
          grade:this.state.grade,
          difficulty:this.state.difficulty,
          serial:this.state.serial,
          series_id:this.state.series_id,
          isPending:false,
          isPremium:this.state.isPremium?this.state.isPremium:false,
          isLive:this.state.isLive,
         islive:true,
         is_for_test:this.state.is_for_test


  
      })


      }).catch(e=>console.log(e))
      }
     
       
    
    render(){
        return (
   
<div className="modal fade " id="editProblem" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false"  aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">Edit Problem</h5>
      
      </div>
      <div className="modal-body">
      <form>

      <div class="form-group">
    <label for="grade">Title</label>
    <input onChange={this.problemChange}  value={this.state.title} type="text" class="form-control" name="title"/>
  </div>

<div class="form-group">
    <label for="serial">Serial</label>
    <input onChange={this.problemChange}  value={this.state.serial} type="text" class="form-control" name="serial"/>
  </div>
 
  <div class="form-group">
    <label for="series_id">Series id</label>
    <input onChange={this.problemChange} value={this.state.series_id} type="text" class="form-control" name="series_id"/>
  </div>

{this.props.problem.translated==true||this.props.problem.translated==false?  <div class="form-group">
    <label for="grade">Description</label>
    <input onChange={this.problemChange}  value={this.state.desc} type="text" class="form-control" name="description"/>
  </div>:null}

  {this.props.problem.translated==true||this.props.problem.translated==false?  <div class="form-group">
    <label for="grade">Explanation</label>
    <input onChange={this.problemChange}  value={this.state.explanation} type="text" class="form-control" name="explanation"/>
  </div>:null}
{this.props.problem.translated==true||this.props.problem.translated==false?  <div class="form-group">
    <label for="grade">Statement</label>
    <input onChange={this.problemChange}  value={this.state.statement} type="text" class="form-control" name="statement"/>
  </div>:null}
  <div class="form-group">
    <label for="Difficulty">Difficulty</label>
    <input onChange={this.problemChange}  value={this.state.difficulty} type="text" class="form-control" name="difficulty"/>
  </div>
{this.state.isPremium?
(
<div class="form-check">
  <input onClick={(e)=>this.setState({isPremium:!this.state.isPremium})} class="form-check-input" type="checkbox" value={this.state.isPremium} id="flexCheckDefault" checked />
  <label class="form-check-label" for="flexCheckDefault" style={{marginLeft:"70px"}}>
    Premium
  </label>
</div>  
):
(
<div class="form-check">
  <input onClick={(e)=>this.setState({isPremium:!this.state.isPremium})} class="form-check-input" type="checkbox" value={this.state.isPremium} id="flexCheckDefault" />
  <label class="form-check-label" for="flexCheckDefault" style={{marginLeft:"70px"}}>
    Premium
  </label>
</div>  
)
}

{this.state.isLive?
(
<div class="form-check">
  <input onClick={(e)=>this.setState({isLive:!this.state.isLive})} class="form-check-input" type="checkbox" value={this.state.isLive} id="flexCheckDefault2" checked />
  <label class="form-check-label" for="flexCheckDefault2" style={{marginLeft:"70px"}}>
    IsLive
  </label>
</div>  
):
(
<div class="form-check">
  <input onClick={(e)=>this.setState({isLive:!this.state.isLive})} class="form-check-input" type="checkbox" value={this.state.isLive} id="flexCheckDefault2" />
  <label class="form-check-label" for="flexCheckDefault2" style={{marginLeft:"70px"}}>
    IsLive
  </label>
</div>  
)
}

  
{this.state.is_for_test?
(
<div class="form-check">
  <input onClick={(e)=>this.setState({is_for_test:!this.state.is_for_test})} class="form-check-input" type="checkbox" value={this.state.is_for_test} id="flexCheckDefault3" checked />
  <label class="form-check-label" for="flexCheckDefault3" style={{marginLeft:"70px"}}>
  IsForTest
  </label>
</div>  
):
(
<div class="form-check">
  <input onClick={(e)=>this.setState({is_for_test:!this.state.is_for_test})} class="form-check-input" type="checkbox" value={this.state.is_for_test} id="flexCheckDefault3" />
  <label class="form-check-label" for="flexCheckDefault3" style={{marginLeft:"70px"}}>
  IsForTest
  </label>
</div>  
)
}
    
   
  
</form>

      </div>
      <div className="modal-footer">
        <button onClick={()=>this.props.setCurrentProbToNull()} type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={this.post}>Submit</button>
      </div>
    </div>
  </div>
</div>


        )
    }
}

export default Problem;