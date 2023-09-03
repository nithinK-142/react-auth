import React, { useEffect, useState } from "react";
import {
  auth,
  googleProvider,
  githubProvider,
} from "../services/firebase.config";
import { signInWithPopup, getAdditionalUserInfo } from "firebase/auth";
import Welcome from "./Welcome";

function SignIn() {
  const [userData, setUserData] = useState(null);
  const [userFavicon, setUserFavicon] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authProvider, setAuthProvider] = useState(null);

  const changeFavicon = (faviconUrl) => {
    const favicon = document.querySelector("link[rel='icon']");
    favicon.href = faviconUrl;
    document.head.appendChild(favicon);
  };

  const authenticateUser = async (provider, authName) => {
    try {
      setIsLoading(true);
      const data = await signInWithPopup(auth, provider);

      let userName = "";
      let userImageURL = null;

      if (authName === "Google") {
        userName = data.user.displayName;
        userImageURL = getAdditionalUserInfo(data).profile.picture || null;
      } else if (authName === "GitHub") {
        userName = data._tokenResponse.screenName;
        userImageURL = data._tokenResponse.photoUrl || null;
      }

      document.title = `${userName} - ${authName} Auth`;
      setAuthProvider(authName);

      setUserData({
        userName: userName,
        userImageURL: userImageURL,
      });

      setUserFavicon(userImageURL);

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
        userImageURL: storedImage,
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
    <div className="flex justify-center h-screen bg-[#04162ef8]">
      {userData ? (
        <Welcome
          userName={userData.userName}
          userImageURL={userData.userImageURL}
          authProvider={authProvider}
        />
      ) : (
        <div className="flex flex-col items-center pt-40 sm:pt-48">
          <h1 className="text-white mb-10 text-2xl sm:text-3xl md:text-4xl text-center"
          style={{ fontFamily: "Lilita One, cursive" }}>
            Whats it gonna be, Google or Github?
          </h1>
          <div className="flex space-x-4">
            <span className="w-16 h-16 bg-white rounded-full select-none">
              <button
                className="bg-opacity-0 cursor-pointer"
                onClick={() => authenticateUser(googleProvider, "Google")}
                disabled={isLoading}
              >
                <img src="./gg.png" alt="Big G" className="w-16 h-16" />
              </button>
            </span>

            <span className="w-16 h-16 bg-white rounded-full select-none flex align-center justify-center">
              <button
                className="bg-opacity-0 cursor-pointer"
                onClick={() => authenticateUser(githubProvider, "GitHub")}
                disabled={isLoading}
              >
                <img
                  src="./github.svg"
                  alt="GitHub Icon"
                  className="w-12 h-12"
                />
              </button>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignIn;
