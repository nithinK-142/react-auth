import React from "react";

function Welcome({ userName, userImageURL, authProvider }) {
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center h-screen pt-20">
        {userImageURL && (
          <img
            src={userImageURL}
            alt="UserImage"
            className="w-36 h-36 mb-10 rounded-full object-cover"
          />
        )}

        <h1
          className="text-white mb-10 text-2xl sm:text-3xl md:text-4xl text-center"
          style={{ fontFamily: "Lilita One, cursive" }}
        >
          Welcome to the Code Side, {userName}!
        </h1>

        <h2 className="text-[#B2D7E8] mb-10 text-sm sm:text-2xl md:text-3xl font-semibold">
          Logged in with {authProvider}
        </h2>

        <button
          className="px-6 py-2 bg-red-500 text-white border-none rounded-md"
          onClick={logout}
        >
          Logout
        </button>
    </div>
  );
}

export default Welcome;
