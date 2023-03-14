import React from 'react';
import Navbar from "./components/Navbar"
import Welcome from "./components/Welcome"

import AllTopics from "./components/AllTopics"
import AllSerieses from "./components/AllSerieses"
import AllProblems from "./components/Allproblems"
import AllTests from "./components/AllTests"
import ProbStats from "./components/ProbStats"
import AddTest from "./components/AddTest"
import GetResult from "./components/GetResult"
import GetTest from "./components/GetTest"
import {BrowserRouter as Router,Route,Switch,Redirect} from "react-router-dom";
import Tutorial from "./components/Tutorial"
import SeriesByTopic from "./components/SeriesByTopic"
import ProblemBySeries  from "./components/ProblemBySeries"
import Login  from "./components/Login"
import ProblemEdit from "./components/Edit/ProblemEdit"
import firebase from "./firebase"
import './App.css';


function App() {
  const [user, setUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const auth = firebase.auth();
    const unsubscribe = auth.onAuthStateChanged( (user) => {
      setUser(user);
      console.log(user)
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    // render a loading indicator while checking the auth state
    return <div>Loading...</div>;
  }


  return (
    <Router>
   
    <div className="App">

     
     <Switch>
     <Route path='/' exact>
  

  <Login/>
  </Route>
   {user?(
    <>
   
     
     <Route path='/allTopics' component={AllTopics}/>
     <Route path='/allSerieses' component={AllSerieses}/>
     <Route path='/allProblems' component={AllProblems}/>
     <Route path='/addTutorial/:id' component= {Tutorial}/>
     <Route path='/topics/:id' component= {SeriesByTopic}/>
    <Route path='/series/:id' component= {ProblemBySeries}/>
     <Route path='/problem/:id' component= {ProblemEdit}/>
     <Route path ='/allTests' component={AllTests}/>
     <Route path ='/editTest/:level_id/:test_id/:lang' component={AddTest}/>
     <Route path ='/getTest/:test_id' component={GetTest}/>
     <Route path ='/editTest/:level_id/:test_id/:lang' component={AddTest}/>
     <Route path ='/getResult/:level_id/:test_id/:lang/:name' component={GetResult}/>
  
     <Route path ='/probStats' component={ProbStats}/></>):<Redirect to="/" /> 
}
     </Switch>
   
     </div>

    </Router>
  );
}

export default App;
