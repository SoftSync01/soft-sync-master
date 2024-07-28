import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink, useLocation } from 'react-router-dom';
import { auth } from "../firebase/firebase-config";
import { signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase/firebase-config";
import { getDatabase, ref,child,get,set,update,remove,push } from "firebase/database";
import Header from '../partials/Signup/SignupHeader';
import SignupBody from '../partials/Signup/SignupBody';

/*
    const signUp = async(e) => {
        e.preventDefault();
        console.log("Sign Up Button Pressed");
        try{
        await createUserWithEmailAndPassword(auth,email,password)
        .then((userCredential)=>{
            const user = userCredential.user;
            createdata(user.uid,email)
        })
        } catch (err){
            console.error(err);
        }
    };
*/

export default function Signup(){
    return(
        <>
            <Header
              heading="Signup to create an account"
              paragraph="Already have an account? "
              linkName="Login"
              linkUrl="/"
            />
            <SignupBody/>
        </>
    )
}