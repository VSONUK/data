import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import "antd/dist/antd.css";
import "font-awesome/css/font-awesome.min.css";
import Footer from "./components/Footer/Footer";
import Auth from "./Auth";
import Signin from "./Signin";
import Signup from "./Signup";
const App = () => {
  return (
    <Router>
      <Switch>
      
        
        <Route path="/" exact={true} component={Signin} />
        <Route path="/signup" component={Signup} />
          <Route path="/home" component={Home} />

      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
