import React, { useEffect, useState } from "react";
import { auth, provider } from "../../services/firebase.config";
import { signInWithPopup, getAdditionalUserInfo } from "firebase/auth";
import Welcome from "./Welcome";

function SignIn() {
  const [userData, setUserData] = useState(null);
  const [userFavicon, setUserFavicon] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const changeFavicon = (faviconUrl) => {
    const favicon = document.querySelector("link[rel='icon']") || document.createElement("link");
    favicon.rel = "icon";
    favicon.href = faviconUrl;
    document.head.appendChild(favicon);
  };

  const Authenticate = async () => {
    try {
      setIsLoading(true);
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
    <div className="flex items-center justify-center h-screen bg-[#04162ef8]">
      {userData ? ( <Welcome userName={userData.userName} userImageURL={userData.userImageURL} /> ) 
      
      : ( <button onClick={Authenticate} disabled={isLoading}>
          <img src="./gg.png" alt="Big G" className="w-20 h-20 bg-white rounded-full select-none"/>
        </button> )}
    </div>
  );
}

export default SignIn;
