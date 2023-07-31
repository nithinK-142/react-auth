import React, { useEffect, useState } from "react";
import { auth, provider } from "../../services/firebase.config";
import { signInWithPopup } from "firebase/auth";
import Welcome from "./Welcome";

const signInBtn = {
  padding: "20px 24px",
  backgroundColor: "#4285F4",
  color: "#FFFFFF",
  border: "none",
  borderRadius: "40px",
  cursor: "pointer",
};

const container = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};

function SignIn() {
  const [userName, setUserName] = useState("");

  const Authenticate = async () => {
    try {
      const data = await signInWithPopup(auth, provider);
      const userName = data.user.displayName;
      setUserName(userName);
      localStorage.setItem("name", userName);
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    storedName ? setUserName(storedName) : setUserName()
  }, []);

  return (
    <div style={container}>
      {userName ? (
        <Welcome userName={userName} />
      ) : (
        <button style={signInBtn} onClick={Authenticate}>
          <i className="fa-brands fa-3x fa-google"></i>
        </button>
      )}
    </div>
  );
}

export default SignIn;
