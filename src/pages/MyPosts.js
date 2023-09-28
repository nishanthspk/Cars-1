import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Logout from './components/Logout';
function Dashboard() {
  const [carInfoList, setCarInfoList] = useState([]);
  const [loading, setLoading] = useState(true);
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
  },[]);

  function fetchCarInfo() {
    setLoading(true);
      if (userdata._id !== undefined){
      fetch(`${baseUrl}/userCars/${userdata._id}`)
        .then((res) => res.json())
        .then((data) => {
          setCarInfoList(data);
          // console.log(carInfoList.userdata);
        })
        .catch((error) => {
          console.error('Error fetching car info:', error);
        })
        .finally(() => {
          setLoading(false); // Set loading to false when the request is complete (success or error)
        });
      } else {
        console.log(userdata._id);
      }
  }
  
  
  useEffect(() => {
  fetchCarInfo();
}, [userdata, userdata._id]);

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
                <Link to={'/dashboard'}>Profile</Link>
              )}
            </li>
            <Logout />
          </ul>
        </nav>
      <div className='bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 bg-cover min-h-screen pb-6'>
        <div>
          <center className='text-6xl text-center pt-10 text-gray-800 underline pb-5'>My Posts</center>
        </div>
        {loading ? (
          <div className='text-center text-2xl text-gray-800'>Loading...</div>
        ) : carInfoList.length === 0 ? (
          <div className='text-center text-2xl text-gray-800'>There are no cars available.</div>
        ) : (
          <div className='mt-8 grid grid-cols-3 gap-7 '>
            {Array.isArray(carInfoList) && carInfoList.map((carInfo) => (
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

export default Dashboard;
