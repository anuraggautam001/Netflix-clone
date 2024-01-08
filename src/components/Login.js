import React, { useRef } from 'react'
import Header from './Header';
import { useState } from 'react';
import { checkValidData } from '../utils/validate';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const username = useRef(null);

  const handleButtonClick = () => {
    //validate the form data
     const message = checkValidData(email.current.value, password.current.value);
     setErrorMessage(message);

     if(message) return; 

     if(!isSignInForm){
       //Sign Up logic
       createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
       // Signed up 
        const user = userCredential.user;
        updateProfile(user, {
          displayName: username.current.value, photoURL: "https://avatars.githubusercontent.com/u/49508058?v=4"
        }).then(() => {
          const {uid, email, displayName, photoURL} = auth.currentUser;
          dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
          navigate("/browse");
        }).catch((error) => {
          setErrorMessage(error.message);
        });
        console.log(user);
        navigate("/browse");
      })
      .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMessage(errorCode + "-" + errorMessage);
  });
     }
     else{
      //Sign In logic  
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);
      navigate("/browse");
     })
     .catch((error) => {
     const errorCode = error.code;
     const errorMessage = error.message;
     setErrorMessage(errorCode + "-" + errorMessage)
     });
     }
  };


  const toggleSignInForm = () =>{
       setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
        <Header />
        <div>
        <img className='absolute'
        src='https://assets.nflxext.com/ffe/siteui/vlv3/c38a2d52-138e-48a3-ab68-36787ece46b3/eeb03fc9-99c6-438e-824d-32917ce55783/IN-en-20240101-popsignuptwoweeks-perspective_alpha_website_large.jpg' 
        alt='netflix background'
        />
        </div>
        <form onSubmit={(e) => e.preventDefault()} className='absolute p-12 bg-black w-1/4 my-36 mx-auto right-0 left-0 text-white bg-opacity-80'>
            <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
            {!isSignInForm && (<input 
              ref={username}
              type='text' 
              placeholder='User Name' 
              className='p-4 my-4 w-full bg-gray-600' 
            />)}
            <input 
              ref={email}
              type='text' 
              placeholder='Email Address' 
              className='p-4 my-4 w-full bg-gray-600' 
            />
            <input 
              ref={password}
              type='password' 
              placeholder='Password' 
              className='p-4 my-4 w-full bg-gray-600' 
            />
            <p className='text-red-500 font-bold'>
              {errorMessage}
            </p>


            <button className='p-4 my-6 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>
               {isSignInForm ? "Sign In" : "Sign Up"}
            </button>
            <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>
               {isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now"}
            </p>
        </form>
    </div>
  )
}

export default Login