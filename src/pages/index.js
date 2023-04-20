import React from 'react';
import useFirebase from '@/useHooks/useFirebase';

export default function HomePage(){
  const firebase = useFirebase();
  return(
    <>
      <h1>My name : {firebase.currentUser.displayName || '--'}</h1>
    </>
  )
}