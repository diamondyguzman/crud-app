import React from 'react';
import { useRouter } from 'next/router';
import useFirebase from '@/useHooks/useFirebase'; 
import ProductDetailStyles from '../../styles/ProductDetails.module.css';
import ProductStyles from '../../styles/Product.module.css';
import useGlobalValues from '@/useHooks/useGlobalValues';

import Link from 'next/link';

export default function YourBookViewPage(){
    const router = useRouter();
    const firebase = useFirebase();
    const {yourbooksId}= router.query;    

    const {booksList,update, booksListLoadTime}= useGlobalValues();
  
    // loads books automatically
    // uses anonymous function
    React.useEffect(function (){
      if(!firebase.currentUser.email)return;
      if(Date.now() -booksListLoadTime < 1000* 60 * 30)return;
      pullBooksFromDb();
        
    });
  
    const currentBook = booksList.find(book=>
        book.id === yourbooksId);
        const booksListComponents = booksList.map(book=>{
            return <div key={book.id} className={ProductStyles.event}><Link href={`/your-books/${book.id}`}>
            <div  className={ProductStyles.title}>{book.name}</div></Link>
            <div className={ProductStyles.desc}><span>About : </span>{book.desc}</div>
            <div className={ProductStyles.author}> <span>Author : </span> {book.Author}</div>
            <div>
              <button onClick={deleteBook.bind(deleteBook, book.id,book.user)}>Remove</button>
            </div>
            </div>
        
          });
        
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
    return(
        <>
       
        <div className={ProductDetailStyles.books}>
                <div className={ProductDetailStyles.image}> 
                    <img src={`${currentBook.image}`}/>
                </div>
                <div className={ProductDetailStyles.list}>
                    <div className={ProductDetailStyles.details}>
                        <div>Title : </div>
                        <div>{currentBook.name }</div>
                    </div>
                    <div className={ProductDetailStyles.details}>
                        <div>Author : </div>
                        <div>{currentBook.Author }</div>
                    </div>
                    <div className={ProductDetailStyles.details}>
                        <div>Description : </div>
                        <div>{currentBook.desc }</div>
                    </div>
                </div>
                
              
            </div>
             
            <div className={ProductDetailStyles.buttonHolder}>
               <Link href={`/your-books`}><button>Back</button>
               </Link> 
            </div>
                
        </>
    )
}