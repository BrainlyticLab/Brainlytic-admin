import React, { Component } from "react"
import { useSelector } from "react-redux"
import firebase from "../firebase"
import { connect } from "react-redux"
import { fetchProblems } from "../actions/problemAction"
import { keys } from "../keys"
import axios from "axios"
import Problem from "./Edit/Problem"
import ProblemEdit from "./Edit/ProblemEdit"
import Navbar from "./Navbar"
import {link} from "../base_url"
import { Link } from "react-router-dom"
var c = 0;
var k=0;
class Allproblems extends Component {
  state = {

    structure: [],
    mainAra: [],
    category: {},
    f: [],
    confirmed: [],
    serial: "",
    series_id: "",
    currentProblem: null,
    count: 0,
    width: '',
    lang: "en",
    loading: 0,
    bnLoading: 0,
    allLoading:0,
UnMappedLoading:0,
    mapped_id: "",
    setters:[],
    level:"",
    diff:"",
    lastDocument:null,
    start:0,
    end:20,
    setter:""

  }
  componentDidMount = async () => {
  

    c = 0;
    let p = [];
    let t = {};
    let tempData = {}
    let temp = {};
    let dataTemp = {};
    let mainData = {}
   await  firebase.firestore().collection('profile').get().then(docs => {
      docs.forEach(doc => {
        this.setState(prevState => ({
          setters: [...prevState.setters,{data:doc.data(),id:doc.id}]
        }))   

})
      
    })
var cc=0;

    firebase.firestore().collection('problem').where("draft","==",false).get().then(docs => {
      
      
     
      docs.forEach(doc => {



        this.setState({lastDocument:doc})
        tempData = {}
        temp = {};
        t = {}
        dataTemp = {};
        mainData = {}
        if (doc.data().width)
          this.setState({ width: doc.data().width })
        if (doc.data().interactiveType == 7) { }

        let cat = doc.data().cat.split(">")[1];
        if (cat) {
          
          if (!(this.state.category.hasOwnProperty(cat.toLowerCase())))
            this.state.category[cat.toLowerCase()] = Object.keys(this.state.category).length + 1;
        }
        else {
      
          cat = doc.data().cat.toLowerCase();
          if (!(this.state.category.hasOwnProperty(doc.data().cat.toLowerCase())))
            this.state.category[doc.data().cat.toLowerCase()] = Object.keys(this.state.category).length + 1;

        }
        temp["version"] = 1;

        if (doc.data().isPending) {
          t["isPending"] = doc.data().isPending;
          c += 1;

        }
        else {
          t["isPending"] = false;


        }

        t["author_id"] = doc.data().uid;
    
        t["setter_name"]=this.getName(doc.data().uid);
        if (doc.data().description) {
          temp["description"] = doc.data().description;
        }
        temp["latex"]=doc.data().latex?doc.data().latex:"";
        if (doc.data().hint) {
          temp["hint"] = doc.data().hint;
        }
        t["doc_id"] = doc.id;
        temp["category"] = cat;
        t["difficulty"] = doc.data().difficulty == 1 ? "easy" : (doc.data().difficulty == 2 ? "medium" : "hard");
        temp["lang"] = doc.data().language == 1 ? "en" : "bn";
        t["title"] = doc.data().title;
        temp["interactiveType"] = doc.data().interactiveType == 1 ? "none" : doc.data().interactiveType == 3 ? "dragAndDrop-2" : doc.data().interactiveType == 4 ? "dragAndDrop-1" : doc.data().interactiveType == 5 ? "rearrange" : doc.data().interactiveType == 6 ? "matchstick" : doc.data().interactiveType == 7 ? "venn" : doc.data().interactiveType == 8 ? "dragAndDrop-3-Grid" : "exclusion_grid";
        t["timestp"] = doc.data().timestamp;

        t["logo"] = doc.data().logo;
        t["grade"] = doc.data().grade;
        temp["ansType"] = doc.data().ansType == 1 ? "mcq" : (doc.data().ansType == 2 ? "text" : "interactive");
        if (doc.data().prob_id) {
          t["prob_id"] = doc.data().prob_id
        }
        if (doc.data().isLive == true || doc.data().isLive == false) {
          t["isLive"] = doc.data().isLive;

        }
        if (doc.data().isApproved == true || doc.data().isApproved == false) {
          t["islive"] = doc.data().isApproved;
        }
        else {
          if (doc.data().islive == true || doc.data().islive == false) {
            t["islive"] = doc.data().islive;
          } else {
            t["islive"] = false;

          }
        }
        if (doc.data().tags) {
          temp["tags"] = doc.data().tags;
        }
        if (doc.data().serial) {
          t["serial"] = doc.data().serial
        }
        if (doc.data().series_id) {
          t["series_id"] = doc.data().series_id
        }
        temp["type"] = temp.interactiveType;
        temp["statement"] = doc.data().statement;
        if (doc.data().restrictions) {
          temp["restriction"] = doc.data().restrictions;
        }

        temp["explanation"] = doc.data().explanation;
        dataTemp["type"] = temp.ansType;
        if (dataTemp.type == "mcq" && temp.type == "none") {
          mainData["options"] = doc.data().options;
          mainData["answer"] = doc.data().options[doc.data().answer - 1];

        }
        else if (temp.type == "none" && dataTemp.type == "text") {
          mainData["answer"] = doc.data().answer;
        }
        else if (temp.type == "exclusion_grid") {
try{

          let ques = JSON.parse(doc.data().questionnaire);

          dataTemp["rowHeading"] = ques.rows;
          dataTemp["columnHeading"] = ques.cols;
          dataTemp["cell"] = ques.data;
          dataTemp["initialState"] = ques.state;
          if (dataTemp.type == "interactive") {
            let ans = JSON.parse(doc.data().answer);
            mainData["answer"] = ans.state;

          }

          else if (dataTemp.type == "mcq") {
            mainData["options"] = doc.data().options;
            mainData["answer"] = doc.data().options[doc.data().answer - 1];
          }
          else if (dataTemp.type == "text") {
            mainData["answer"] = doc.data().answer;
          }

          }
catch(e){

}
        }
        else if (temp.type === "dragAndDrop-2") {
          let ques=""
         
    
          if(doc?.data()?.questionnaire)
           ques = JSON.parse(doc?.data()?.questionnaire)
          if (dataTemp.type == "mcq") {
            mainData["options"] = doc.data().options;
            mainData["answer"] = doc.data().options[doc.data().answer - 1];

          }
          else if (dataTemp.type == "text") {
            mainData["answer"] = doc.data().answer;
          }
          temp["questionnaire"] = ques;

        }
        else if (temp.type == "dragAndDrop-1") {

          let ques = JSON.parse(doc.data().questionnaire);
          if (dataTemp.type == "interactive") {
            let ans = JSON.parse(doc.data().answer);
            mainData["temp"] = ans.items;
            let array = []
            ans.containers.forEach((e, idx) => {
              let obj = {};
              obj["label"] = e;
              obj["items"] = ans.schema[idx];
              array.push(obj)

            })

            mainData["answer"] = array;

          }
          else if (dataTemp.type == "mcq") {
            mainData["options"] = doc.data().options;
            mainData["answer"] = doc.data().options[doc.data().answer - 1];

          }
          else if (dataTemp.type == "text") {
            mainData["answer"] = doc.data().answer;
          }
          dataTemp["unselected"] = ques.items;

          let array = []
          ques.containers.forEach((e, idx) => {
            let obj = {};
            obj["label"] = e;
            obj["items"] = ques.schema[idx];
            array.push(obj)

          })
          dataTemp["containers"] = array;

        }

        else if (temp.type === 'dragAndDrop-3-Grid') {


          let ques = JSON.parse(doc.data().questionnaire);

          if (dataTemp.type == "interactive") {
            let ans = JSON.parse(doc.data().answer);
            mainData["temp"] = ans.items;
            let array = []
            ans.containers.forEach((e, idx) => {
              let obj = {};
              obj["label"] = e;
              obj["items"] = ans.schema[idx];


              array.push(obj)

            })

            mainData["answer"] = array;

          }
          else if (dataTemp.type == "mcq") {
            mainData["options"] = doc.data().options;
            mainData["answer"] = doc.data().options[doc.data().answer - 1];

          }
          else if (dataTemp.type == "text") {
            mainData["answer"] = doc.data().answer;
          }
          dataTemp["unselected"] = ques.items;

          let array = []
          ques.containers.forEach((e, idx) => {
            let obj = {};
            obj["label"] = e;
            obj["items"] = ques.schema[idx];
            array.push(obj)

          })
          dataTemp["active"] = ques.active;
          dataTemp["nCols"] = ques.nCols;
          dataTemp["nRows"] = ques.nRows;

          dataTemp["containers"] = array;

        }
        else if (temp.type == "rearrange") {
          let ques = JSON.parse(doc.data().questionnaire);
          if (dataTemp.type == "interactive") {
            let ans = JSON.parse(doc.data().answer);
            mainData["answer"] = ans.items;

          }
          else if (dataTemp.type == "mcq") {
            mainData["options"] = doc.data().options;
            mainData["answer"] = doc.data().options[doc.data().answer - 1];

          }
          else if (dataTemp.type == "text") {

            mainData["answer"] = doc.data().answer;
          }

          dataTemp["fields"] = ques.items;

        }
        else if (temp.type == "matchstick") {
          let ques = JSON.parse(doc.data().questionnaire);
          if (dataTemp.type == "interactive") {
            let ans = JSON.parse(doc.data().answer);
            mainData = ans;
          }
          else if (dataTemp.type == "mcq") {
            mainData["options"] = doc.data().options;
            mainData["answer"] = doc.data().options[doc.data().answer - 1];

          }
          else if (dataTemp.type == "text") {

            mainData["answer"] = doc.data().answer;
          }


          dataTemp = ques;
          dataTemp["type"] = temp.ansType;

        }
        else if (temp.type == "venn") {
          let ques = JSON.parse(doc.data().questionnaire);
          if (dataTemp.type == "interactive") {
            let ans = JSON.parse(doc.data().answer);
            mainData["answer"] = ans;
          }
          else if (dataTemp.type == "mcq") {
            mainData["options"] = doc.data().options;
            mainData["answer"] = doc.data().options[doc.data().answer - 1];

          }
          else if (dataTemp.type == "text") {

            mainData["answer"] = doc.data().answer;
          }
          dataTemp = ques;
          dataTemp["type"] = temp.ansType;



        }


        dataTemp["data"] = mainData;
        temp["data"] = dataTemp;
        temp["width"] = this.state.width
        t["data"] = temp;
        t["isLive"] = doc.data().isLive !== null || doc.data().isLive !== undefined ? doc.data().isLive : true;
        t["isPremium"] = doc.data().isPremium !== null ? doc.data().isPremium : false;
        t["is_for_test"] = doc.data().is_for_test !== null ? doc.data().is_for_test : false;
   
        p.push(t);
      

      })
    })


    await this.setState({
      structure: p,
      count: c,
    //  end:1000
     end:p.length==0?20:p.length
      
    })
  


  }
getName= (id) =>{
  let name;
  this.state.setters.map(s=>{
    
  if(s.id==id){
   
    name=s.data.name;
    
  }
 })
 return name;
}
  click = async () => {
    
 
    await this.setState({ allLoading: 1 })
    this.setState({
      f: this.state.structure,
      mainAra: this.state.structure
    })

    this.state.f.length>0 && this.state.f.slice(this.state.start,this.state.end).filter(e=>e.difficulty.includes(this.state.diff)).forEach(e => {

      document.getElementById(e.doc_id).style.display = "block"
    },

    )
    this.setState({ allLoading: 0 }) 
  }

