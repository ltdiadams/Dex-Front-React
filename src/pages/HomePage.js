import React, { useEffect, useState, Component } from "react";
import bigRolo from '../data/images/bigRolo.png';
// import axios from 'axios';

// the stuff that gets displayed on the landing page
function HomePage({ user }: { user: any }) {
  // const [message, setMessage] = useState('');
  let mrolo;
  let mrolo2;
  let mrolo3;
  let message;
  let message2;
  //if user is set

  useEffect(() => {
  }, [user]);

  // display different things based on if you are logged in or not
  if (user) {
    message = `Hi ${user}`;
    message2 = "";
    mrolo = "To view catalogues and add your own collections navigate to Index!";
    mrolo2 = "To log out, navigate to the Log out tab";
    mrolo3 = "If you'd like to return here, simply click on Rolo!";
  } else {
    message = "Please log in to see our catalogs!";
    message2 = "If you are new you'll have to register.";
    mrolo = "Meet Rolo, He'll help you get back to the homepage!";
  }
  // setMessage(`Hi ${user.first_name} ${user.last_name}`);
  // setMessage('You are not logged in!');

  return (
    <div className="homepage">
      <h1>Welcome to Dex!</h1>
      <p>{message}</p>
      <p>{message2}</p>
      <img src={bigRolo}></img>
      <p>{mrolo}</p>
      <p>{mrolo2}</p>
      <p>{mrolo3}</p>
    </div>
  );
}

export default HomePage;
