import { useState } from "react";
import { Link } from "react-router-dom";


function SignUp() {
    const [firstname,setFirstName] = useState('');
    const [lastname,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmpassword,setConfirmPassword] = useState('');
    const port = process.env.PORT || 3000;
    const baseUrl = `http://localhost:${port}`;

    function Register(){
        const _firstname = document.getElementById('fname').value;
        const _lastname = document.getElementById('lname').value; 
        const _email = document.getElementById('email').value;
        const _password = document.getElementById('pass').value;
        const _confirmpassword = document.getElementById('con-pass').value;
        
        if(!_firstname){
            alert("First Name is not Entered.");
        }
        else if(!_lastname){
            alert("Last Name is not Entered.");
        }
        else if(!_email){
            alert("Email is not Entered.");
        }
        else if(!_password){
            alert("Password is not Entered.");
        }
        else if(!_confirmpassword){
            alert("Password is not Re-entered.");
        }
        else{
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
        }
        fetch(`${baseUrl}/auth/signup`, {
        method: 'POST',
        crossDomain: true,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
          confirmpassword,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, 'userRegister');
          window.location.href='./login'
        });
    }
    

    return ( 
      <div>
      <div className="bg-white bg-cover py-3">
        <div className="flex justify-between">
          <div className="ml-5 text-2xl font-bold">CrazyCars</div>
          <ul className="font-semibold flex py-1.5 gap-5 mr-5">
            <li className="hover:bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 hover:rounded-xl cursor-pointer px-1"><Link to={'/signup'}>SignUp</Link></li>
            <li className="hover:bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 hover:rounded-xl px-1 cursor-pointer"><Link to={'/login'}>Login</Link></li>
          </ul>
        </div>
      </div>
      <div className='bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 min-h-screen pt-24 pb-8'>
        <div className=" flex flex-col justify-center items-center">
          <div className=" bg-white bg-center bg-auto px-6 py-6 rounded-3xl">
          <h1 className='text-3xl text-center underline text-gray-800'>Sign Up</h1>
          <input
            type='text'
            placeholder='First Name'
            id='fname'
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            className='text-center w-60 text-base h-9 mt-10 rounded-2xl flex justify-center border-2 border-black'
            required
          />
          <br />
          <input
            type='text'
            placeholder='Last Name'
            id='lname'
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            className='text-center w-60 text-base h-9 mt-10 rounded-2xl flex justify-center border-2 border-black'
            required
          />
          <br />
          <input
            type='email'
            placeholder='E-mail ID'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='text-center w-60 text-base h-9 mt-10 rounded-2xl flex justify-center border-2 border-black'
            required
          />
          <br />
          <input
            type='password'
            placeholder='Enter your Password'
            id='pass'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='text-center w-60 text-base h-9 mt-10 rounded-2xl flex justify-center border-2 border-black'
            required
          />
          <br />
          <input
            type='password'
            placeholder='Re-Enter your Password'
            id='con-pass'
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='text-center w-60 text-base h-9 mt-10 rounded-2xl flex justify-center border-2 border-black'
            required
          />
          <br />
          <div className=" flex items-center justify-center">
          <input
            type='button'
            value='Register'
            onClick={Register}
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

export default SignUp;