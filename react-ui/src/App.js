import React from "react";
import{BrowserRouter, Route,Switch} from "react-router-dom";
import PredictionForm from "./component/PredictionForm";
import PredictionResult from "./component/PredictionResult"

const App = () => (
  <BrowserRouter>
    <div className="container">
      <Switch>
      <Route component={PredictionForm} path="/" exact={true} />
        <Route component={PredictionResult} path="/results" />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;