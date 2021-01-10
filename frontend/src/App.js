import React from 'react';
import { Route, Switch} from "react-router-dom";
import MainScreen from './Component/MainScreen';
import AdminLogin from './Component/AdminLogin'
import AdminSignUp from './Component/AdminSignUp';
import ElectionLog from './Component/electionLog';
import HomeScreen from './Component/HomeScreen';
import VoterSign from './Component/VoterSign';
import VoterHome from './Component/VoterHome';
import VoterScreen from './Component/voteScreen';
import resultScreen from './Component/resultScreen';

class App extends React.Component{
  constructor(props){
    super(props)
    this.state={

    }
  }
  
    render(){
        return(
            <>
                {
                  window.localStorage.getItem('admin') != null ? (
                    // admin panel
                    <Switch>
                      <Route path="/" exact component={HomeScreen}/>
                      <Route path="/AdminE" component={ElectionLog}/>
                    </Switch>
                  ):window.localStorage.getItem('voter') != null ? (
                    // voter panel
                    <Switch>
                      <Route path="/" exact component={VoterHome}/>
                      <Route path="/Voting" component={VoterScreen}/>
                      <Route path="/result" component={resultScreen}/>
                    </Switch>
                  ):(
                    // login panel
                    <Switch>
                      <Route path="/" exact component={MainScreen}/>
                      <Route path="/AdminS" component={AdminSignUp}/>
                      <Route path="/VoterS" component={VoterSign}/>
                      <Route path="/Admin" component={AdminLogin}/>
                    </Switch>
                  )
                }
            </>
        )
    }
}
export default App;