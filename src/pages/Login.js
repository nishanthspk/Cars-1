import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authreducer } from "./Token/tokenSlice";

function Login() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const dispatch = useDispatch();

    function loginHandler(){
        const _email = document.getElementById('email').value;
        const _password = document.getElementById('pass').value;
        console.log(_email,_password);
        if(!_email){
            alert("Email is not Entered.");
        }
        else if(!_password){
            alert("Password is not Entered.");
        }
        else{
            setEmail("");
            setPassword("");
        }
        fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        crossDomain: true,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, 'userLogin');
          if(data.status === 'ok'){
            dispatch(authreducer(data.data));
            window.localStorage.setItem('token', data.data);
            window.localStorage.setItem('loggedIn', true);
            window.location.href='./dashboard';
          }
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
                    <li className=" hover:bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 hover:rounded-xl cursor-pointer px-1"><Link to={'/signup'}>SignUp</Link></li>
                    <li className=" hover:bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 hover:rounded-xl px-1 cursor-pointer"><Link to={'/login'}>Login</Link></li>
                </ul>
            </div>
        </div>
      <div className='bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 bg-cover pb-6'>
      <h1 className='text-6xl text-center pt-10 text-gray-800 underline'>Login</h1>
      <center>
        <input
          type='email'
          placeholder='E-mail ID'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='text-center w-96 h-9 mt-10 rounded-2xl flex justify-center'
          required
        />
        <br />
        <input
          type='password'
          placeholder='Enter your Password'
          id='pass'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='text-center w-96 h-9 mt-10 rounded-2xl flex justify-center'
          required
        />
        <br />
      </center>
      <center>
        <input
          type='button'
          value='Login'
          onClick={loginHandler}
          className='text-white mt-6 bg-red-600 w-28 h-8 rounded-2xl border-black hover:bg-fuchsia-600 cursor-pointer align-middle text-center'
        />
        <br />
        <br />
      </center>
    </div>
    </div>
     );
}

export default Login;