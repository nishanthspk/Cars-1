function Logout() {
    function Logout(){
        window.localStorage.clear();
        window.location.href='./';
      }
    
    return ( 
            <button className='hover:bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 hover:rounded-xl cursor-pointer px-1' onClick={Logout}>Log Out</button>
            
     );
}

export default Logout;