import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Logout from './components/Logout';


function Dashboard() {
  const [userdata,setUserData] = useState("");
  const isLoggedIn = window.localStorage.getItem('loggedIn');
  const port = process.env.PORT || 3000;
  const baseUrl = `http://localhost:${port}`;
  
  useEffect(() => {
        fetch(`${baseUrl}/auth/userDetail`, {
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
        <nav className=' bg-white h-12 w-full fixed'>
          <input type='checkbox' id='check' hidden />
          <label for="check" className=" float-right text-3xl lg:hidden mt-3 mr-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </label>
          <label className=' ml-6 leading-[44px] text-2xl font-bold'>CrazyCars</label>
          <ul className=' float-right lg:flex mr-10 leading-[44px] space-x-4 uppercase rounded fixed lg:relative h-[100vh] lg:h-0 w-full lg:w-fit
           pt-20 lg:pt-0 transition-all duration-300 lg:transition-none text-center bg-white -left-full lg:left-0'> 
            <li className=' text-center ml-3'><Link to={'/dashboard'}>Dashboard</Link></li>
            <li className=' text-center'><Link to={'/viewcars'}>View Cars</Link></li>
            <li className=' text-center'><Link to={'/mypost'}>My Post</Link></li>
            <li className=' text-center'><Link to={'/sell'}>Sell</Link></li>
            <li className='text-center'>
              {isLoggedIn === 'true' ? (
                <Link to={'/dashboard'}>{userdata.firstname}</Link>
              ) : (
                <Link to={'/dashboard '}>Profile</Link>
              )}
            </li>
            <Logout />
          </ul>
        </nav>
        {/* <div className="bg-white bg-cover py-3">
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
        </div> */}
        <div className='bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 bg-cover min-h-screen pb-6'>
          <h1 className='text-3xl text-center text-gray-800 pt-20'>User Details</h1>
            
            <div className=' ml-6 mt-24 text-white my-4'>
              <div className=' flex-col lg:flex my-10'>
                <div className=' text-2xl'>
                  First Name:
                </div>
                <div className=' text-xl mt-1 w-auto overflow-wrap break-words'>
                  {userdata.firstname}
                </div>
              </div>
              <div className=' flex-col lg:flex my-10'>
                <div className=' text-2xl'>
                  Last Name:
                </div>
                <div className=' text-xl mt-1 w-auto overflow-wrap break-words'>
                  {userdata.lastname}
                </div>
              </div>
              <div className=' flex-col lg:flex my-10'>
                <div className=' text-2xl'>
                  E-mail:
                </div>
                <div className=' text-xl mt-1 w-auto overflow-wrap break-words'>
                  {userdata.email}
                </div>
              </div>
            </div>
        </div>
    </div>
  );
}

export default Dashboard;
