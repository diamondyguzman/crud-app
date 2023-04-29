import React from 'react';
import '@/styles/globals.css'
import useFirebase from '@/useHooks/useFirebase';
import Link from 'next/link';
import {GlobalProvider} from '../useHooks/useGlobalValues';

import NavStyles from '../styles/Nav.module.css';
import HeroStyles from '../styles/Hero.module.css';

export default function App({ Component, pageProps }) {
  const intilalGlobalValues ={
    booksList:[],
    booksListLoadTime:0,
    error:'',
  };
  const [globalValues,setGlobalValues] = React.useState(intilalGlobalValues);

  function updateGlobalValues(newValues){
    setGlobalValues({...globalValues, ...newValues});
  }
 
  
  const firebase = useFirebase();
  
  async function clearGlobalValues(){
    await firebase.logOutUser();
    setGlobalValues(intilalGlobalValues);

  }  
  
  return (
    <>
    <GlobalProvider value={{...globalValues,update: updateGlobalValues}}>
      <nav className={NavStyles.nav}>
          <ul>
            <li>
              <Link href='/'>Home</Link>
            </li>
           
            
            <li>
              {firebase.currentUser.email ? (
                <button onClick={clearGlobalValues} className={NavStyles.login}>Logout</button>
              ):(
                <button onClick={firebase.loginUser} className={NavStyles.login}>Login</button>
              )}
            
            </li>
            
          </ul>
      </nav>
      <div className={HeroStyles.hero}></div>
        <Component {...pageProps} />
    </GlobalProvider>
      

    </>
  ) 
}