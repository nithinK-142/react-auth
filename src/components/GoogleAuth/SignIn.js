import React, { useEffect, useState } from "react";
import { auth, provider } from "../../services/firebase.config";
import { signInWithPopup, getAdditionalUserInfo } from "firebase/auth";
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
  const [userData, setUserData] = useState(null);
  const [userFavicon, setUserFavicon] = useState(null);

  const changeFavicon = (faviconUrl) => {
    const favicon = document.querySelector("link[rel='icon']") || document.createElement("link");
    favicon.rel = "icon";
    favicon.href = faviconUrl;
    document.head.appendChild(favicon);
  };

  const Authenticate = async () => {
    try {
      const data = await signInWithPopup(auth, provider);
      const additionalUserInfo = getAdditionalUserInfo(data);

      const userName = data.user.displayName;
      const userImageURL = additionalUserInfo.profile.picture || null;

      setUserData({
        userName: userName,
        userImageURL: userImageURL
      });
      
      setUserFavicon(userImageURL); 
      document.title = `${userName} - Google Auth`;
      localStorage.setItem("name", userName);
      localStorage.setItem("photo", userImageURL);
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedImage = localStorage.getItem("photo");
    if (storedName) {
      setUserData({
        userName: storedName,
        userImageURL: storedImage 
      });
      setUserFavicon(storedImage);
      document.title = `${storedName} - Google Auth`;
    }
  }, []);

  useEffect(() => {
    if (userFavicon) {
      changeFavicon(userFavicon);
    }
  }, [userFavicon]);

  return (
    <div style={container}>
      {userData ? (
        <Welcome userName={userData.userName} userImageURL={userData.userImageURL}
        />
      ) : (
        <button style={signInBtn} onClick={Authenticate}>
          <i className="fa-brands fa-3x fa-google"></i>
        </button>
      )}
    </div>
  );
}

export default SignIn;
