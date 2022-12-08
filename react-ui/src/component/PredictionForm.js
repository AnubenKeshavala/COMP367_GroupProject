import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Jumbotron from 'react-bootstrap/Jumbotron';

const PredictionForm = (props) => {
  const [state, setState] = useState({
    sepallength: 0.0,
    sepalwidth: 0.0,
    petallength: 0.0,
    petalwidth: 0.0,
    epoch: 100,
    lrRate: 0.06,
  });

  const handleOnSubmit = (event) => {
    event.preventDefault();
    props.history.push({
      pathname: "/results",
      state,
    });
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const pagestyle1 = {
    color: "black",
    backgroundColor: "SteelBlue",
    padding: "20px",
    fontFamily: "Arial"
  };
  const pagestyle = {
    color: "black",
    backgroundColor: "LightBlue",
    padding: "20px",
    fontFamily: "Arial"
  };

  return (
    <div className="container mt-5" style={pagestyle1}>
      <h1>Enter Data for the Prediction</h1>
      
      <Jumbotron style={pagestyle}>
      <Form className="register-form" onSubmit={handleOnSubmit}>

      <div className="form-group mt-3">
        <label>
          <p>Sepal Length:</p>
          <input type="number"  placeholder="Enter Sepal Length"/>
        </label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
     
        <label>
          <p>Sepal Width:</p>
          <input type="number"  placeholder="Enter Sepal Width"  onChange={handleInputChange}/>
        </label>
        </div>

        <div className="form-group mt-3">
        <label>
          <p>Petal Length:</p>
          <input type="number"  placeholder="Enter Petal Length"  onChange={handleInputChange}/>
        </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      
        <label>
          <p>Petal Width:</p>
          <input type="number"  placeholder="Enter Petal Width"  onChange={handleInputChange}/>
        </label>
        </div>

        <div className="form-group mt-3">
        <label>
          <p>Epoch:</p>
          <input type="number"  placeholder="Enter Epoch"  onChange={handleInputChange}/>
        </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        <label>
          <p>Learning Rate:</p>
          <input type="text"  placeholder="Enter Learning Rate"  onChange={handleInputChange}/>
        </label>
        </div>
  
        <Button class="vertical-center" variant="primary" type="submit">
        Submit
        </Button>
      </Form>

  
      </Jumbotron>
    </div>
  );
};
export default PredictionForm;