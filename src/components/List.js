import React from 'react';
import ProductStyles from '../styles/Product.module.css';
import Link from 'next/link';

function List({children}){
    
    return (
        <>
        <section className={ProductStyles.list}>
            {children}
        </section>
        </>
    )
}

export function ListItem({title,desc,author,href,image}){
    if (href){
        return(
            <>
                <div className={ProductStyles.event}>
                    <Link className={ProductStyles.title} href={href}><div  >{title}</div>
                    </Link>
                    <div className={ProductStyles.desc}><span>About : </span>{desc} </div>
                    <div className={ProductStyles.author}> <span>Author : </span> {author}</div>
                </div>
            </>
        )
    }
    return (
        <>
        
        </>
    )
        
    
    
}
export default  List;