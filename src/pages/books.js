import React from 'react';
import ProductStyles from '../styles/Product.module.css';
import HomeStyles from '../styles/Home.module.css';
import List, {ListItem} from '../components/List';
import {ourbooks} from '../data/bookData';

export default function BookPage(){
   const ourbookList = ourbooks.map(books=>{
        return (
            <ListItem key={books.id}
            title={books.title}
            desc={books.desc}
            author={books.author}
            href={`/books/${books.id}`}/>                
        )        
    })
    return(
        <>
            <div className={ProductStyles.header}>
                <h1>
                    Our Picks
                </h1>
            </div>
            
            <div className={HomeStyles.wrapper}>
                <List>
                    {ourbookList}
                </List>
            </div>
        </>
    )
}