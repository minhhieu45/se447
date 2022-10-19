import React, { Component } from "react";
import "./Spinner.css";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
export default class spinnres extends Component {
  render() {
    return (
      <>
        <div className="spinners">
          <div className="climbingBoxLoader">
            <ClimbingBoxLoader size={40} color={"#d9534f"} loading={true} />
          </div>
        </div>
      </>
    );
  }
}
