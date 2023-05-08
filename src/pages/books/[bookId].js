import React from 'react';
import { ourbooks } from '@/data/bookData';
import { useRouter } from 'next/router';
import ProductDetailStyles from '../../styles/ProductDetails.module.css';
import Link from 'next/link';
export default function BookViewPage(){
    const router = useRouter();
    const {bookId}= router.query;
    const currentBook = ourbooks.find(book => book.id === bookId);

    if(!currentBook){
        return (
            <>
                <h1>Sorry, we couldnt find that book</h1>
            </>
        );
    }
    return(
        <>
            <div className={ProductDetailStyles.books}>
                <div className={ProductDetailStyles.image}> 
                    <img src={`/images/${currentBook.image}`}/>
                </div>
                <div className={ProductDetailStyles.list}>
                    <div className={ProductDetailStyles.details}>
                        <div>Title : </div>
                        <div>{currentBook.title }</div>
                    </div>
                    <div className={ProductDetailStyles.details}>
                        <div>Author : </div>
                        <div>{currentBook.author }</div>
                    </div>
                    <div className={ProductDetailStyles.details}>
                        <div>Description : </div>
                        <div>{currentBook.desc }</div>
                    </div>
                </div>
                
                
              
            </div>

            <div className={ProductDetailStyles.buttonHolder}>
               <Link href={`/books`}><button>Back</button>
               </Link> 
            </div>
        </>
    )
}