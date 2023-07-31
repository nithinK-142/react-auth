import React from "react";

const welcomeContainer = {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: "translate(-50%, -50%)"
};

const welcome = {
  fontFamily: 'Lilita One ,cursive',
  fontSize: "44px",
  color: "white",
  marginBottom: "20px",
};

const logoutBtn = {
  padding: "10px 20px",
  marginTop: "50px",
  fontSize: "16px",
  backgroundColor: "#f44336",
  color: "#FFFFFF",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

function Welcome({ userName }) {
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Lilita+One&display=swap');
    </style>
    <div style={welcomeContainer}>
      <h1 style={welcome}>Welcome to Code Side, {userName}!</h1>
      <button style={logoutBtn} onClick={logout}>
        Logout
      </button>
    </div>
    </>
  );
}

export default Welcome;
