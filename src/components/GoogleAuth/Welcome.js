import React from "react";

function Welcome({ userName, userImageURL }) {
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen">

      <div className="flex flex-col items-center justify-center pt-20">

        {userImageURL && ( <img src={userImageURL} alt="UserImage" className="w-36 h-36 mb-10 rounded-full object-cover"/>)}
          
        <h1 className="text-white mb-10 text-2xl sm:text-4xl md:text-5xl" style={{ fontFamily: 'Lilita One, cursive'}}>Welcome to the Code Side, {userName}!</h1>
          
        <button className="px-6 py-2 bg-red-500 text-white border-none rounded-md" onClick={logout}>Logout</button>
      </div>
  </div>
  );
}

export default Welcome;
