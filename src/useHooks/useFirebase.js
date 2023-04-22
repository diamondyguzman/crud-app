import React from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain:process.env.NEXT_PUBLIC_AUTH,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID
  };

  
const app = firebase.initializeApp(firebaseConfig)
const auth = firebase.auth(app);
const googleProvider = new firebase.auth.GoogleAuthProvider();

export default function useFirebase(){
    const intialUser ={email:'', displayName:''}
    const [currentUser , setCurrentUser] = React.useState(intialUser);

    auth.onAuthStateChanged(function(user){
        if(user && currentUser.email != user.email){
            setCurrentUser({
                email:user.email,
                displayName: user.displayName,
            })
        }else if (!user && currentUser.email){
            setCurrentUser({intialUser})
        }    
    });
    
    return{
        currentUser,
        async loginUser(){
            await auth.signInWithPopup(googleProvider);

            return{

            };
        },
        async logOutUser(){
            await auth.signOut();
            return{};
        }
    }
}