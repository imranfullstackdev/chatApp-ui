import React from "react";
import Robot from "../utils/robot.gif";

const Welcome = ({ currentUser }) => {
  return (
    <>
      {currentUser && (
        <div className="welcomeContainer">
          <img src={Robot} alt="welcome robo" />
          <h3>welcome !, {currentUser.name}</h3>
          <h3>Please Select Some One TO chat</h3>
        </div>
      )}
    </>
  );
};

export default Welcome;
