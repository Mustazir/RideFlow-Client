import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider } from "firebase/auth";
import {  createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from './Firebase.config';

const provider = new GoogleAuthProvider();
export const AuthContext=createContext(null)
const AuthProvider = ({children}) => {
    const [dataloading,setdataloading]=useState(true)
    const [datas,setDatas]=useState([])
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)
    const [watchData,setWatchData]=useState([])



    useEffect(()=>{
        fetch('https://rentcar-seven.vercel.app/allcars')
        .then(res => res.json())
            .then(data => 
                {setDatas(data)
                
            })
        setdataloading(false)
    },[])

      // register 
      const handelSignup=(email,pass)=>{
        return createUserWithEmailAndPassword(auth,email,pass)
    }
    const handelSignin=(email,pass)=>{
        return signInWithEmailAndPassword(auth, email, pass)
    }
    useEffect(()=>{
        const unsub=onAuthStateChanged(auth,currentUser=>{
            
            setUser(currentUser)
            setLoading(false)
            

        })
        return()=>{
            unsub();
        }
    },[])
    const logout=()=>{
        return signOut(auth)
    }
    const handelUpdateUser=(name,url)=>{
       return updateProfile(auth.currentUser, {
            displayName: name, photoURL: url
          })
    }
    // gogle login 
    const googleSign =()=>{
        return signInWithPopup(auth,provider)
    }




    const data={
        datas,
        loading,
        dataloading,
        handelSignup,
        handelSignin,
        user,
        setDatas,
        logout,
        googleSign,
        handelUpdateUser,
        watchData,
        setWatchData
    }
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;