  go=(prob)=>{

   let level=prob.level_id-5;
   console.log(prob)

let link=`https://brainlytic.org/lang/en/level/${level}/series/${prob.series_id}/problem/${prob.serial}`

const dom=document.getElementById("prob_link");;
dom.href=link;
dom.click();
  }
  editMappedProblem=async (prob)=>{


let id1=prob.prob_id?prob.prob_id:prob.problem_id;

let id2=parseInt(this.state.mapped_id);
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

  bnclick = async () => {
    await this.setState({ bnLoading: 1 })
 

    axios({
      method: 'get',
      url: link.url+'admin/getAllBanglaProblems',

      headers: {
        'authorization': keys.authorization,
      }
    }).then(res => { this.setState({ bnLoading: 0 }); this.setState({ f: res.data }); })
      .catch(e => { this.setState({ bnLoading: 0 }); console.log(e) })



  }


 UnMappedClick = async () => {
    await this.setState({ UnMappedLoading: 1 })
   

    axios({
      method: 'get',
      url: link.url+'admin/getAllProblems',

      headers: {
        'authorization': keys.authorization,
        
      }
    }).then(res => { this.setState({ UnMappedLoading: 0 } ); 
console.log(res.data.length)
var a=res.data.filter(function(item)
 {


  return item.associated_problem_id==null;
 });

a.sort(function(x, y){
  return -x.timestp + y.timestp;
})
this.setState({ f: a });
 })
      .catch(e => { this.setState({ UnMappedLoading: 0 }); console.log(e) })



  }


  disapprove = (id) => {
    firebase.firestore().collection("problem").doc(id).update({
      isApproved: false
    })


  }
  setCurrentProbToNull = () => {
    this.setState({
      currentProblem: null
    })
  }


  delete = (id, doc_id) => {
    let data = {};
    data["problem_id"] = id;
    axios({
      method: 'post',
      url: link.url+'admin/deleteProblem',
      data: data,
      headers: {
        'authorization': keys.authorization,
      }
    }).then(res => {


      firebase.firestore().collection("problem").doc(doc_id).update({
        isApproved: false,


      })
      alert("Problem deleted");

    })
  }

  searchText = (text) => {
    
    let temp = [];

    this.state.mainAra.forEach(e => {
      if (text == "waiting") {

        if (e.isPending) {

          temp.push(e);
        }
        else {

        }

      } else {
        if (e.title.toLowerCase().includes(text.toLowerCase())) {
          //document.getElementById(e.doc_id).style.transform = "rotate(45deg)";;


          temp.push(e);

        }
        else {

        }

      }
    }

    )

    this.setState({ f: temp })
  }

  getLang = (e) => {
    this.setState({
      f: []
    })
    if (e.target.checked) {


      this.setState({ lang: 'bn' });

    }
    else {


      this.setState({ lang: 'en' });
    }

  }
  submit = (prob, id) => {
    let temp = {};
    prob["serial"] = this.state.serial;

    prob["series_id"] = this.state.series_id;
    prob["islive"] = true;
    temp["problem"] = prob;

    axios({
      method: 'post',
      url: link.url+'admin/addProblem',
      data: temp,
      headers: {
        'authorization': keys.authorization,
      }
    }).then(res => {

      alert("problem successfully added");
      firebase.firestore().collection("problem").doc(id).update({
        isApproved: true,
        series_id: this.state.series_id,
        serial: this.state.serial,
        prob_id: res.data.id,
        isPending: false,
        isLive: true,
        isPremium: false,
        islive: true

      })
    }).catch(e => console.log(e))
  }



  render() {


    var currentTopics = [];

    return (

      <div >
        <Navbar fun={this.searchText} />


        <p style={{ cursor: 'pointer' }} onClick={() => this.searchText("waiting")}>Waiting Queue({c})</p>
       
        {/* <button className="btn btn-dark my-3" onClick={this.click}>Load Problems</button> */}
        <button class="btn btn-dark my-3 ml-4" type="button" onClick={this.click} >

        {this.state.allLoading == 0 ? null : <><span class="spinner-grow spinner-grow-sm pr-2" role="status" aria-hidden="true"></span>
        <span class="sr-only mr-2">Loading..</span></>}

          Load Problems
          
          
          </button>
        {/* <button className="btn btn-dark my-3 mx-3" onClick={this.bnclick}>Load Bangla Problems</button> */}

        <button class="btn btn-primary my-3 ml-4" type="button" onClick={this.bnclick} >

          {this.state.bnLoading == 0 ? null : <><span class="spinner-grow spinner-grow-sm pr-2" role="status" aria-hidden="true"></span>
            <span class="sr-only mr-2">Loading..</span></>}

          Load Bangla Problems</button>
  <button class="btn btn-dark my-3 ml-4" type="button" onClick={this.UnMappedClick} >
  
 {this.state.UnMappedLoading == 0 ? null : <><span class="spinner-grow spinner-grow-sm pr-2" role="status" aria-hidden="true"></span>
            <span class="sr-only mr-2">Loading..</span></>}

          Load UnMapped Problems</button>
  
          <div class="d">
  <label for="exampleInput1">Difficulty</label>
    {/* <label for="exampleInput1">Language (en or bn) </label> */}
    {/* <input onChange={(e)=>setLang(e.target.value)} style={{width:"50%",margin:"auto"}} type="text" class="form-control" id="exampleInput1" aria-describedby="emailHelp" /> */}
  <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
  
  value={this.state.diff}
  onChange={(e)=> this.setState({ diff: e.target.value })}
  >
  <option selected value="">All</option>
  <option value="easy">Easy</option>
  <option value="medium">Medium</option>
  <option value="hard">Hard</option>
  
</select>
  </div>

  <div class="d">
  <label for="exampleInput2">Authors</label>
    {/* <label for="exampleInput1">Language (en or bn) </label> */}
    {/* <input onChange={(e)=>setLang(e.target.value)} style={{width:"50%",margin:"auto"}} type="text" class="form-control" id="exampleInput1" aria-describedby="emailHelp" /> */}
  <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
  
  value={this.state.setter}
  onChange={(e)=> this.setState({ setter: e.target.value,start:0,end:this.state.f.length })}
  >
 <option selected value="">All</option>
{
  this.state.setters.length>0 && this.state.setters.sort(function(x, y){
    const titleA = x.data.name.toUpperCase();
    const titleB = y.data.name.toUpperCase();
    
  if (titleA < titleB) {
    return -1;
  }
  if (titleA > titleB) {
    return 1;
  }
  return 0;

  }).map(setter=>(

<>
<option value={setter.id}>{setter.data.name}</option>
</>


  ))
}

 

  
</select>
  </div>
        {
        this.state.f.length>0 && this.state.f.filter(e=>e.difficulty.includes(this.state.diff)).filter(e=>e.author_id.includes(this.state.setter)).slice(this.state.start,this.state.end)
      .sort(function(x, y){
          return y.timestp -x.timestp;
      })
        .map((prob, idx) => {
     
          return (
            <div key={prob.doc_id} class="card mt-5" style={{ width: '20rem', margin: "auto" }} id={prob.doc_id}>
      
              <img src={prob.logo} className="img-fluid rounded-circle w-50 mb-3 m-auto" alt="..." />
              <div className="card-body">
                <h2 className="card-title">{prob.title}</h2>
                <p class="card-text" >Problem Id -{prob.prob_id? prob.prob_id:prob.problem_id}</p>

                <p class="card-text" id={"pendingText" + prob.doc_id} style={{ color: 'red' }} >{prob.isPending ? "Pending" : ''}</p>
                <p>

                  <button className="btn btn-primary" type="button" data-toggle="collapse" data-target={'#collapse' + prob.doc_id} aria-expanded="false" aria-controls="collapseExample">
                    Details
                  </button>

                  {prob.translated !== true && prob.translated !== false ?
                    <button onClick={async () => { await this.setState({ currentProblem: prob }) }} type="button" className="btn btn-info ml-3" data-toggle="modal" data-target="#editProblem">
                      Edit
                    </button> : (<Link to={{
                      pathname: "/problem/" + prob.problem_id, myProps: {
                        problem: prob
                      }
                    }} >    <button type="button" className="btn btn-info ml-3" data-toggle="modal" data-target="#editProblem">
                        Edit
                      </button></Link>)
                  }
                  



                  {prob.series_id ?
                    <button onClick={() => this.delete(prob.prob_id, prob.doc_id)} className="btn btn-danger ml-3 pl-3">Delete</button> :
                    (<button className="btn btn-success ml-3 pl-3" type="button" data-toggle="collapse" data-target={'#collapse2' + prob.doc_id} aria-expanded="false" aria-controls="collapseExample" >Approve</button>)
                  }
                 {
                 prob.isPending ?null:(<> <button className="btn btn-primary ml-2 mt-5" type="button" data-toggle="collapse" data-target={'#collapse3' + prob.doc_id} aria-expanded="false" aria-controls="collapseExample" >Mapped Problem Id</button>
                  <button onClick={()=>this.go(prob)} className="btn btn-primary ml-2 mt-5" type="button"  > Go </button>
                 </> )
                }
                  <a id="prob_link" target="_blank"></a>
                </p>
                <div class="collapse" id={'collapse3' + prob.doc_id}>
                  <div class="card card-body">
                    <input onChange={(e) => this.setState({ mapped_id: e.target.value })} placeholder="Enter mapped problem id" type="text" class="form-control" name="mappedProblemId" />
                    <button onClick={(e) => this.editMappedProblem(prob)} className="btn btn-primary py-3 my-3" >Submit</button>

                  </div>
                </div>
                <div class="collapse" id={'collapse' + prob.doc_id}>
                  <div class="card card-body">
                    <h6>AnsType :{prob.data.ansType}</h6>
                    <h6>Setter : {prob.setter_name}</h6>
                    <h6>Category: {prob.data.category} </h6>
                    <h6>Grade: {prob.grade} </h6>
                    <h6>InteractiveType : {prob.data.interactiveType}</h6>
                    <h6>Status : {prob.islive ? 'Approved' : 'Not Approved'}</h6>
                    <h6><b>Series_name</b> : {prob.series_name}</h6>
                    <h6><b>Topic_name </b> : {prob.topic_name}</h6>
                    <h6><b>Doc_Id </b> : {prob.doc_id}</h6>
                    <h6><b>Topic_level </b>: {prob.level_id-5}</h6>
                    {
                      prob.translated == true || prob.translated == false ? <h6>ProblemId : {prob.problem_id}</h6> : <h6>ProblemId : {prob.prob_id}</h6>

                    }

                    {
                      prob.serial ? <h5>Serial:{prob.serial}</h5>
                        : null}
                    {
                      prob.series_id ? <h5>Series Id: {prob.series_id}</h5> : null
                    }

                    <h6>Mapped ProblemId {prob.associated_problem_id}</h6>
                  </div>
                </div>
                <div class="collapse" id={'collapse2' + prob.doc_id}>
                  <div class="card card-body">
                    <input placeholder="Enter series id" type="text" class="form-control" name="series_id" onChange={(e) => { this.setState({ [e.target.name]: e.target.value }) }} />
                    <input placeholder="Enter serial " type="text" class="form-control my-3 py-3" name="serial" onChange={(e) => { this.setState({ [e.target.name]: e.target.value }) }} />

                    <button className="btn btn-primary py-3 my-3" onClick={() => { this.submit(prob, prob.doc_id) }}>Submit</button>


                  </div>
                </div>




              </div>
            </div>

          )

        })}
        {this.state.currentProblem && (this.state.currentProblem.translated !== true && this.state.currentProblem.translated !== false) &&
                    <Problem problem={this.state.currentProblem} setCurrentProbToNull={this.setCurrentProbToNull} />



                  }
        <div>

        </div>
        <nav aria-label="Page navigation example">
  <ul class="pagination">{
   

   Array.from({ length: this.state.f.length>0 ? this.state.f.filter(e=>e.difficulty.includes(this.state.diff)).filter(e=>e.author_id.includes(this.state.setter)).length/30 +1:0 }, (value, index) => index)  .map((_, i,ara) => (
   
    <li  style={{margin:"auto",marginTop:"45px",marginBottom:"50px"}}><a class="page-link" style={{color:"black"}} href="#" onClick={()=>{this.setState({start:i*(this.state.f.filter(e=>e.difficulty.includes(this.state.diff)).filter(e=>e.author_id.includes(this.state.setter)).length/ara.length + 1), end:(this.state.f.filter(e=>e.difficulty.includes(this.state.diff)).filter(e=>e.author_id.includes(this.state.setter)).length/ara.length +1)*(i+1)})}}>{i}</a></li>
    
    ))
  }
 <li  style={{margin:"auto",marginTop:"45px",marginBottom:"50px"}}><a class="page-link" style={{color:"black"}} href="#" onClick={()=>{this.setState({start:0, end:this.state.f.filter(e=>e.difficulty.includes(this.state.diff)).filter(e=>e.author_id.includes(this.state.setter)).length})}}>All</a></li>
   
  </ul>
</nav>
      </div>
    )

  }
}


export default (Allproblems);