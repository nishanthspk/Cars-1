import React, { useState } from 'react';
import './App.css';

function DisplayValues(props) {
  return (
    <div className=' mt-8'>
      <div className='bg-white w-80 pt-6 ml-6 pb-6 rounded-3xl'>
        <h2 className='text-center text-2xl'>Details</h2>
        <div className='pl-6 pt-4 space-y-2'>
          <div className='flex items-start'>
            <span className='w-32 font-bold'>Name:</span>
            <span className='flex-1 truncate'>{props.name}</span>
          </div>
          <div className='flex items-start'>
            <span className='w-32 font-bold'>Model:</span>
            <span className='flex-1 truncate'>{props.desc}</span>
          </div>
          <div className='flex items-start'>
            <span className='w-32 font-bold'>Year:</span>
            <span className='flex-1 truncate'>{props.year}</span>
          </div>
          <div className='flex items-start'>
            <span className='w-32 font-bold'>Price:</span>
            <span className='flex-1 truncate'>{props.amount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}


function App() {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [year, setYear] = useState('');
  const [amount, setAmount] = useState('');
  const [posts, setPosts] = useState([]);

  function post() {
    const _name = document.getElementById('name').value;
    const _desc = document.getElementById('desc').value;
    const _year = document.getElementById('year').value;
    const _amount = document.getElementById('amount').value;

    if(!_name |!_desc |!_year |!_amount){
      alert("Please fill in all fields before posting.")
    }
    else{
    const newPost = {
      name: _name,
      desc: _desc,
      year: _year,
      amount: _amount
    };
    setPosts([...posts, newPost]);
    setName('');
    setDesc('');
    setYear('');
    setAmount('');
  }
  }

  return (
    <div className='bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 bg-cover pb-6'>
      <h1 className=' text-6xl text-center pt-10 text-gray-800 underline'>CarBuyer</h1>
      <h1 className="text-3xl text-center mt-5 text-gray-800">Car Details</h1>
        <div className=' ml-96'> 
          <input type="text" placeholder='Company Name' id='name' value={name} onChange={(e) => setName(e.target.value)} 
          className=' text-center w-96 h-9 mt-10 rounded-2xl ml-16 pl-16 pr-16' required /><br />
          <input type="text" placeholder='Model Name' id='desc' value={desc} onChange={(e) => setDesc(e.target.value)} 
          className=' text-center w-96 h-9 mt-10 rounded-2xl ml-16 pl-16 pr-16' required /><br />
          <input type="text" placeholder='Year' id='year' value={year} onChange={(e) => setYear(e.target.value)} 
          className=' text-center w-96 h-9 mt-10 rounded-2xl ml-16 pl-16 pr-16' required /><br />
          <input type="text" placeholder='Price' id='amount' value={amount} onChange={(e) => setAmount(e.target.value)} 
          className=' text-center w-96 h-9 mt-10 rounded-2xl ml-16 pl-16 pr-16' required /><br />
        </div>
        <div className=' ml-96'>
          <input type='button' value='Post' onClick={post} className=' text-white ml-[200px] mt-6 bg-red-600 w-28 h-8 rounded-2xl border-black hover:bg-fuchsia-600 cursor-pointer align-middle text-center' /><br /><br />
        </div>
        <div>
          <h1 className=' text-6xl text-center pt-10 text-gray-800 underline pb-5'>Buy Cars</h1>
        </div>
        <div className="mx-20">
          {posts.length === 0 && (
            <p className="text-center pt-6 text-2xl text-black">No cars available at the moment</p>
          )}
          <div className='grid grid-cols-3'>
            {posts.map((post, index) => (
              <DisplayValues key={index} name={post.name} desc={post.desc} year={post.year} amount={post.amount} />
            ))}
          </div>
      </div>

    </div>
  );
}

export default App;