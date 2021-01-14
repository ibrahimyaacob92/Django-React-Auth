import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, LoginSignup, Activate, NotFound, GoogleAuthCatcher } from "./container";
import { Navbar } from "./components";
import { useAuthContext } from "./context";
import { useEffect } from "react";
import FacebookAuthCatch from "./container/FacebookAuthCatch";

function App() {

  const {verifyTokenAuthenticated, loadUser} = useAuthContext()
  useEffect(()=>{
    verifyTokenAuthenticated()
    loadUser()
  },[])

  return (
      <Router>
        <Navbar />
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={LoginSignup} />
            <Route exact path="/activate/:uid/:token" component={Activate} />
            <Route exact path='/auth/google' component={GoogleAuthCatcher}/>
            <Route exact path='/auth/facebook' component={FacebookAuthCatch}/> 
            <Route component={NotFound} />

          </Switch>
        </div>
      </Router>
    
  );
}

export default App;
