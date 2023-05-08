import React from 'react';
import useFirebase from '@/useHooks/useFirebase';
import Message from '../components/Message';

import useGlobalValues from  '../useHooks/useGlobalValues';
import BookForm from '../components/BookForm';
import Modal from '../components/Modal';
import ModalStyles from '../styles/Modal.module.css';
import HomeStyles from '../styles/Home.module.css';
import ProductStyles from '../styles/Product.module.css';
import HeroStyles from '../styles/Hero.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage(){
  const firebase = useFirebase();
  const {booksList,update,error, booksListLoadTime}= useGlobalValues();

  // loads books automatically
  // uses anonymous function
  React.useEffect(function (){
    if(!firebase.currentUser.email)return;
    if(Date.now() -booksListLoadTime < 1000* 60 * 30)return;
    pullBooksFromDb();
      
  });

  const booksListComponents = booksList.map(book=>{
    return <div key={book.id} className={ProductStyles.event}><Link href={`/book/${book.id}`}>
    <div  className={ProductStyles.title}>{book.name}</div></Link>
    <div className={ProductStyles.desc}><span>About : </span>{book.desc}</div>
    <div className={ProductStyles.author}> <span>Author : </span> {book.Author}</div>
    <div>
      <button onClick={deleteBook.bind(deleteBook, book.id,book.user)}>Remove</button>
    </div>
    </div>

  });

  async function deleteBook(bookId,userEmail){
    try{
      if (!firebase.currentUser.email) throw {code:'auth-failed', name:'Firebase Auth'};
      if(firebase.currentUser.email !==userEmail) throw{code:'firestore-unauthorized', name: 'Firebase Firestore'};
      await firebase.removeBook(bookId);
      update({ booksList: booksList.filter(book => book.id !== bookId) , error:' '});
    }catch (e){
      if(e.code === 'auth-failed' && e.name === 'Firebase Auth'){
        update({error:`${e.name} (${e.code}): You need to login for getting the book list`});
      }
      else  if(e.code === 'firestore-unauthorized' && e.name === 'Firebase Firestore'){
        update({error:`${e.name} (${e.code}): You can only edit books that you added`});
      }
      else{
        update({error:e.toString() });
       
      }
      
    }
  }

  async function pullBooksFromDb(){

    try{
      if (!firebase.currentUser.email) throw {code:'auth-failed', name:'Firebase Auth'};
      const books = await firebase.getBooks();
      update({ booksList:books , error:' ',booksListLoadTime:Date.now()});
    }catch (e){
      if(e.code === 'auth-failed' && e.name === 'Firebase Auth'){
        update({error:`${e.name} (${e.code}): You need to login for getting the book list`});
      }
      else{
        update({error:e.toString() });
       
      }
      
    }
      
  };

  async function addMyBook(bookDetails){
    try{
      if (!firebase.currentUser.email) throw {code:'auth-failed', name:'Firebase Auth'};
      const newBookDetails = await firebase.addBook({...bookDetails, user:firebase.currentUser.email});
      update({booksList:booksList.concat(newBookDetails)});

    }catch (e){
      if(e.code === 'auth-failed' && e.name === 'Firebase Auth'){
        update({error:`${e.name} (${e.code}): You need to login for getting the book list`});
      }
    }
  }

  return(
    <>
    <div className={HeroStyles.hero}></div>
      <div className={HomeStyles.wrapper}>
        <h1 className={HomeStyles.greeting}>Welcome<span className={HomeStyles.name}> {firebase.currentUser.displayName  || ' '} </span></h1>

        <div className={HomeStyles.about}>
            <div className={HomeStyles.aboutImage}>
              <Image
              src="/images/smokeytrees.jpg"
              alt="Bird"
              width={400}
              height={300}
              
              />
            </div>

            <div className={HomeStyles.aboutInfo}>
              <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit asperiores, eos nostrum consequatur, accusamus ea quos recusandae nihil blanditiis nulla, praesentium autem id rerum. Id corporis hic consectetur est ipsum! nihil blanditiis nulla, praesentium autem id rerum. Id corporis hic consectetur est ipsum! nihil blanditiis nulla, praesentium autem id rerum. Id corporis hic consectetur est ipsum!

              </div>
            </div>

          
        </div> 

        <div className={HomeStyles.about}>
          <div className={HomeStyles.aboutInfo}>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit asperiores, eos nostrum consequatur, accusamus ea quos recusandae nihil blanditiis nulla, praesentium autem id rerum. Id corporis hic consectetur est ipsum! nihil blanditiis nulla, praesentium autem id rerum. Id corporis hic consectetur est ipsum! nihil blanditiis nulla, praesentium autem id rerum. Id corporis hic consectetur est ipsum!</div>
          </div>

          <div className={HomeStyles.aboutImage}>
          <Image
           src="/images/bird.jpg"
           alt="Bird"
           width={400}
           height={300}
          
           />
          </div> 

        </div>      
      </div>
    </>
  )
}