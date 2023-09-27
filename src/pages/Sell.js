import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Logout from './components/Logout';
function Sell() {
  const [companyname, setCompnayName] = useState('');
  const [modelname, setModelName] = useState('');
  const [year, setYear] = useState('');
  const [amount, setAmount] = useState('');
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
    fetch('http://localhost:3000/post', {
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
       <div className="bg-white bg-cover py-3">
            <div className=" flex justify-between">
                <div className=" ml-5 text-2xl font-bold">
                    CrazyCars
                </div>
                <ul className=" font-semibold flex py-1.5 gap-5 mr-5">
                    <li className=" hover:bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 hover:rounded-xl cursor-pointer px-1"><Link to={'/dashboard'}>Dashboard</Link></li>
                    <li className=" hover:bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 hover:rounded-xl cursor-pointer px-1"><Link to={'/viewcars'}>View Cars</Link></li>
                    <li className=" hover:bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 hover:rounded-xl px-1 cursor-pointer"><Link to={'/mypost'}>My Post</Link></li>
                    <li className=" hover:bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 hover:rounded-lg px-1 cursor-pointer underline"><Link to={'/sell'}>Sell</Link></li>
                    <li className=" hover:bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 hover:rounded-xl px-1 cursor-pointer font-normal"><Link to={'/dashboard'}>{userdata.firstname}</Link></li>
                    <Logout/>
                </ul>
            </div>
        </div>
      <div className='bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 bg-cover pb-6'>
        <h1 className='text-6xl text-center pt-10 text-gray-800 underline'>Post Cars</h1>
        
        <center>
          <input
            type='text'
            placeholder='Company Name'
            id='name'
            value={companyname}
            onChange={(e) => setCompnayName(e.target.value)}
            className='text-center w-96 h-9 mt-10 rounded-2xl flex justify-center'
            required
          />
          <br />
          <input
            type='text'
            placeholder='Model Name'
            id='desc'
            value={modelname}
            onChange={(e) => setModelName(e.target.value)}
            className='text-center w-96 h-9 mt-10 rounded-2xl flex justify-center'
            required
          />
          <br />
          <input
            type='text'
            placeholder='Year'
            id='year'
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className='text-center w-96 h-9 mt-10 rounded-2xl flex justify-center'
            required
          />
          <br />
          <input
            type='text'
            placeholder='Price'
            id='amount'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className='text-center w-96 h-9 mt-10 rounded-2xl flex justify-center'
            required
          />
          <br />
        </center>
        <center>
          <input
            type='button'
            value='Post'
            onClick={post}
            className='text-white mt-6 bg-red-600 w-28 h-8 rounded-2xl border-black hover:bg-fuchsia-600 cursor-pointer align-middle text-center'
          />
          <br />
          <br />
        </center>
      </div>
    </div>
  );
}

export default Sell;
