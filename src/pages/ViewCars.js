import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Logout from './components/Logout';
function ViewCars() {
  const [carInfoList, setCarInfoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userdata,setUserData] = useState("");
  
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

  function fetchCarInfo() {
    setLoading(true);
    fetch(`http://localhost:3000/fetchCars`)
      .then((res) => res.json())
      .then((data) => {
        setCarInfoList(data);
      })
      .catch((error) => {
        console.error('Error fetching car info:', error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false when the request is complete (success or error)
      });
  }
  
  useEffect(() => {
    fetchCarInfo();
  }, []);

  return (
    <div>
       <div className="bg-white bg-cover py-3">
        <div className="flex justify-between">
          <div className="ml-5 text-2xl font-bold">
            CrazyCars
          </div>
          <input type="checkbox" className="hidden" id="menu-toggle" />
          <label htmlFor="menu-toggle" className="cursor-pointer md:hidden block text-gray-600 hover:text-gray-800 mt-3 mr-5">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </label>
          <ul className="hidden md:flex font-semibold py-1.5 gap-5 mr-5">
            <li className="hover:bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 hover:rounded-xl cursor-pointer px-1"><Link to={'/dashboard'}>Dashboard</Link></li>
            <li className="hover:bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 hover:rounded-xl cursor-pointer px-1 underline"><Link to={'/viewcars'}>View Cars</Link></li>
            <li className="hover:bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 hover:rounded-xl px-1 cursor-pointer"><Link to={'/mypost'}>My Post</Link></li>
            <li className="hover:bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 hover:rounded-lg px-1 cursor-pointer"><Link to={'/sell'}>Sell</Link></li>
            <li className="hover:bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 hover:rounded-xl px-1 cursor-pointer font-normal"><Link to={'/viewcars'}>{userdata.firstname}</Link></li>
            <Logout />
          </ul>
        </div>
      </div>
      <div className='bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 bg-cover pb-6'>
        <div>
          <center className='text-6xl text-center pt-10 text-gray-800 underline pb-5'>Cars for Sale</center>
        </div>
        {loading ? (
          <div className='text-center text-2xl text-gray-800'>Loading...</div>
        ) : carInfoList.length === 0 ? (
          <div className='text-center text-2xl text-gray-800'>There are no cars available.</div>
        ) : (
          <div className='mt-8 grid lg:grid-cols-3 md:grid-cols-2 gap-7 sm:grid-cols-1'>
            {carInfoList.map((carInfo) => (
              <div key={carInfo._id}>
                <div className='bg-white w-80 pt-6 ml-6 pb-6 rounded-3xl'>
                  <h2 className='text-center text-2xl'>Details</h2>
                  <div className='flex items-start mt-1'>
                    <span className='w-32 font-bold ml-5 mt-2'>Company:</span>
                    <span className='flex-1 truncate mt-2'>{carInfo.companyname}</span>
                  </div>
                  <div className='flex items-start'>
                    <span className='w-32 font-bold ml-5 mt-2'>Model:</span>
                    <span className='flex-1 truncate mt-2'>{carInfo.modelname}</span>
                  </div>
                  <div className='flex items-start'>
                    <span className='w-32 font-bold ml-5 mt-2'>Year:</span>
                    <span className='flex-1 truncate mt-2'>{carInfo.year}</span>
                  </div>
                  <div className='flex items-start'>
                    <span className='w-32 font-bold ml-5 mt-2'>Price:</span>
                    <span className='flex-1 truncate mt-2'>{carInfo.amount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewCars;
