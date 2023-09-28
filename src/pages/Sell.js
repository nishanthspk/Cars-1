import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Logout from './components/Logout';
function Sell() {
  const [companyname, setCompnayName] = useState('');
  const [modelname, setModelName] = useState('');
  const [year, setYear] = useState('');
  const [amount, setAmount] = useState('');
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

  function post() {
    const _companyname = document.getElementById('name').value;
    const _modelname = document.getElementById('desc').value;
    const _year = document.getElementById('year').value;
    const _amount = document.getElementById('amount').value;

    if (!_companyname || !_modelname || !_year || !_amount) {
      alert('Please fill in all fields before posting.');
    } else {
      setCompnayName('');
      setModelName('');
      setYear('');
      setAmount('');
    }
    fetch('`${baseUrl}/post', {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        userid: userdata._id,
        companyname,
        modelname,
        year,
        amount,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Successfully Posted.");
        window.location.href='./mypost';
        console.log(data, 'userPost');
      });
  }


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
      <div className='bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 bg-cover min-h-screen pt-24 pb-6'>
        <div className='flex flex-col justify-center items-center'>
        <div className=' bg-white bg-center bg-auto px-6 py-6 rounded-3xl'>
        <h1 className='text-6xl text-center pt-10 text-gray-800 underline'>Post Cars</h1>
          <input
            type='text'
            placeholder='Company Name'
            id='name'
            value={companyname}
            onChange={(e) => setCompnayName(e.target.value)}
            className='text-center w-60 text-base h-9 mt-10 rounded-2xl flex justify-center border-2 border-black'
            required
          />
          <br />
          <input
            type='text'
            placeholder='Model Name'
            id='desc'
            value={modelname}
            onChange={(e) => setModelName(e.target.value)}
            className='text-center w-60 text-base h-9 mt-10 rounded-2xl flex justify-center border-2 border-black'
            required
          />
          <br />
          <input
            type='text'
            placeholder='Year'
            id='year'
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className='text-center w-60 text-base h-9 mt-10 rounded-2xl flex justify-center border-2 border-black'
            required
          />
          <br />
          <input
            type='text'
            placeholder='Price'
            id='amount'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className='text-center w-60 text-base h-9 mt-10 rounded-2xl flex justify-center border-2 border-black'
            required
          />
          <div className='flex items-center justify-center'>
          <br />
          <input
            type='button'
            value='Post'
            onClick={post}
            className='text-white mt-6 bg-red-600 w-28 h-8 rounded-2xl border-black hover:bg-fuchsia-600 cursor-pointer align-middle text-center'
          />
          <br />
          <br />
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Sell;
