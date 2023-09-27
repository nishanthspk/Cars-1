import {Navigate,Link } from 'react-router-dom';
import lamborghini from '../images/lamborghini-aventador-landing-page.webp';
import { useState } from 'react';

function Home() {
    const [gotosignup,setGotoSignUp] = useState(false);
    if(gotosignup){
        return <Navigate to={'/signup'} />
    }
    const background = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${lamborghini})`,
    }
    return (
        <div>
            <div className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 bg-cover py-3">
            <div className=" flex justify-between">
                <div className=" ml-5 text-2xl font-bold">
                    CrazyCars
                </div>
                <ul className=" font-semibold flex py-1.5 gap-5 mr-5">
                    <li className=" hover:text-white cursor-pointer"><Link to={'/signup'}>SignUp</Link></li>
                    <li className=" hover:text-white cursor-pointer"><Link to={'/login'}>Login</Link></li>
                </ul>
            </div>
        </div>
            <div className=' bg-cover bg-no-repeat' style={background}> 
                <div className='text-white text-8xl pt-10 font-bold pl-10'>
                    Welcome to CrazyCars 
                </div>
                <div className=' text-3xl text-white font-semibold w-3/5 pl-10 pb-5 pt-14'>
                    Our platform offers you the unparalleled opportunity to purchase high-quality used cars at the best prices 
                    available in the market. What sets us apart is our unwavering commitment to ensuring that every 
                    vehicle listed on our platform undergoes rigorous verification by experienced and certified mechanics. 
                </div>
                <div className=' text-3xl font-semibold w-3/5 pl-10 pb-5 text-white'>
                    This meticulous inspection process guarantees that you're not just buying a used car; you're investing in a reliable, 
                    road-ready vehicle that meets the highest industry standards for safety and performance.
                </div>
                <div className=' text-3xl font-semibold w-3/5 pl-10 pb-5 text-white'>
                    We understand the importance of your peace of mind when making such a significant purchase, and our 
                    dedication to transparency and quality assurance is at the core of our mission. Join us today and experience 
                    the assurance of buying a used car with confidence.
                </div>
                <button onClick={()=> { setGotoSignUp(true);}} className=' text-white bg-red-800 text-xl ml-14 mb-6 p-2 rounded-2xl hover:bg-green-500'>
                   SignUp
                </button>
            </div>
        </div>
     );
}

export default Home;