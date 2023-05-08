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

  
const app =firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(app);
const googleProvider = new firebase.auth.GoogleAuthProvider();
const db = firebase.firestore(app)

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
        },
        async getBooks(){
            const booksSnapshot = await db.collection('books').get();
            const yourbooksList = [];
            for(let book of booksSnapshot.docs){
                const bookData = book.data();
                yourbooksList.push({
                    ...bookData,
                    id:book.id,
                });
            }
            return yourbooksList;
        },  
        async addBook(booksInfo){
            const booksSnapshot = await db.collection('books').add(booksInfo);
            return {
                ...booksInfo,
                id:book.id,
            };

        },
        async removeBook(bookId){
            await db.collection('books').doc(bookId).delete();
            return {};
            
        },
        async getBookById(bookId){
            const bookSnapShot = await db.collection('books').doc(bookId).get();

            return {};
        }
    };
}