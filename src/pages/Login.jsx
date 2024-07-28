import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink, useLocation } from 'react-router-dom';
import { auth } from "../firebase/firebase-config";
import { signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase/firebase-config";
import { getDatabase, ref,child,get,set,update,remove,push } from "firebase/database";
import Icon from '../images/Soft-Sync-logo.png';

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    function createdata(userid,email){
        const dbRef = ref(db,"user/" + userid);
        set(dbRef,{
            email: email,
            card01: { visible: true, position: 1 },
            card02: { visible: true, position: 2 },
            card03: { visible: true, position: 3 },
            card04: { visible: true, position: 4 },
            card05: { visible: true, position: 5 },
            card06: { visible: true, position: 6 },
            card07: { visible: true, position: 7 },
            card08: { visible: true, position: 8 },
            card09: { visible: true, position: 9 },
            card10: { visible: true, position: 10 },
            card11: { visible: true, position: 11 },
            card12: { visible: true, position: 12 },
            card13: { visible: true, position: 13 },
        })
        alert("User Creation Successful");
    }

    const signUp = async(e) => {
        e.preventDefault();
        navigate("/Signup");
    };

    const logIn = (e) => {
        e.preventDefault();
        console.log("Button Pressed");
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user.email);
            console.log(user.uid);
            console.log("Successful Login");
            navigate("/dashboard");
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(error);
        });

    };
    return (
        <div className="bg-indigo-200 dark:bg-gray-800 h-screen overflow-hidden flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 lg:w-6/12 md:w-7/12 w-8/12 shadow-3xl rounded-xl relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 md:p-8">
              <img src={Icon} width="180" height="180" alt="Icon 01" />
            </div>
            <form className="p-12 md:p-24">
              {/* Email Input */}
              <div className="flex items-center text-lg mb-6 md:mb-8 relative">
                <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
                  <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"/>
                </svg>
                <input 
                  type="text" 
                  id="username" 
                  value={email} 
                  onChange={(ev) => setEmail(ev.target.value)} 
                  className="bg-gray-200 dark:bg-gray-700 dark:text-white rounded pl-12 py-2 md:py-4 focus:outline-none w-full" 
                  placeholder="Email Address" 
                />
              </div>
              {/* Password Input */}
              <div className="flex items-center text-lg mb-6 md:mb-8 relative">
                <svg className="absolute ml-3" viewBox="0 0 24 24" width="24">
                  <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z"/>
                </svg>
                <input 
                  type="password" 
                  id="password" 
                  value={password} 
                  onChange={(ev) => setPassword(ev.target.value)} 
                  className="bg-gray-200 dark:bg-gray-700 dark:text-white rounded pl-12 py-2 md:py-4 focus:outline-none w-full" 
                  placeholder="Password" 
                />
              </div>
              {/* Login with firebase Button */}
              <button 
                onClick={logIn} 
                className="bg-gray-700 dark:bg-gray-800 font-medium p-2 md:p-4 text-white uppercase w-full rounded">
                Log in
                </button>
                {/* Signup Button */}
                <button 
                onClick={signUp} 
                className="bg-gray-700 dark:bg-gray-800 font-medium p-2 md:p-4 text-white uppercase w-full rounded mt-4">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      );
  }
  
  export default Login