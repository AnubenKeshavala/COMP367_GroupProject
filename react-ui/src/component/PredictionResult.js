import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import {Link, NavLink } from "react-router-dom";

const PredictionResult = (props) => {
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const { sepallength, sepalwidth, petallength, petalwidth, epoch, lrRate } =
    (props.location && props.location.state) || {};
  console.log(lrRate);
  const apiUrl = "http://localhost:3000/runwithpar";
  //runs once after the first rendering of page
  const predictData = {
    sepallength,
    sepalwidth,
    petallength,
    petalwidth,
    epoch,
    lrRate
    };

  const mylink = {
    marginTop: 30,
    display: 'block',
    width: 110,
    height: 50,
    background: 'red',
    padding: 10,
    borderRadius: 5,
    color: 'white',
    textAlign : 'center'
  }

  const mytable = {
    borderRadius:5,
    background:'green',
    color:'white'
  }

  useEffect(() => {
    const fetchData = async () => {
      axios
        .post(apiUrl,predictData)
        .then((result) => {
          console.log("result.data:", result.data);
          setData(result.data);
          setShowLoading(false);
        })
        .catch((error) => {
          console.log("error in fetchData:", error);
        });
    };
    fetchData();
  }, []);
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
    <div style={pagestyle1} className="row d-flex justify-content-center align-items-center">
      {showLoading === false ? (
        <div>
                      
          {showLoading && (
            <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>                          
            </Spinner>
          )}
          <div className="container mt-5">            
              <h1 >Prediction Results</h1>            
          <table className="App-table" style={pagestyle}>                                                   
            <tbody>                                                           
              <tr>                                  
                <td className="App-td">                                     
                  {data.row1.map((value, index) => (
                    <p key={index}>{value}</p>
                  ))}                                   
                </td>                               
              </tr>                           
            </tbody>                        
          </table>
        </div>   
        <div>
            <Link className='btn-success btn-lg' to="/">Go back</Link>
          </div>                 
      </div>
      ) : (
        <div>                    
          {showLoading && (
            <Spinner animation="border" role="status">                          
              <span className="sr-only">Waiting for results...</span>                       
            </Spinner>
          )}
                  
        </div>
      )}
          
    </div>
  );
};
export default PredictionResult;
