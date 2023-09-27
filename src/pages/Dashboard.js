import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Logout from './components/Logout';
import { useSelector } from 'react-redux';
function Dashboard() {
  const [userdata,setUserData] = useState("");
  const token = useSelector((state) => state.token.token);
  
  useEffect(() => {
        fetch('http://localhost:3000/auth/userDetail', {
        method: 'POST',
        crossDomain: true,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          token: window.localStorage.getItem('token'),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setUserData(data.data);
          if(data.data === "Token Expired"){
            window.localStorage.clear();
            window.location.href='./login';
          }
        });
  });

  return (
      <div>
        <div className="bg-white bg-cover py-3">
            <div className=" flex justify-between">
                <div className=" ml-5 text-2xl font-bold">
                    CrazyCars
                </div>
                <ul className=" font-semibold flex py-1.5 gap-5 mr-5">
                    <li className=" hover:bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 hover:rounded-xl cursor-pointer px-1 underline"><Link to={'/dashboard'}>Dashboard</Link></li>
                    <li className=" hover:bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 hover:rounded-xl cursor-pointer px-1"><Link to={'/viewcars'}>View Cars</Link></li>
                    <li className=" hover:bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 hover:rounded-xl px-1 cursor-pointer"><Link to={'/mypost'}>My Post</Link></li>
                    <li className=" hover:bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 hover:rounded-lg px-1 cursor-pointer"><Link to={'/sell'}>Sell</Link></li>
                    <li className=" hover:bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 hover:rounded-xl px-1 cursor-pointer font-normal"><Link to={'/mypost'}>{userdata.firstname}</Link></li>
                    <Logout/>
                </ul>
            </div>
        </div>
        <div className='bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 bg-cover pb-6'>
          <h1 className='text-3xl text-center text-gray-800 pt-20'>User Details</h1>
            {token}
            <div className=' ml-16 mt-24 text-white my-4'>
              <div className=' flex my-10'>
                <div className=' text-3xl'>
                  First Name:
                </div>
                <div className=' text-2xl mt-1 ml-10'>
                  {userdata.firstname}
                </div>
              </div>
              <div className=' flex my-10'>
                <div className=' text-3xl'>
                  Last Name:
                </div>
                <div className=' text-2xl mt-1 ml-10'>
                  {userdata.lastname}
                </div>
              </div>
              <div className=' flex my-10'>
                <div className=' text-3xl'>
                  E-mail:
                </div>
                <div className=' text-2xl mt-1 ml-24'>
                  {userdata.email}
                </div>
              </div>
            </div>
        </div>
    </div>
  );
}

export default Dashboard;
