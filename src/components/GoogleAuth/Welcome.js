import React from "react";

const welcomeContainer = {
  display: "flex",
  width: "100%",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "62px"
};


const welcome = {
  fontFamily: "Lilita One ,cursive",
  fontSize: "44px",
  color: "white",
  marginBottom: "20px",
  paddingLeft:"20px"
};

const logoutBtn = {
  padding: "10px 20px",
  marginTop: "50px",
  fontSize: "16px",
  backgroundColor: "#f44336",
  color: "#FFFFFF",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer"
};

const userImage = {
  width: "150px",
  height: "150px",
  borderRadius: "50%",
  objectFit: "cover"
};

function Welcome({ userName, userImageURL }) {
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <style>
        @import url("https://fonts.googleapis.com/css2?family=Lilita+One&display=swap");
      </style>
      <div style={welcomeContainer}>

        {userImageURL && ( <img src={userImageURL} alt="User Profile" style={userImage} />)}
        
        <h1 style={welcome}>Welcome to Code Side, {userName}!</h1>
        <button style={logoutBtn} onClick={logout}>
          Logout
        </button>
      </div>
    </>
  );
}

export default Welcome;
